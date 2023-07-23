import ProgressBar from "react-bootstrap/ProgressBar";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { withVal } from "support/util";
import { Alliance, SerialisedAllianceStation, ArenaState, Duration, LoadedMatch, MatchConfig, MatchPlayState, SnapshotScore, MatchScore, MatchScoreSnapshot } from "ws-schema";
import BaseAudienceScene from "./BaseAudienceScene";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

type MatchProgressBarProps = {
  config: MatchConfig,
  remaining: Duration,
  state: MatchPlayState,
  endgame: boolean
};

class MatchProgressBar extends React.PureComponent<MatchProgressBarProps> {
  render() {
    const { config, remaining, state, endgame } = this.props;

    let bars = [
      {
        name: "AUTONOMOUS",
        max: config.auto_time / 1000,
        state: "Auto",
        complete: ["Pause", "Teleop", "Cooldown", "Complete"]
      },
      {
        name: "TELEOP",
        max: config.teleop_time / 1000,
        state: "Teleop",
        complete: ["Cooldown", "Complete"]
      }
    ];

    let total = bars.reduce((a, b) => a + b.max, 0);

    return <React.Fragment>
      {
        bars.map(bar =>
          <ProgressBar
            className="match-progress"
            data-state={ bar.state }
            data-active={ bar.state === state }
            data-fault={ state === "Fault" }
            data-endgame={ endgame }
            style={{
              width: `${bar.max / total * 100}vw`
            }}

            animated={ bar.state === state || state === "Fault" }
            max={ bar.max }
            now={ 
              bar.state === state ? 
              (bar.max - remaining.secs) : 
              bar.complete.find(s => s === state) ? bar.max :
              state === "Fault" ? bar.max : 0 }
          />
        )
      }
    </React.Fragment>
  }
}

type AllianceScoreProps = {
  reverse?: boolean,
  has_rp: boolean,
  alliance: Alliance,
  score: SnapshotScore,
  other_score: SnapshotScore,
  stations: SerialisedAllianceStation[],
  img?: string
}

class AllianceScore extends React.PureComponent<AllianceScoreProps> {
  render() {
    const { reverse, alliance, score, other_score, stations, img, has_rp } = this.props;

    const els = [
      <Col className="score-image" md="auto">
        {
          withVal(img, () => <img src={`/img/${img}`} />)
        }
      </Col>,
      <Col className="score-node" data-alliance={alliance}>
        <Row>
          <Col className="score-node-image"> <FontAwesomeIcon icon={faLink} /> </Col>
        </Row>
        <Row>
          <Col className="score-node-count"> { score.derived.link_count } / { score.derived.meets_coopertition && other_score.derived.meets_coopertition ?  4 : 5 } </Col>
        </Row>
      </Col>,
      <Col className="alliance-teams" data-alliance={alliance}>
        {
          stations.map(s => 
            <Row 
              className="alliance-team"
              data-bypass={s.bypass}
              data-estop={s.estop || s.astop}
              data-alive={s.ds_report?.robot_ping}
            >
              <Col> { s.team || "\u00A0" } </Col>
            </Row>
          )
        }
      </Col>,
      <Col className="total-score" data-alliance={alliance}>
        { score.derived.total_score }
        {
          withVal((has_rp && score.derived.total_bonus_rp) || undefined, bonus => <span className="total-score-bonus-rp">
            +{ bonus } RP
          </span>)
        }
      </Col>
    ];

    return reverse ? els.reverse() : els;
  }
}

type AudienceSceneMatchPlayState = {
  stations: SerialisedAllianceStation[],
  match?: LoadedMatch,
  score?: MatchScoreSnapshot,
  arenaState?: ArenaState
};

export default class AudienceSceneMatchPlay extends BaseAudienceScene<{}, AudienceSceneMatchPlayState> {
  readonly state: AudienceSceneMatchPlayState = { stations: [] };
  audio?: HTMLAudioElement;
  
  componentDidMount = () => this.handles = [
    this.listen("Arena/Alliance/CurrentStations", "stations"),
    this.listen("Arena/Match/Current", "match"),
    this.listen("Arena/Match/Score", "score"),
    this.listen("Arena/State/Current", "arenaState"),
    this.listenFn<string>("Arena/AudienceDisplay/PlaySound", (sound) => this.playSound(sound))
  ];

  playSound = async (sound: string) => {
    this.audio = new Audio(`/sounds/${sound}.wav`);
    this.audio.play().catch((e: DOMException) => {
      if (e.message.includes("interact")) {
        alert("Can't play sound - autoplay policy. Interact with this page first!");
      }
    })
  }

  onUpdate = (prevProps: {}, prevState: AudienceSceneMatchPlayState) => {
    if (prevState.match != null && this.state.match != null) {
      const last_state = prevState.match.state;
      const current_state = this.state.match.state;

      if (last_state !== current_state) {
        switch (current_state) {
          case "Auto":
            this.playSound("auto");
            break;
          case "Teleop":
            this.playSound("teleop");
            break;
          case "Cooldown":
            this.playSound("match_stop");
            break;
          default:
            break;
        }
      }

      if (this.state.match.endgame && !prevState.match.endgame) {
        this.playSound("endgame");
      }
    }

    if (this.state.arenaState?.state === "Estop" && prevState.arenaState?.state !== "Estop") {
      this.playSound("estop");
    }
  }

  show = () => {
    // const { arena, event } = this.props;
    // const { match } = arena;
    const { match, stations, score } = this.state;

    if (match == null || score == null)
      return <div className="audience-field" />
    else {
      const has_rp = match.match_meta.match_type === "Qualification";

      return <div className="audience-play">
        <div className="score-block">
          <Row className="m-0 progress-row">
            <MatchProgressBar
              config={match.match_meta.config}
              remaining={match.remaining_time}
              state={match.state}
              endgame={match.endgame}
            />
            <span className="progress-overlay">
              <Col>
                { match.match_meta.name }
              </Col>
              <Col md={2}>
                { match.state } &nbsp;
                { 
                  match.state === "Waiting" 
                    || match.state === "Complete"
                    || `${match.remaining_time.secs}s`
                }
              </Col>
              <Col>
                { this.props.details.event_name }
              </Col>
            </span>
          </Row>
          <Row className="score-row">
            <AllianceScore
              alliance="red"
              img="game/game.png"
              score={score.red}
              other_score={score.blue}
              stations={stations.filter(s => s.station.alliance === "red")}
              has_rp={has_rp}
            />
            <AllianceScore
              alliance="blue"
              img="tourney_logo_white.png"
              score={score.blue}
              other_score={score.red}
              stations={stations.filter(s => s.station.alliance === "blue")}
              has_rp={has_rp}
              reverse
            />
          </Row>
        </div>
      </div>
    }
  }
}