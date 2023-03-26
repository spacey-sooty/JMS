/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type WebsocketMessage2UI =
  | ("Ping" | "Pong")
  | {
      Error: string;
    }
  | {
      Debug: DebugMessage2UI;
    }
  | {
      Event: EventMessage2UI;
    }
  | {
      Arena: ArenaMessage2UI;
    }
  | {
      Match: MatchMessage2UI;
    }
  | {
      Resource: ResourceMessage2UI;
    }
  | {
      Ticket: TicketMessage2UI;
    };
export type DebugMessage2UI = {
  ReplyTest: string;
};
export type EventMessage2UI =
  | {
      Details: EventMessageDetails2UI;
    }
  | {
      Team: EventMessageTeam2UI;
    }
  | {
      Schedule: EventMessageSchedule2UI;
    }
  | {
      Alliance: EventMessageAlliance2UI;
    }
  | {
      Ranking: EventMessageRanking2UI;
    }
  | {
      Award: EventMessageAward2UI;
    };
export type EventMessageDetails2UI = {
  Current: EventDetails;
};
export type EventMessageTeam2UI = {
  CurrentAll: Team[];
};
export type EventMessageSchedule2UI = {
  CurrentBlocks: ScheduleBlock[];
};
export type ScheduleBlockType = "General" | "Qualification" | "Playoff";
export type EventMessageAlliance2UI = {
  CurrentAll: PlayoffAlliance[];
};
export type EventMessageRanking2UI = {
  CurrentAll: TeamRanking[];
};
export type EventMessageAward2UI = {
  CurrentAll: Award[];
};
export type ArenaMessage2UI =
  | {
      State: ArenaMessageState2UI;
    }
  | {
      Alliance: ArenaMessageAlliance2UI;
    }
  | {
      Match: ArenaMessageMatch2UI;
    }
  | {
      AudienceDisplay: ArenaMessageAudienceDisplay2UI;
    };
export type ArenaMessageState2UI = {
  Current: ArenaState;
};
export type ArenaState =
  | {
      state: "Init";
    }
  | {
      net_ready: boolean;
      state: "Idle";
    }
  | {
      state: "Estop";
    }
  | {
      net_ready: boolean;
      state: "Prestart";
    }
  | {
      state: "MatchArmed";
    }
  | {
      state: "MatchPlay";
    }
  | {
      net_ready: boolean;
      state: "MatchComplete";
    };
export type ArenaMessageAlliance2UI = {
  CurrentStations: SerialisedAllianceStation[];
};
export type DSMode = "Teleop" | "Test" | "Auto";
export type AllianceStationOccupancy = "Vacant" | "Occupied" | "WrongStation" | "WrongMatch";
export type Alliance = "blue" | "red";
export type ArenaMessageMatch2UI =
  | {
      Current: LoadedMatch | null;
    }
  | {
      Score: MatchScoreSnapshot;
    };
export type WinStatus = "WIN" | "LOSS" | "TIE";
export type GamepieceType = "None" | "Cone" | "Cube";
export type EndgameType = "None" | "Parked" | "Docked";
export type MatchSubtype = "Quarterfinal" | "Semifinal" | "Final";
export type MatchType = "Test" | "Qualification" | "Playoff";
export type MatchPlayState = "Waiting" | "Warmup" | "Auto" | "Pause" | "Teleop" | "Cooldown" | "Complete" | "Fault";
export type ArenaMessageAudienceDisplay2UI =
  | {
      Current: AudienceDisplay;
    }
  | {
      PlaySound: string;
    };
export type AudienceDisplay =
  | {
      scene: "Field";
    }
  | {
      scene: "MatchPreview";
    }
  | {
      scene: "MatchPlay";
    }
  | {
      params: SerializedMatch;
      scene: "MatchResults";
    }
  | {
      scene: "AllianceSelection";
    }
  | {
      scene: "PlayoffBracket";
    }
  | {
      params: Award;
      scene: "Award";
    }
  | {
      params: string;
      scene: "CustomMessage";
    };
export type MatchMessage2UI =
  | {
      Quals: MatchMessageQuals2UI;
    }
  | {
      Playoffs: MatchMessagePlayoffs2UI;
    }
  | {
      All: SerializedMatch[];
    }
  | {
      Next: SerializedMatch | null;
    }
  | {
      Last: SerializedMatch | null;
    };
export type MatchMessageQuals2UI = {
  Generation: SerialisedMatchGeneration;
};
export type MatchGenerationRecordData =
  | {
      Qualification: {
        cooccurrence: number[][];
        gen_time: number;
        station_balance: number;
        station_dist: number[][];
        team_balance: number;
      };
    }
  | {
      Playoff: {
        mode: PlayoffMode;
      };
    };
export type PlayoffMode = "Bracket" | "RoundRobin";
export type MatchMessagePlayoffs2UI = {
  Generation: SerialisedMatchGeneration;
};
export type ResourceMessage2UI =
  | {
      All: TaggedResource[];
    }
  | {
      Current: TaggedResource;
    }
  | {
      SetIDACK: string;
    }
  | {
      SetFTAAck: boolean;
    }
  | {
      Requirements: ResourceMessageRequirements2UI;
    };
export type ResourceRole =
  | ("Unknown" | "Any" | "ScorekeeperPanel" | "MonitorPanel" | "TimerPanel" | "AudienceDisplay" | "FieldElectronics")
  | {
      RefereePanel: RefereeID;
    }
  | {
      ScorerPanel: ScorerID;
    }
  | {
      TeamEStop: AllianceStationId;
    };
export type RefereeID =
  | "HeadReferee"
  | {
      /**
       * @minItems 2
       * @maxItems 2
       */
      Alliance: [Alliance, NearFar];
    };
export type NearFar = "near" | "far";
export type ResourceMessageRequirements2UI = {
  Current: ResourceRequirementStatus | null;
};
export type ResourceRequirementStatusElement =
  | {
      And: ResourceRequirementStatus[];
    }
  | {
      Or: ResourceRequirementStatus[];
    }
  | {
      Quota: MappedResourceQuota;
    };
export type ResourceRequirements =
  | {
      And: ResourceRequirements[];
    }
  | {
      Or: ResourceRequirements[];
    }
  | {
      Quota: ResourceQuota;
    };
export type TicketMessage2UI =
  | {
      All: SupportTicket[];
    }
  | {
      Logs: TicketMessageLogs2UI;
    };
export type TicketMessageLogs2UI =
  | {
      Keys: MatchStationStatusRecordKey[];
    }
  | {
      Load: MatchStationStatusRecord | null;
    };
export type WebsocketMessage2JMS =
  | ("Ping" | "Pong")
  | {
      Subscribe: string[];
    }
  | {
      Debug: DebugMessage2JMS;
    }
  | {
      Event: EventMessage2JMS;
    }
  | {
      Arena: ArenaMessage2JMS;
    }
  | {
      Match: MatchMessage2JMS;
    }
  | {
      Resource: ResourceMessage2JMS;
    }
  | {
      Ticket: TicketMessage2JMS;
    };
export type DebugMessage2JMS =
  | {
      Match: DebugMessageMatch2JMS;
    }
  | {
      ReplyTest: string;
    };
export type DebugMessageMatch2JMS =
  | "DeleteAll"
  | {
      FillRandomScores: string | null;
    };
export type EventMessage2JMS =
  | {
      Details: EventMessageDetails2JMS;
    }
  | {
      Team: EventMessageTeam2JMS;
    }
  | {
      Schedule: EventMessageSchedule2JMS;
    }
  | {
      Alliance: EventMessageAlliance2JMS;
    }
  | {
      Award: EventMessageAward2JMS;
    };
export type EventMessageDetails2JMS = {
  Update: EventDetails;
};
export type EventMessageTeam2JMS =
  | {
      Insert: Team;
    }
  | {
      Delete: number;
    };
export type EventMessageSchedule2JMS =
  | "NewBlock"
  | {
      DeleteBlock: number;
    }
  | {
      UpdateBlock: ScheduleBlock;
    }
  | {
      LoadDefault: number;
    };
export type EventMessageAlliance2JMS =
  | ("Clear" | "Promote")
  | {
      Create: number;
    }
  | {
      Update: PlayoffAlliance;
    };
export type EventMessageAward2JMS =
  | {
      Create: string;
    }
  | {
      Update: Award;
    }
  | {
      Delete: number;
    };
export type ArenaMessage2JMS =
  | {
      State: ArenaMessageState2JMS;
    }
  | {
      Alliance: ArenaMessageAlliance2JMS;
    }
  | {
      Match: ArenaMessageMatch2JMS;
    }
  | {
      AudienceDisplay: ArenaMessageAudienceDisplay2JMS;
    };
export type ArenaMessageState2JMS = {
  Signal: ArenaSignal;
};
export type ArenaSignal =
  | ("Estop" | "EstopReset" | "Prestart" | "PrestartUndo" | "MatchPlay" | "MatchCommit")
  | {
      MatchArm: {
        force: boolean;
      };
    };
export type ArenaMessageAlliance2JMS = {
  UpdateAlliance: {
    astop?: boolean | null;
    bypass?: boolean | null;
    estop?: boolean | null;
    station: AllianceStationId;
    team?: number | null;
  };
};
export type ArenaMessageMatch2JMS =
  | ("LoadTest" | "Unload")
  | {
      Load: string;
    }
  | {
      ScoreUpdate: ScoreUpdateData;
    };
export type ScoreUpdate =
  | {
      Mobility: {
        crossed: boolean;
        station: number;
      };
    }
  | {
      Community: {
        auto: boolean;
        col: number;
        gamepiece: GamepieceType;
        row: number;
      };
    }
  | {
      AutoDocked: {
        docked: boolean;
      };
    }
  | {
      ChargeStationLevel: {
        auto: boolean;
        level: boolean;
      };
    }
  | {
      Endgame: {
        endgame: EndgameType;
        station: number;
      };
    }
  | {
      Penalty: {
        fouls?: number;
        tech_fouls?: number;
      };
    };
export type ArenaMessageAudienceDisplay2JMS =
  | {
      Set: ArenaMessageAudienceDisplaySet2JMS;
    }
  | {
      PlaySound: string;
    };
export type ArenaMessageAudienceDisplaySet2JMS =
  | ("Field" | "MatchPreview" | "MatchPlay" | "AllianceSelection" | "PlayoffBracket")
  | {
      MatchResults: string | null;
    }
  | {
      Award: number;
    }
  | {
      CustomMessage: string;
    };
export type MatchMessage2JMS =
  | {
      Quals: MatchMessageQuals2JMS;
    }
  | {
      Playoffs: MatchMessagePlayoffs2JMS;
    }
  | {
      Reset: string;
    }
  | {
      Delete: string;
    }
  | {
      Update: Match;
    };
export type MatchMessageQuals2JMS =
  | "Clear"
  | {
      Generate: QualsMatchGeneratorParams;
    };
export type MatchMessagePlayoffs2JMS =
  | "Clear"
  | {
      Generate: PlayoffMode;
    };
export type ResourceMessage2JMS =
  | {
      SetID: string;
    }
  | {
      SetRole: ResourceRole;
    }
  | {
      SetFTA: string | null;
    }
  | {
      SetReady: boolean;
    }
  | {
      Requirements: ResourceMessageRequirements2JMS;
    };
export type ResourceMessageRequirements2JMS = {
  SetActive: ResourceRequirements | null;
};
export type TicketMessage2JMS =
  | {
      Insert: SupportTicket;
    }
  | {
      Logs: TicketMessageLogs2JMS;
    };
export type TicketMessageLogs2JMS =
  | "Keys"
  | {
      Load: MatchStationStatusRecordKey;
    };

export interface AllWebsocketMessages {
  jms2ui: WebsocketMessage2UI;
  recv_meta: RecvMeta;
  send_meta: SendMeta;
  ui2jms: WebsocketMessage2JMS;
}
export interface EventDetails {
  av_chroma_key: string;
  av_event_colour: string;
  code?: string | null;
  event_name?: string | null;
  webcasts: string[];
}
export interface Team {
  affiliation?: string | null;
  id: number;
  location?: string | null;
  name?: string | null;
  notes?: string | null;
  schedule: boolean;
  wpakey?: string | null;
}
export interface ScheduleBlock {
  block_type: ScheduleBlockType;
  cycle_time: number;
  end_time: number;
  id?: number | null;
  name: string;
  start_time: number;
}
export interface PlayoffAlliance {
  id: number;
  ready: boolean;
  teams: (number | null)[];
}
export interface TeamRanking {
  auto_points: number;
  endgame_points: number;
  loss: number;
  played: number;
  random_num: number;
  rp: number;
  team: number;
  teleop_points: number;
  tie: number;
  win: number;
}
export interface Award {
  id?: number | null;
  name: string;
  recipients: AwardRecipient[];
}
export interface AwardRecipient {
  awardee?: string | null;
  team?: number | null;
}
export interface SerialisedAllianceStation {
  astop: boolean;
  bypass: boolean;
  can_arm: boolean;
  command_enable: boolean;
  command_mode: DSMode;
  ds_eth: boolean;
  ds_report?: AllianceStationDSReport | null;
  estop: boolean;
  master_estop: boolean;
  occupancy: AllianceStationOccupancy;
  remaining_time: Duration;
  station: AllianceStationId;
  team?: number | null;
}
export interface AllianceStationDSReport {
  battery: number;
  estop: boolean;
  mode?: DSMode | null;
  pkts_lost: number;
  pkts_sent: number;
  radio_ping: boolean;
  rio_ping: boolean;
  robot_ping: boolean;
  rtt: number;
}
export interface Duration {
  nanos: number;
  secs: number;
}
export interface AllianceStationId {
  alliance: Alliance;
  station: number;
}
export interface LoadedMatch {
  endgame: boolean;
  match_meta: SerializedMatch;
  match_time?: Duration | null;
  remaining_time: Duration;
  state: MatchPlayState;
}
export interface SerializedMatch {
  blue_alliance?: number | null;
  blue_teams: (number | null)[];
  config: MatchConfig;
  full_score?: MatchScoreSnapshot | null;
  id?: string | null;
  match_number: number;
  match_subtype?: MatchSubtype | null;
  match_type: MatchType;
  name: string;
  played: boolean;
  ready: boolean;
  red_alliance?: number | null;
  red_teams: (number | null)[];
  score?: MatchScore | null;
  score_time?: number | null;
  set_number: number;
  short_name: string;
  start_time?: number | null;
  winner?: Alliance | null;
}
export interface MatchConfig {
  auto_time: number;
  endgame_time: number;
  pause_time: number;
  teleop_time: number;
  warmup_cooldown_time: number;
}
export interface MatchScoreSnapshot {
  blue: SnapshotScore;
  red: SnapshotScore;
}
export interface SnapshotScore {
  derived: DerivedScore;
  live: LiveScore;
}
export interface DerivedScore {
  activation_rp: boolean;
  auto_docked_points: number;
  community_points: ModeScoreForInt;
  endgame_points: number;
  link_points: number;
  meets_coopertition: boolean;
  mobility_points: number;
  mode_score: ModeScoreForInt;
  penalty_score: number;
  sustainability_rp: boolean;
  sustainability_threshold: number;
  total_bonus_rp: number;
  total_rp: number;
  total_score: number;
  win_rp: number;
  win_status: WinStatus;
}
export interface ModeScoreForInt {
  auto: number;
  teleop: number;
}
export interface LiveScore {
  auto_docked: boolean;
  charge_station_level: ModeScoreFor_Boolean;
  community: ModeScoreFor_ArrayOf_ArrayOf_GamepieceType;
  endgame: EndgameType[];
  mobility: boolean[];
  penalties: Penalties;
}
export interface ModeScoreFor_Boolean {
  auto: boolean;
  teleop: boolean;
}
export interface ModeScoreFor_ArrayOf_ArrayOf_GamepieceType {
  auto: GamepieceType[][];
  teleop: GamepieceType[][];
}
export interface Penalties {
  fouls: number;
  tech_fouls: number;
}
export interface MatchScore {
  blue: LiveScore;
  red: LiveScore;
}
export interface SerialisedMatchGeneration {
  matches: SerializedMatch[];
  record?: MatchGenerationRecord | null;
  running: boolean;
}
export interface MatchGenerationRecord {
  data?: MatchGenerationRecordData | null;
  match_type: MatchType;
}
export interface TaggedResource {
  fta?: boolean;
  id: string;
  ready?: boolean;
  ready_requested?: boolean;
  role: ResourceRole;
}
export interface ScorerID {
  alliance: Alliance;
}
export interface ResourceRequirementStatus {
  element: ResourceRequirementStatusElement;
  original: ResourceRequirements;
  ready: boolean;
  satisfied: boolean;
}
export interface MappedResourceQuota {
  max?: number | null;
  min: number;
  ready: boolean;
  resource_ids: string[];
  satisfied: boolean;
  template: Resource;
}
export interface Resource {
  fta?: boolean;
  ready?: boolean;
  ready_requested?: boolean;
  role: ResourceRole;
}
export interface ResourceQuota {
  max?: number | null;
  min: number;
  template: Resource;
}
export interface SupportTicket {
  assigned_to?: string | null;
  author: string;
  id?: number | null;
  issue_type: string;
  match_id?: string | null;
  notes: TicketComment[];
  resolved: boolean;
  team: number;
}
export interface TicketComment {
  author: string;
  comment: string;
  time: number;
}
export interface MatchStationStatusRecordKey {
  match_id: string;
  team: number;
}
export interface MatchStationStatusRecord {
  key: MatchStationStatusRecordKey;
  record: StampedAllianceStationStatus[];
}
export interface StampedAllianceStationStatus {
  astop: boolean;
  bypass: boolean;
  command_enable: boolean;
  command_mode: DSMode;
  ds_eth: boolean;
  ds_report?: AllianceStationDSReport | null;
  estop: boolean;
  master_estop: boolean;
  match_state: MatchPlayState;
  match_time: Duration;
  occupancy: AllianceStationOccupancy;
  remaining_time: Duration;
  station: AllianceStationId;
  team?: number | null;
  time: number;
}
export interface RecvMeta {
  msg: WebsocketMessage2JMS;
  seq: number;
}
export interface ScoreUpdateData {
  alliance: Alliance;
  update: ScoreUpdate;
}
export interface QualsMatchGeneratorParams {
  station_anneal_steps: number;
  team_anneal_steps: number;
}
export interface Match {
  blue_alliance?: number | null;
  blue_teams: (number | null)[];
  config: MatchConfig;
  match_number: number;
  match_subtype?: MatchSubtype | null;
  match_type: MatchType;
  played: boolean;
  ready: boolean;
  red_alliance?: number | null;
  red_teams: (number | null)[];
  score?: MatchScore | null;
  score_time?: number | null;
  set_number: number;
  start_time?: number | null;
  winner?: Alliance | null;
}
export interface SendMeta {
  bcast: boolean;
  msg: WebsocketMessage2UI;
  reply?: number | null;
  seq: number;
}
