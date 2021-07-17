import { faCloudDownloadAlt, faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditableFormControl from "components/elements/EditableFormControl";
import React from "react";
import { Button, FormControl, Table } from "react-bootstrap";
import { nullIfEmpty } from "support/strings";
import { confirm } from "react-bootstrap-confirmation";

// This is a well-known public key I've created. It may be cancelled at any time.
const TBA_AUTH_KEY = "19iOXH0VVxCvYQTlmIRpXyx2xoUQuZoWEPECGitvJcFxEY6itgqDP7A4awVL2CJn";

export default class ConfigureTeams extends React.Component {
  static eventKey() { return "configure_teams"; }
  static tabName(teams) { 
    if (teams === undefined || teams === null || teams.length === 0)
      return "Configure Teams";
    else
      return "Configure Teams (" + teams.length + ")";
  }

  static needsAttention(teams) {
    return teams?.length < 6;
  }

  constructor(props) {
    super(props);
    this.state = { newTeam: {} };
  }

  updateNewTeam = (k, v) => {
    this.setState({ newTeam: {
      ...this.state.newTeam,
      [k]: v
    }});
  }

  newTeamOnKeyDown = (e) => {
    if (e.key === 'Enter')
      this.trySubmitNewTeam();
  }

  trySubmitNewTeam = () => {
    let nt = this.state.newTeam;
    if (nt.id !== null) {
      let id = parseInt(nt.id);
      if (isNaN(id)) {
        alert("Team number must be a number!");
      } else {
        this.props.ws.send("event", "teams", "insert", {
          id: id,
          name: nt.name,
          affiliation: nt.affiliation,
          location: nt.location
        });
        this.setState({ newTeam: {} });
      }
    }
  }

  newTeamField = (p) => {
    let {id, name, ...otherProps} = p;
    return <FormControl
      type="text"
      size="sm"
      value={this.state.newTeam[id] || ""}
      onChange={ e => this.updateNewTeam(id, nullIfEmpty(e.target.value)) }
      onKeyDown={this.newTeamOnKeyDown}
      placeholder={name}
      {...otherProps}
    />
  }

  updateTeam = (team, key, newValue) => {
    let teamDict = {
      ...team,
      [key]: newValue
    };
    this.props.ws.send("event", "teams", "insert", teamDict);
  }

  bufferedField = (p) => {
    let { team, field, ...otherProps } = p;
    return <EditableFormControl
      autofocus
      type="text"
      size="sm"
      value={ team[field] || "" }
      onUpdate={ v => this.updateTeam(team, field, nullIfEmpty(v)) }
      {...otherProps}
    />
  }

  delete = (t) => {
    this.props.ws.send("event", "teams", "delete", t.id);
  }

  updateTBA = async (override) => {
    if (override) {
      let result = await confirm('Are you sure? This will override all team information.', {
        title: "Force TBA Update",
        okButtonStyle: "success"
      });
      
      if (!result)
        return;
    }

    console.log("Starting TBA Update...");
    this.props.teams.forEach((t) => {
      fetch("https://www.thebluealliance.com/api/v3/team/frc" + t.id + "?X-TBA-Auth-Key=" + TBA_AUTH_KEY)
        .then(response => response.text())
        .then(JSON.parse)
        .then(msg => {
          let name = msg.nickname;
          let affiliation = msg.school_name;
          let location = [msg.city, msg.state_prov, msg.country].filter(x => x !== null && x !== undefined).join(", ");
          
          if (name !== "Off-Season Demo Team") {
            let nt = {
              ...t,
              name: override ? name : (t.name || name),
              affiliation: override ? affiliation : (t.affiliation || affiliation),
              location: override ? location : (t.location || location)
            };

            this.props.ws.send("event", "teams", "insert", nt);
          }
        });
    });
  }

  render() {
    return <div>
      <h4> Configure Teams </h4>
      <p className="text-muted"> 
        <FontAwesomeIcon icon={faInfoCircle} /> &nbsp; 
        After the Match Schedule is generated, this list can no longer be changed. You need at least 6 teams to generate a schedule.
      </p>
      <Button onClick={ () => this.updateTBA(false) }> 
        <FontAwesomeIcon icon={faCloudDownloadAlt} /> &nbsp;
        Update from TBA 
      </Button> &nbsp;
      <Button variant="warning" onClick={ () => this.updateTBA(true) }>
        <FontAwesomeIcon icon={faCloudDownloadAlt} /> &nbsp;
        Update from TBA (override)
      </Button>
      <br /> <br />
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th> # </th>
            <th> Name </th>
            <th> Affiliation </th>
            <th> Location </th>
            <th> Actions </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <this.newTeamField id="id" name="Team #..." type="number" />
            </td>
            <td>
              <this.newTeamField id="name" name="Team Name..." />
            </td>
            <td>
              <this.newTeamField id="affiliation" name="Affiliation..." />
            </td>
            <td>
              <this.newTeamField id="location" name="Location..." />
            </td>
            <td></td>
          </tr>
          {
            this.props.teams?.sort(a => a.id)?.map(t => <tr>
              <td className="text-right pr-2 w-15"> {t.id} </td>
              <td>
                <this.bufferedField
                  team={t}
                  field="name"
                />
              </td>
              <td>
                <this.bufferedField
                  team={t}
                  field="affiliation"
                />
              </td>
              <td>
                <this.bufferedField
                  team={t}
                  field="location"
                />
              </td>
              <td>
                <a className="text-danger" onClick={() => this.delete(t)}> <FontAwesomeIcon icon={faTimes} /> </a>
              </td>
            </tr>)
          }
        </tbody>
      </Table>
    </div>
  }
}