import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EnumToggleGroup from "components/elements/EnumToggleGroup";
import { FieldResourceSelector } from "components/FieldPosSelector";
import _ from "lodash";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import { capitalise } from "support/strings";
import { otherAlliance, withVal } from "support/util";
import { ALLIANCES, NEAR_FAR } from "support/ws-additional";
import { WebsocketComponent, withRole } from "support/ws-component";
import { Alliance, SerialisedAllianceStation, LoadedMatch, Penalties, SnapshotScore, ScoreUpdate, ArenaState, NearFar, MatchScoreSnapshot, EndgameType } from "ws-schema";

type RefereePanelState = {
  match?: LoadedMatch,
  stations: SerialisedAllianceStation[],
  score?: MatchScoreSnapshot,
  state?: ArenaState
}

abstract class RefereePanelBase<P={}> extends WebsocketComponent<P, RefereePanelState> {
  readonly state: RefereePanelState = { stations: [] };

  componentDidMount = () => this.handles = [
    this.listen("Arena/Alliance/CurrentStations", "stations"),
    this.listen("Arena/Match/Current", "match"),
    this.listen("Arena/Match/Score", "score"),
    this.listen("Arena/State/Current", "state")
  ]

  updateScore(alliance: Alliance, update: ScoreUpdate) {
    this.send({ Arena: { Match: { ScoreUpdate: { alliance, update } } } })
  }

  FoulsComponent = (props: {alliance: Alliance, score: SnapshotScore}) => {
    const { alliance, score } = props;
    const { live, derived } = score;

    const categories: { key: keyof Penalties, name: string }[] = [
      { key: 'fouls', name: "FOUL" },
      { key: 'tech_fouls', name: "TECHNICAL FOUL" }
    ];

    return <React.Fragment>
      {
        categories.map(category => <Col className="penalty-category" data-alliance={alliance}>
          <Row>
            <Col className="penalty-count"> { live.penalties[category.key] } </Col>
          </Row>
          <Row>
            <Col>
              <Button
                className="btn-block btn-penalty"
                data-penalty-type={category.key}
                variant={`${alliance}`}
                onClick={() => this.updateScore(alliance, { Penalty: { [category.key]: 1 } })}
              >
                {category.name}
              </Button>
              <Button
                className="btn-block btn-penalty"
                data-penalty-type={category.key}
                variant="secondary"
                onClick={() => this.updateScore(alliance, { Penalty: { [category.key]: -1 } })}
              >
                SUBTRACT
              </Button>
            </Col>
          </Row>
        </Col>)
      }
    </React.Fragment>
  }

  abstract renderIt(): React.ReactNode;
  abstract renderWaiting(): React.ReactNode;

  render() {
    return <Container fluid>
      {
        (this.state.match != null && this.state.score != null && this.state.stations.length > 0) ? this.renderIt() : this.renderWaiting()
      }
    </Container>
  }
}

type RefereeTeamCardProps = {
  idx: number,
  station: SerialisedAllianceStation,
  score: SnapshotScore,
  update: ( data: ScoreUpdate ) => void,
  endgame: boolean
};

const ENDGAME_MAP: { [K in EndgameType]: string } = {
  None: "None",
  Parked: "ENDGAME Park",
  Docked: "ENDGAME Docked"
};

export class RefereeTeamCard extends React.PureComponent<RefereeTeamCardProps> {
  render() {
    const { idx, station, score, update, endgame } = this.props;
    const alliance = station.station.alliance;

    const has_mobility = score.live.mobility[idx];

    return withVal(station.team, team => <Col className="referee-station" data-alliance={alliance}>
      <Row>
        <Col className="referee-station-team" md="auto"> { team } </Col>
        <Col>
          <Button
            className="btn-block referee-station-score"
            data-score-type="mobility"
            data-score-value={has_mobility}
            onClick={() => update( { Mobility: { station: idx, crossed: !has_mobility } } )}
          >
            {
              has_mobility ? <React.Fragment> AUTO MOBILITY OK &nbsp; <FontAwesomeIcon icon={faCheck} />  </React.Fragment>
                : <React.Fragment> NO AUTO MOBILITY &nbsp; <FontAwesomeIcon icon={faTimes} /> </React.Fragment>
            }
          </Button>
        </Col>
      </Row>
      <Row>
          <Col>
            <EnumToggleGroup
              name={`${team}-endgame`}
              className="referee-station-score"
              data-score-type="endgame"
              data-score-value={score.live.endgame[idx]}
              value={score.live.endgame[idx]}
              values={_.keys(ENDGAME_MAP) as EndgameType[]}
              names={_.values(ENDGAME_MAP)}
              onChange={v => update({ Endgame: { station: idx, endgame: v } })}
              // disabled={!endgame}
            />
          </Col>
      </Row>
    </Col>) || <Col />
  }
}

type AllianceRefereeProps = {
  alliance: Alliance,
  position: NearFar
};

export class AllianceReferee extends RefereePanelBase<AllianceRefereeProps> {

  renderWaiting() {
    return <React.Fragment>
      <h3> Waiting for Scorekeeper... </h3>
      <i className="text-muted"> { capitalise(this.props.alliance) } { capitalise(this.props.position) } Referee </i>
    </React.Fragment>
  }

  renderIt() {
    const match = this.state.match!;
    const score_all = this.state.score!;
    const alliance = this.props.alliance;
    const other_alliance = otherAlliance(alliance);
    
    const score = score_all[alliance];
    const other_score = score_all[other_alliance];

    const flip = this.props.position === "far";

    const stations = this.state.stations.filter(s => s.station.alliance === this.props.alliance);

    return <React.Fragment>
      <Row className="mb-3">
        <Col>
          <h3 className="mb-0"> { match.match_meta.name } </h3>
          <i className="text-muted"> { capitalise(alliance) } { capitalise(this.props.position) } Referee </i>
        </Col>
        <Col className="text-end">
          <h3 className="text-muted"> { match.state || "--" } &nbsp; { match?.remaining_time?.secs }s </h3>
        </Col>
      </Row>
      <Row>
        <this.FoulsComponent
          alliance={flip ? "red" : "blue"}
          score={score_all[flip ? "red" : "blue"]}
        />
        <this.FoulsComponent
          alliance={flip ? "blue" : "red"}
          score={score_all[flip ? "blue" : "red"]}
        />
      </Row>
      <Row>
        {
          stations.map((station, i) => <RefereeTeamCard
            idx={i}
            station={station}
            score={score}
            update={(data) => this.updateScore(alliance, data)}
            endgame={match?.endgame || false}
          />)
        }
      </Row>
      <Row>
        <Button
          className="btn-block referee-station-score"
          data-score-type="auto_docked"
          data-score-value={score.live.auto_docked}
          onClick={() => this.updateScore(alliance,  { AutoDocked: { docked: !score.live.auto_docked } } )}
        >
          {
            score.live.auto_docked ? <React.Fragment> AUTO DOCKED &nbsp; <FontAwesomeIcon icon={faCheck} />  </React.Fragment>
              : <React.Fragment> NO AUTO DOCKED &nbsp; <FontAwesomeIcon icon={faTimes} /> </React.Fragment>
          }
        </Button>
      </Row>
    </React.Fragment>
  }
}

export class HeadReferee extends RefereePanelBase {
  renderTopBar = () => {
    const { match, state } = this.state;

    return <React.Fragment>
      <Row className="mb-3">
        <Col>
          <h3 className="mb-0"> { match?.match_meta?.name || "Waiting for Scorekeeper..." } </h3>
          <h4 className="text-muted"> { match?.state || "--" } &nbsp; { match?.remaining_time?.secs }s </h4>
        </Col>
        {/* <Col md="auto" className="head-ref-field-ax">
          <Button
            variant="purple"
            size="lg"
            onClick={() => this.send({ Arena: { Access: { Set: "ResetOnly" } } })}
            disabled={!canChangeAccess || access === "ResetOnly"}
          >
            FIELD RESET
          </Button>

          <Button
            variant="good"
            size="lg"
            onClick={() => this.send({ Arena: { Access: { Set: "Teams" } } })}
            disabled={!canChangeAccess || access === "Teams"}
          >
            TEAMS ON FIELD
          </Button>

          <Button
            variant="primary"
            size="lg"
            onClick={() => this.send({ Arena: { Access: { Set: "NoRestriction" } } })}
            disabled={!canChangeAccess || access === "NoRestriction"}
          >
            NORMAL
          </Button>
        </Col> */}
      </Row>
    </React.Fragment>
  }

  renderWaiting() {
    return this.renderTopBar()
  }

  renderIt() {
    let score = this.state.score!;

    return <React.Fragment>
      { this.renderTopBar() }
      <Row>
        <this.FoulsComponent
          alliance="blue"
          score={score.blue}
        />
        <this.FoulsComponent
          alliance="red"
          score={score.red}
        />
      </Row>
    </React.Fragment>
  }
}

class RefereeSelector extends React.PureComponent {
  render() {
    return <Col className="col-full">
      <FieldResourceSelector
        title="Select Referee"
        options={[
          { RefereePanel: "HeadReferee" },
          { RefereePanel: { Alliance: [ "red", "near" ] } },
          { RefereePanel: { Alliance: [ "red", "far" ] } },
          { RefereePanel: { Alliance: [ "blue", "near" ] } },
          { RefereePanel: { Alliance: [ "blue", "far" ] } },
        ]}
        wrap={(r, child) => <Link to={r.RefereePanel === "HeadReferee" ? "head" : `${r.RefereePanel.Alliance.join("/")}`}> { child } </Link>}
      />
    </Col>
  }
}

export function RefereeRouter() {
  return <Routes>
    <Route path="/" element={ <RefereeSelector /> } />
    {
      ALLIANCES.map(alliance => NEAR_FAR.map(nearfar => (
        <Route path={`${alliance}/${nearfar}`} element={
          withRole({ RefereePanel: { Alliance: [ alliance, nearfar ] } }, <AllianceReferee alliance={alliance} position={nearfar} />)
        } />
      )))
    }
    <Route path="head" element={ withRole({ RefereePanel: "HeadReferee" }, <HeadReferee />) } />
  </Routes>
}