import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import JmsWebsocket from "support/ws";

export default class Debug extends React.PureComponent<{ws: JmsWebsocket}> {
  render() {
    let screen = window.screen;
    let root = document.documentElement;

    return <Container>
      <Row>
        <Col>
          <h2> Debug Information </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4> Device Details </h4>
          <p> Screen dimensions: { screen.width } x { screen.height } </p>
          <p> Screen dimensions (avail): { screen.availWidth } x { screen.availHeight } </p>
          <p> Device pixel ratio: { window.devicePixelRatio } </p>
          <p> Root Element Dimensions: { root.clientWidth } x { root.clientHeight } </p>
          <p> Window Inner Dimensions: { window.innerWidth } x { window.innerHeight } </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4> Matches </h4>
          <Button
            onClick={() => this.props.ws.send({ Debug: { Match: "FillRandomScores" } })}
            variant="danger"
          >
            Random Fill
          </Button>
          <br />
          <br />
          <Button
            onClick={() => this.props.ws.send({ Debug: { Match: "DeleteAll" } })}
            variant="danger"
          >
            DELETE ALL (DANGER)
          </Button>
        </Col>
      </Row>
    </Container>
  }
}