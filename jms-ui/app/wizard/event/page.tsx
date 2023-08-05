"use client"

import BufferedFormControl from "@/app/components/BufferedFormControl";
import { useErrors } from "@/app/support/errors";
import { withPermission } from "@/app/support/permissions"
import { nullIfEmpty } from "@/app/support/strings";
import { useWebsocket } from "@/app/support/ws-component";
import { EventDetails, PlayoffMode } from "@/app/ws-schema";
import React, { useEffect, useState } from "react";
import { Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import update, { Spec } from "immutability-helper";
import { SketchPicker } from 'react-color';
import EnumToggleGroup from "@/app/components/EnumToggleGroup";

const PLAYOFF_MODES: { [k in PlayoffMode["mode"]]: string } = {
  Bracket: "Bracket",
  DoubleBracket: "Double Bracket",
  RoundRobin: "Round Robin"
};

const DEFAULT_PLAYOFF_MODES: { [k in PlayoffMode["mode"]]: PlayoffMode } = {
  Bracket: { mode: "Bracket", n_alliances: 8 },
  DoubleBracket: { mode: "DoubleBracket", n_alliances: 8, awards: [], time_per_award: 5*60*1000 },
  RoundRobin: { mode: "RoundRobin", n_alliances: 8 }
};

export default withPermission(["ManageEvent"], function EventWizardUsers() {
  const [ details, setDetails ] = useState<EventDetails | null>(null);
  const [ playoffMode, setPlayoffMode ] = useState<PlayoffMode | null>(null);
  const { call, subscribe, unsubscribe } = useWebsocket();
  const { addError } = useErrors();

  useEffect(() => {
    call<"matches/get_playoff_mode">("matches/get_playoff_mode", null)
      .then(setPlayoffMode)
      .catch(addError);
    
    let cbs = [
      subscribe<"event/details">("event/details", setDetails),
    ];
    return () => unsubscribe(cbs)
  }, []);

  const updateDetails = (spec: Spec<EventDetails>) => {
    call<"event/update">("event/update", { details: update(details!, spec) })
      .then(setDetails)
      .catch(addError);
  }

  return <React.Fragment>
    <h3> Event Details </h3>
    <br />

    <Row>
      <Col>
        <InputGroup>
          <InputGroup.Text>Event Code</InputGroup.Text>
          <BufferedFormControl
            type="text"
            placeholder="2023myevent"
            value={details?.code || ""}
            onUpdate={v => updateDetails({ code: { $set: nullIfEmpty(String(v)) } })}
          />
        </InputGroup>

        <InputGroup className="mt-2">
          <InputGroup.Text>Event Name</InputGroup.Text>
          <BufferedFormControl
            type="text"
            placeholder="My Really Awesome Event"
            value={details?.event_name || ""}
            onUpdate={v => updateDetails({ event_name: { $set: nullIfEmpty(String(v)) } })}
          />
        </InputGroup>
      </Col>
    </Row>

    <hr />

    {
      playoffMode && <React.Fragment>
        <h5>Playoff Type</h5>
        <EnumToggleGroup
          name="playoff_mode"
          values={Object.keys(PLAYOFF_MODES)}
          names={Object.values(PLAYOFF_MODES)}
          value={playoffMode.mode}
          onChange={(m) => call<"matches/set_playoff_mode">("matches/set_playoff_mode", { mode: (DEFAULT_PLAYOFF_MODES as any)[m] }).then(setPlayoffMode).catch(addError)}
          variantActive="success"
          variant="secondary"
        />

        <InputGroup className="mt-3">
          <InputGroup.Text>Number of Alliances</InputGroup.Text>
          <BufferedFormControl
            auto
            style={{ maxWidth: '10em' }}
            type="number"
            min={2}
            max={8}
            value={playoffMode.n_alliances}
            onUpdate={v => call<"matches/set_playoff_mode">("matches/set_playoff_mode", { mode: { ...playoffMode, n_alliances: Math.min(Math.max(2, v as number), 8) } }).then(setPlayoffMode).catch(addError)}
          />
        </InputGroup>

        {
          playoffMode.mode == "DoubleBracket" && <React.Fragment>
            {/* TODO: Awards Typeahead */}

            <InputGroup className="mt-2">
              <InputGroup.Text>Time per Award</InputGroup.Text>
              <BufferedFormControl
                auto
                style={{ maxWidth: '12em' }}
                type="number"
                min={0.5}
                step={0.5}
                value={(playoffMode.time_per_award / 1000 / 60).toFixed(1)}
                onUpdate={v => call<"matches/set_playoff_mode">("matches/set_playoff_mode", {
                  mode: { ...playoffMode, time_per_award: Math.max(0.5, (v as number)) * 1000 * 60 }
                }).then(setPlayoffMode).catch(addError)}
              />
              <InputGroup.Text>mins</InputGroup.Text>
            </InputGroup>
          </React.Fragment>
        }
      </React.Fragment>
    }

    <hr />

    {/* TODO: Webcast Links for TBA */}

    <Row className="mt-3">
      <Col md="auto" className="mx-2">
        <h6> Event Colour </h6>
        <SketchPicker
          disableAlpha
          presetColors={["#e9ab01", "#1f5fb9", "#901fb9"]}
          color={ details?.av_event_colour }
          onChangeComplete={ c => updateDetails({ av_event_colour: { $set: c.hex } }) }
        />
      </Col>
      <Col md="auto" className="mx-2">
        <h6> Chroma Key Colour </h6>
        <SketchPicker
          disableAlpha
          presetColors={["#000", "#f0f", "#0f0", "#333"]}
          color={ details?.av_chroma_key }
          onChangeComplete={ c => updateDetails({ av_chroma_key: { $set: c.hex } }) }
        />
      </Col>
    </Row>
  </React.Fragment>
});