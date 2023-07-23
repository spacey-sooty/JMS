import { faBan, faCircleArrowLeft, faCode, faEye, faFlag, faNetworkWired, faRobot, faStop, faUsers, faWifi, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import confirmBool, { confirmModal } from "components/elements/Confirm";
import EnumToggleGroup from "components/elements/EnumToggleGroup";
import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { withVal } from "support/util";
import { WebsocketComponent } from "support/ws-component";
import { SerialisedAllianceStation, ArenaState, LoadedMatch, SupportTicket, ResourceRequirementStatus } from "ws-schema";
import update from "immutability-helper";
import BufferedFormControl from "components/elements/BufferedFormControl";
import moment from "moment";
import newTicket from "csa/NewTicket";
import { ResourceRequirementMinimap } from "components/ResourceComponents";

type FieldMonitorMode = "View" | "Estop" | "Flag" | "Resource";

type FieldMonitorStationState = {
  station: SerialisedAllianceStation,
  state?: ArenaState,
  match?: LoadedMatch,
  mode: FieldMonitorMode,
  do_estop: () => void,
  new_ticket: (ticket: SupportTicket) => void
}

class FieldMonitorStation extends React.PureComponent<FieldMonitorStationState> {
  triggerEstop = async () => {
    const { station } = this.props;
    const station_text = `${ station.station.alliance.toUpperCase() } ${ station.station.station }`;

    const subtitle = <h2 className="estop-subtitle">
      Are you sure you want to <strong className="text-danger">EMERGENCY STOP {station_text}{ withVal(station.team, t => ` (${t})`) }?</strong>
    </h2>
    let result = await confirmBool(subtitle, {
      size: "xl",
      okBtn: {
        size: "lg",
        className: "estop-big",
        variant: "estop",
        children: `E-STOP ${station_text} ${station.team || ""}`
      },
      cancelBtn: {
        size: "lg",
        className: "btn-block",
        children: "CANCEL",
        variant: "secondary"
      }
    });

    if (result) {
      this.props.do_estop();
    }
  }

  flag = async (station: SerialisedAllianceStation) => {
    newTicket("FTA", station.team!, this.props.match!.match_meta, this.props.new_ticket);
  }
  
  lostPktPercent = (lost: number, sent: number) => (lost) / ((lost + sent) || 1) * 100;

  renderSent = (lost: number, sent: number) => {
    let percent = 100 - this.lostPktPercent(lost, sent);

    if (percent > 100)
      return "HI";
    else if (percent < 0)
      return "LO";
    return percent.toFixed(0);
  }

  whatError = (stn: SerialisedAllianceStation, report: SerialisedAllianceStation["ds_report"], estop: boolean) => {
    let playing_match = this.props.state?.state === "MatchPlay";

    if (stn.bypass) return null;
    if (estop) return "E-STOPPED";

    if (stn.team === null) return "NO TEAM";
    if (stn.occupancy == "Vacant") return stn.ds_eth ? "ETH OK NO DS" : "NO DS";
    if (stn.occupancy == "WrongMatch") return "WRONG MATCH";
    if (stn.occupancy == "WrongStation") return "WRONG STATION";

    if (report == null) return "NO DS REPORT";

    if (!report.radio_ping) return "NO RADIO";
    if (!report.rio_ping) return "NO RIO";
    if (!report.robot_ping) return "NO CODE";

    if (report.rtt > 100) return "HIGH LATENCY";

    if (report.battery < 9) return "LOW BATTERY";

    if (playing_match && this.lostPktPercent(report.pkts_lost, report.pkts_sent) > 10)
      return "HIGH PACKET LOSS";
    
    if (playing_match && report.mode === null)
      return "DISABLED";

    if (playing_match && report.mode !== this.props.match?.state)
      return report.mode?.toUpperCase();

    return null;
  }

  render() {
    let s = this.props.station;
    let report = s.ds_report;
    let estop = report?.estop || s.estop || s.astop;

    let error = this.whatError(s, report, estop);

    return <Row className="monitor-station" data-error={error} data-bypass={s.bypass} data-estop={estop}>
      <Col className="monitor-station-id" md="auto">
        { s.station.station }
      </Col>
      <Col className="monitor-data col-full">
        {
          s.bypass ? <React.Fragment /> : 
            <Row className="monitor-data-header">
              <Col className="monitor-eth" md="auto" data-eth-ok={s.ds_eth}> <FontAwesomeIcon icon={faNetworkWired} /> </Col>
              <Col className="monitor-occupancy" data-occupancy={s.occupancy} />
              <Col className="monitor-team">
                { s.team || "" }
              </Col>
              <Col className="text-end" data-ok={ this.lostPktPercent(report?.pkts_lost || 0, report?.pkts_sent || 0) < 10 }>
                { this.renderSent(s.ds_report?.pkts_lost || 0, s.ds_report?.pkts_sent || 0) }%
              </Col>
            </Row>
        }
        <Row className="monitor-jumbo align-items-center" data-error={error}>
          <Col>
            {
              s.bypass ? `BYPASS ${s.team || ""}`
                : (s.team && this.props.mode === "Flag") ?
                  <Button
                    className="btn-block monitor-team-btn"
                    variant="orange"
                    onClick={() => this.flag(s)}
                  >
                    FLAG ISSUE FOR CSA
                  </Button>
                : s.estop ? "E-STOPPED"
                : this.props.mode === "Estop" ?
                  <Button
                    className="btn-block monitor-team-btn"
                    variant="estop"
                    onClick={this.triggerEstop}
                  > E-STOP { s.team || "" } </Button>
                : error ? error
                : (report?.mode?.toUpperCase() || "READY")
            }
          </Col>
        </Row>
        {
          s.bypass ? <React.Fragment /> : 
            <Row className="monitor-indicators">
              <Col data-ok={s.ds_report?.radio_ping} md="4">
                <FontAwesomeIcon icon={faWifi} /> &nbsp;
                { (s.ds_report?.rtt?.toString() || "---").padStart(3, "\u00A0") }ms
              </Col>
              <Col data-ok={s.ds_report?.rio_ping}>
                <FontAwesomeIcon icon={faRobot} size="lg"/>
              </Col>
              <Col data-ok={s.ds_report?.robot_ping}>
                <FontAwesomeIcon icon={faCode} size="lg"/>
              </Col>
              <Col data-ok={s.ds_report?.battery ? s.ds_report.battery > 9 : ""} md="auto">
                {/* <FontAwesomeIcon icon={faCarBattery} size="lg"/> &nbsp; */}
                { s.ds_report?.battery?.toFixed(2) || "--.--" } V
              </Col>
            </Row>
        }
      </Col>
    </Row>
  }
}

type FieldMonitorState = {
  stations: SerialisedAllianceStation[],
  state?: ArenaState,
  match?: LoadedMatch,
  resource_status?: ResourceRequirementStatus,
  mode: FieldMonitorMode
};

export default class FieldMonitor extends WebsocketComponent<{ fta: boolean }, FieldMonitorState> {
  readonly state: FieldMonitorState = {
    stations: [],
    mode: "View"
  };

  componentDidMount = () => this.handles = [
    this.listen("Arena/State/Current", "state"),
    this.listen("Arena/Match/Current", "match"),
    this.listen("Arena/Alliance/CurrentStations", "stations"),
    this.listen("Resource/Requirements/Current", "resource_status")
  ];

  renderAlliance = (stations: SerialisedAllianceStation[]) => {
    return <React.Fragment>
      {
        stations.map(s => (
          <FieldMonitorStation
            mode={this.state.mode}
            state={this.state?.state}
            match={this.state?.match}
            station={s}
            do_estop={() => this.send({
              Arena: { Alliance: { UpdateAlliance: { station: s.station, estop: true } } }
            })}
            new_ticket={ticket => this.send({
              Ticket: { Insert: ticket }
            })}
          />
        ))
      }
    </React.Fragment>
  }

  renderFTAControls = () => {
    const { mode } = this.state;
    const mode_btns: { mode: FieldMonitorMode, variant: string, icon: IconDefinition }[] = [
      { mode: "View", variant: "success", icon: faEye },
      { mode: "Estop", variant: "estop", icon: faBan },
      { mode: "Flag", variant: "warning", icon: faFlag },
      { mode: "Resource", variant: "primary", icon: faUsers }
    ];

    return <React.Fragment>
      <Row>
        <Col>
          {
            mode_btns.map(mb => (
              <Button
                variant={ mode === mb.mode ? "secondary" : mb.variant }
                onClick={() => this.setState({ mode: mb.mode })}
                disabled={mode === mb.mode}
              >
                <FontAwesomeIcon icon={mb.icon} />
              </Button>
            ))
          }
        </Col>
      </Row>
    </React.Fragment>
  }

  renderAvailable = () => {
    const { stations, mode, resource_status } = this.state;
    return <Row>
      {
        this.props.fta ? 
          <Col className="col-full monitor-fta-controls">
            { this.renderFTAControls() }
          </Col> : undefined
      }
      <Col className="col-full">
        {
          mode === "Resource" && resource_status != null ?
            <ResourceRequirementMinimap status={resource_status} />
            : <Row>
                <Col className="col-full monitor-alliance" data-alliance="red">
                  { this.renderAlliance( stations.filter(s => s.station.alliance === "red") ) }
                </Col>
                <Col className="col-full monitor-alliance" data-alliance="blue">
                  { this.renderAlliance( stations.filter(s => s.station.alliance === "blue").reverse() ) }
                </Col>
              </Row>
            
        }
      </Col>

    </Row>
  }

  render() {
    const { stations } = this.state;
    return <Col className="field-monitor col-full">
      {
        stations.length > 0 ? this.renderAvailable() : <h4 className="m-5"> Waiting... </h4>
      }
    </Col>
  }
}