/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "Alliance".
 */
export type Alliance = "blue" | "red";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "AllianceStationUpdate".
 */
export type AllianceStationUpdate =
  | {
      id: AllianceStationId;
    }
  | {
      team: number | null;
    }
  | {
      bypass: boolean;
    }
  | {
      estop: boolean;
    }
  | {
      astop: boolean;
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "ArenaSignal".
 */
export type ArenaSignal =
  | ("Estop" | "EstopReset" | "Prestart" | "PrestartUndo" | "MatchPlay" | "MatchCommit")
  | {
      MatchArm: {
        force: boolean;
      };
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "ArenaState".
 */
export type ArenaState =
  | {
      state: "Init";
    }
  | {
      state: "Reset";
    }
  | {
      state: "Idle";
    }
  | {
      state: "Estop";
    }
  | {
      state: "Prestart";
    }
  | {
      state: "MatchArmed";
    }
  | {
      state: "MatchPlay";
    }
  | {
      state: "MatchComplete";
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "AudienceDisplaySound".
 */
export type AudienceDisplaySound = "AutoStart" | "TeleopStart" | "Endgame" | "Estop" | "MatchStop";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "AudienceDisplayScene".
 */
export type AudienceDisplayScene =
  | {
      scene: "Blank";
    }
  | {
      scene: "MatchPreview";
    }
  | {
      scene: "MatchPlay";
    }
  | {
      params: string;
      scene: "MatchResults";
    }
  | {
      scene: "AllianceSelection";
    }
  | {
      scene: "PlayoffBracket";
    }
  | {
      params: string;
      scene: "Award";
    }
  | {
      params: string;
      scene: "CustomMessage";
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "AuthResult".
 */
export type AuthResult =
  | {
      token: UserToken;
      type: "AuthSuccess";
      user: User;
    }
  | {
      token: UserToken;
      type: "AuthSuccessNewPin";
      user: User;
    }
  | {
      type: "NoToken";
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "Permission".
 */
export type Permission =
  | "Admin"
  | "FTA"
  | "FTAA"
  | "Scorekeeper"
  | "ManageEvent"
  | "ManageTeams"
  | "ManageSchedule"
  | "ManagePlayoffs"
  | "ManageAwards"
  | "MatchFlow"
  | "Estop"
  | "Scoring"
  | "EditScores"
  | "ManageAlliances"
  | "ManageAudience"
  | "Ticketing";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "GamepieceType".
 */
export type GamepieceType = "None" | "Cone" | "Cube";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "EndgameType".
 */
export type EndgameType = "None" | "Parked" | "Docked";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "WinStatus".
 */
export type WinStatus = "WIN" | "LOSS" | "TIE";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "RobotState".
 */
export type RobotState = "Auto" | "Test" | "Teleop";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "MatchType".
 */
export type MatchType = "Test" | "Qualification" | "Playoff" | "Final";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "MatchPlayState".
 */
export type MatchPlayState = "Waiting" | "Warmup" | "Auto" | "Pause" | "Teleop" | "Cooldown" | "Complete" | "Fault";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "RadioType".
 */
export type RadioType = "Linksys" | "Unifi";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "NetworkingSettingsUpdate".
 */
export type NetworkingSettingsUpdate =
  | {
      router_username: string;
    }
  | {
      router_password: string;
    }
  | {
      radio_username: string;
    }
  | {
      radio_password: string;
    }
  | {
      radio_type: RadioType;
    }
  | {
      team_channel: number | null;
    }
  | {
      admin_channel: number | null;
    }
  | {
      admin_ssid: string | null;
    }
  | {
      admin_password: string | null;
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "PlayoffModeType".
 */
export type PlayoffModeType = "Bracket" | "DoubleBracket";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "ScheduleBlockType".
 */
export type ScheduleBlockType =
  | {
      type: "General";
    }
  | {
      type: "Ceremonies";
    }
  | {
      type: "Lunch";
    }
  | {
      type: "FieldTests";
    }
  | {
      type: "SetupTeardown";
    }
  | {
      cycle_time: number;
      type: "Qualification";
    }
  | {
      type: "Playoff";
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "ScheduleBlockUpdate".
 */
export type ScheduleBlockUpdate =
  | {
      id: string;
    }
  | {
      block_type: ScheduleBlockType;
    }
  | {
      name: string;
    }
  | {
      start_time: string;
    }
  | {
      end_time: string;
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "ScoreUpdate".
 */
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
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "TBASettingsUpdate".
 */
export type TBASettingsUpdate =
  | {
      auth_id: string | null;
    }
  | {
      auth_key: string | null;
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "TeamUpdate".
 */
export type TeamUpdate =
  | {
      number: number;
    }
  | {
      display_number: string;
    }
  | {
      name: string | null;
    }
  | {
      affiliation: string | null;
    }
  | {
      location: string | null;
    }
  | {
      notes: string | null;
    }
  | {
      wpakey: string;
    }
  | {
      schedule: boolean;
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "UserUpdate".
 */
export type UserUpdate =
  | {
      username: string;
    }
  | {
      realname: string;
    }
  | {
      pin_hash: string | null;
    }
  | {
      pin_is_numeric: boolean;
    }
  | {
      permissions: Permission[];
    }
  | {
      tokens: string[];
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "WebsocketPublish".
 */
export type WebsocketPublish =
  | {
      data: PlayoffAlliance[];
      path: "alliances/alliances";
    }
  | {
      /**
       * @minItems 2
       * @maxItems 2
       */
      data: [string, JmsComponent[]];
      path: "components/components";
    }
  | {
      data: string;
      path: "debug/test_publish";
    }
  | {
      data: Team[];
      path: "team/teams";
    }
  | {
      data: ArenaState;
      path: "arena/state";
    }
  | {
      data: SerialisedLoadedMatch | null;
      path: "arena/current_match";
    }
  | {
      data: AllianceStation[];
      path: "arena/stations";
    }
  | {
      data: DriverStationReport[];
      path: "arena/ds";
    }
  | {
      data: EventDetails;
      path: "event/details";
    }
  | {
      data: Match[];
      path: "matches/matches";
    }
  | {
      data: Match | null;
      path: "matches/next";
    }
  | {
      data: boolean;
      path: "matches/generator_busy";
    }
  | {
      data: MatchScoreSnapshot;
      path: "scoring/current";
    }
  | {
      data: CommittedMatchScores | null;
      path: "scoring/latest_scores";
    }
  | {
      data: TeamRanking[];
      path: "scoring/rankings";
    }
  | {
      data: AudienceDisplay;
      path: "audience/current";
    }
  | {
      data: Award[];
      path: "awards/awards";
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "WebsocketRpcRequest".
 */
export type WebsocketRpcRequest =
  | {
      data: null;
      path: "alliances/create";
    }
  | {
      data: null;
      path: "alliances/delete_all";
    }
  | {
      data: null;
      path: "alliances/promote";
    }
  | {
      data: {
        number: number;
        teams: number[];
      };
      path: "alliances/set_teams";
    }
  | {
      data: {
        in_text: string;
      };
      path: "debug/test_endpoint";
    }
  | {
      data: {
        affiliation: string | null;
        display_number: string;
        location: string | null;
        name: string | null;
        team_number: number;
      };
      path: "team/new_team";
    }
  | {
      data: {
        team_number: number;
        updates: TeamUpdate[];
      };
      path: "team/update";
    }
  | {
      data: {
        team_number: number;
      };
      path: "team/delete";
    }
  | {
      data: {
        signal: ArenaSignal;
      };
      path: "arena/signal";
    }
  | {
      data: {
        match_id: string;
      };
      path: "arena/load_match";
    }
  | {
      data: null;
      path: "arena/load_test_match";
    }
  | {
      data: null;
      path: "arena/unload_match";
    }
  | {
      data: {
        station_id: AllianceStationId;
        updates: AllianceStationUpdate[];
      };
      path: "arena/update_station";
    }
  | {
      data: {
        astop: boolean;
        station_id: AllianceStationId;
      };
      path: "arena/estop_station";
    }
  | {
      data: {
        details: EventDetails;
      };
      path: "event/update";
    }
  | {
      data: null;
      path: "event/schedule_get";
    }
  | {
      data: {
        block_type: ScheduleBlockType;
        end: string;
        name: string;
        start: string;
      };
      path: "event/schedule_new_block";
    }
  | {
      data: {
        block_id: string;
      };
      path: "event/schedule_delete";
    }
  | {
      data: {
        block_id: string;
        updates: ScheduleBlockUpdate[];
      };
      path: "event/schedule_edit";
    }
  | {
      data: {
        match_id: string;
      };
      path: "matches/delete";
    }
  | {
      data: null;
      path: "matches/debug_delete_all";
    }
  | {
      data: {
        params: QualsMatchGeneratorParams;
      };
      path: "matches/gen_quals";
    }
  | {
      data: null;
      path: "matches/get_playoff_mode";
    }
  | {
      data: {
        mode: PlayoffMode;
      };
      path: "matches/set_playoff_mode";
    }
  | {
      data: null;
      path: "matches/reset_playoffs";
    }
  | {
      data: null;
      path: "matches/update_playoffs";
    }
  | {
      data: {
        update: ScoreUpdateData;
      };
      path: "scoring/score_update";
    }
  | {
      data: null;
      path: "scoring/get_matches_with_scores";
    }
  | {
      data: {
        match_id: string;
      };
      path: "scoring/get_committed";
    }
  | {
      data: {
        match_id: string;
      };
      path: "scoring/new_committed_record";
    }
  | {
      data: {
        match_id: string;
        score: MatchScore;
      };
      path: "scoring/push_committed_score";
    }
  | {
      data: null;
      path: "scoring/get_default_scores";
    }
  | {
      data: {
        score: MatchScore;
      };
      path: "scoring/derive_score";
    }
  | {
      data: {
        ty: MatchType;
      };
      path: "scoring/debug_random_fill";
    }
  | {
      data: null;
      path: "scoring/update_rankings";
    }
  | {
      data: null;
      path: "user/auth_with_token";
    }
  | {
      data: {
        pin: string;
        username: string;
      };
      path: "user/auth_with_pin";
    }
  | {
      data: {
        pin: string;
      };
      path: "user/update_pin";
    }
  | {
      data: null;
      path: "user/logout";
    }
  | {
      data: null;
      path: "user/users";
    }
  | {
      data: {
        permissions: Permission[];
        realname: string;
        username: string;
      };
      path: "user/new";
    }
  | {
      data: {
        updates: UserUpdate[];
        username: string;
      };
      path: "user/update";
    }
  | {
      data: {
        user_id: string;
      };
      path: "user/delete";
    }
  | {
      data: {
        scene: AudienceDisplayScene;
      };
      path: "audience/set";
    }
  | {
      data: {
        sound: AudienceDisplaySound;
      };
      path: "audience/play_sound";
    }
  | {
      data: null;
      path: "reports/awards";
    }
  | {
      data: null;
      path: "reports/teams";
    }
  | {
      data: null;
      path: "reports/rankings";
    }
  | {
      data: {
        individual: boolean;
        match_type: MatchType;
      };
      path: "reports/matches";
    }
  | {
      data: {
        csv: boolean;
      };
      path: "reports/wpa_key";
    }
  | {
      data: null;
      path: "tickets/all";
    }
  | {
      data: {
        id: string;
      };
      path: "tickets/get";
    }
  | {
      data: {
        issue_type: string;
        match_id: string | null;
        team: number;
      };
      path: "tickets/new";
    }
  | {
      data: {
        comment: string;
        id: string;
      };
      path: "tickets/push_comment";
    }
  | {
      data: {
        assign: boolean;
        id: string;
      };
      path: "tickets/assign";
    }
  | {
      data: {
        id: string;
        resolve: boolean;
      };
      path: "tickets/resolve";
    }
  | {
      data: null;
      path: "networking/settings";
    }
  | {
      data: {
        update: NetworkingSettingsUpdate;
      };
      path: "networking/update_settings";
    }
  | {
      data: null;
      path: "networking/reload_admin";
    }
  | {
      data: null;
      path: "networking/force_reprovision";
    }
  | {
      data: {
        award: Award;
      };
      path: "awards/set_award";
    }
  | {
      data: {
        award_id: string;
      };
      path: "awards/delete_award";
    }
  | {
      data: null;
      path: "tba/get_settings";
    }
  | {
      data: {
        update: TBASettingsUpdate;
      };
      path: "tba/update_settings";
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "WebsocketRpcResponse".
 */
export type WebsocketRpcResponse =
  | {
      data: PlayoffAlliance[];
      path: "alliances/create";
    }
  | {
      data: null;
      path: "alliances/delete_all";
    }
  | {
      data: PlayoffAlliance[];
      path: "alliances/promote";
    }
  | {
      data: PlayoffAlliance;
      path: "alliances/set_teams";
    }
  | {
      data: string;
      path: "debug/test_endpoint";
    }
  | {
      data: Team;
      path: "team/new_team";
    }
  | {
      data: Team;
      path: "team/update";
    }
  | {
      data: null;
      path: "team/delete";
    }
  | {
      data: null;
      path: "arena/signal";
    }
  | {
      data: null;
      path: "arena/load_match";
    }
  | {
      data: null;
      path: "arena/load_test_match";
    }
  | {
      data: null;
      path: "arena/unload_match";
    }
  | {
      data: null;
      path: "arena/update_station";
    }
  | {
      data: null;
      path: "arena/estop_station";
    }
  | {
      data: EventDetails;
      path: "event/update";
    }
  | {
      data: ScheduleBlock[];
      path: "event/schedule_get";
    }
  | {
      data: ScheduleBlock;
      path: "event/schedule_new_block";
    }
  | {
      data: null;
      path: "event/schedule_delete";
    }
  | {
      data: ScheduleBlock;
      path: "event/schedule_edit";
    }
  | {
      data: null;
      path: "matches/delete";
    }
  | {
      data: null;
      path: "matches/debug_delete_all";
    }
  | {
      data: null;
      path: "matches/gen_quals";
    }
  | {
      data: PlayoffMode;
      path: "matches/get_playoff_mode";
    }
  | {
      data: PlayoffMode;
      path: "matches/set_playoff_mode";
    }
  | {
      data: null;
      path: "matches/reset_playoffs";
    }
  | {
      data: null;
      path: "matches/update_playoffs";
    }
  | {
      data: MatchScoreSnapshot;
      path: "scoring/score_update";
    }
  | {
      data: string[];
      path: "scoring/get_matches_with_scores";
    }
  | {
      data: CommittedMatchScores;
      path: "scoring/get_committed";
    }
  | {
      data: CommittedMatchScores;
      path: "scoring/new_committed_record";
    }
  | {
      data: CommittedMatchScores;
      path: "scoring/push_committed_score";
    }
  | {
      data: MatchScore;
      path: "scoring/get_default_scores";
    }
  | {
      data: MatchScoreSnapshot;
      path: "scoring/derive_score";
    }
  | {
      data: null;
      path: "scoring/debug_random_fill";
    }
  | {
      data: TeamRanking[];
      path: "scoring/update_rankings";
    }
  | {
      data: AuthResult;
      path: "user/auth_with_token";
    }
  | {
      data: AuthResult;
      path: "user/auth_with_pin";
    }
  | {
      data: User;
      path: "user/update_pin";
    }
  | {
      data: null;
      path: "user/logout";
    }
  | {
      data: User[];
      path: "user/users";
    }
  | {
      data: User;
      path: "user/new";
    }
  | {
      data: User;
      path: "user/update";
    }
  | {
      data: null;
      path: "user/delete";
    }
  | {
      data: null;
      path: "audience/set";
    }
  | {
      data: null;
      path: "audience/play_sound";
    }
  | {
      data: ReportData;
      path: "reports/awards";
    }
  | {
      data: ReportData;
      path: "reports/teams";
    }
  | {
      data: ReportData;
      path: "reports/rankings";
    }
  | {
      data: ReportData;
      path: "reports/matches";
    }
  | {
      data: ReportData;
      path: "reports/wpa_key";
    }
  | {
      data: SupportTicket[];
      path: "tickets/all";
    }
  | {
      data: SupportTicket;
      path: "tickets/get";
    }
  | {
      data: SupportTicket;
      path: "tickets/new";
    }
  | {
      data: SupportTicket;
      path: "tickets/push_comment";
    }
  | {
      data: SupportTicket;
      path: "tickets/assign";
    }
  | {
      data: SupportTicket;
      path: "tickets/resolve";
    }
  | {
      data: NetworkingSettings;
      path: "networking/settings";
    }
  | {
      data: NetworkingSettings;
      path: "networking/update_settings";
    }
  | {
      data: null;
      path: "networking/reload_admin";
    }
  | {
      data: null;
      path: "networking/force_reprovision";
    }
  | {
      data: Award;
      path: "awards/set_award";
    }
  | {
      data: null;
      path: "awards/delete_award";
    }
  | {
      data: TBASettings;
      path: "tba/get_settings";
    }
  | {
      data: TBASettings;
      path: "tba/update_settings";
    };

export interface TempWebsocketRootSchema {
  [k: string]: unknown;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "AllianceStation".
 */
export interface AllianceStation {
  astop: boolean;
  bypass: boolean;
  estop: boolean;
  id: AllianceStationId;
  team?: number | null;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "AllianceStationId".
 */
export interface AllianceStationId {
  alliance: Alliance;
  station: number;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "AudienceDisplay".
 */
export interface AudienceDisplay {
  queued_sound?: AudienceDisplaySound | null;
  scene: AudienceDisplayScene;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "UserToken".
 */
export interface UserToken {
  token: string;
  user: string;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "User".
 */
export interface User {
  permissions: Permission[];
  pin_hash?: string | null;
  pin_is_numeric: boolean;
  realname: string;
  tokens: string[];
  username: string;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "Award".
 */
export interface Award {
  id: string;
  name: string;
  recipients: AwardRecipient[];
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "AwardRecipient".
 */
export interface AwardRecipient {
  awardee?: string | null;
  team?: string | null;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "CommittedMatchScores".
 */
export interface CommittedMatchScores {
  last_update: string;
  match_id: string;
  scores: MatchScore[];
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "MatchScore".
 */
export interface MatchScore {
  blue: LiveScore;
  red: LiveScore;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "LiveScore".
 */
export interface LiveScore {
  auto_docked: boolean;
  charge_station_level: ModeScoreFor_Boolean;
  community: ModeScoreFor_ArrayOf_ArrayOf_GamepieceType;
  endgame: EndgameType[];
  mobility: boolean[];
  penalties: Penalties;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "ModeScore_for_Boolean".
 */
export interface ModeScoreFor_Boolean {
  auto: boolean;
  teleop: boolean;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "ModeScore_for_Array_of_Array_of_GamepieceType".
 */
export interface ModeScoreFor_ArrayOf_ArrayOf_GamepieceType {
  auto: GamepieceType[][];
  teleop: GamepieceType[][];
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "Penalties".
 */
export interface Penalties {
  fouls: number;
  tech_fouls: number;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "DerivedScore".
 */
export interface DerivedScore {
  activation_rp: boolean;
  auto_docked_points: number;
  community_points: ModeScoreForInt;
  endgame_points: number;
  link_count: number;
  link_points: number;
  links: Link[];
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
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "ModeScore_for_int".
 */
export interface ModeScoreForInt {
  auto: number;
  teleop: number;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "Link".
 */
export interface Link {
  /**
   * @minItems 3
   * @maxItems 3
   */
  nodes: [number, number, number];
  row: number;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "DriverStationReport".
 */
export interface DriverStationReport {
  actual_station?: AllianceStationId | null;
  battery_voltage: number;
  estop: boolean;
  mode: RobotState;
  pkts_lost: number;
  pkts_sent: number;
  radio_ping: boolean;
  rio_ping: boolean;
  robot_ping: boolean;
  rtt: number;
  team: number;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "EventDetails".
 */
export interface EventDetails {
  av_chroma_key: string;
  av_event_colour: string;
  code?: string | null;
  event_name?: string | null;
  webcasts: string[];
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "JmsComponent".
 */
export interface JmsComponent {
  id: string;
  last_tick: string;
  name: string;
  symbol: string;
  timeout_ms: number;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "Match".
 */
export interface Match {
  blue_alliance?: number | null;
  blue_teams: (number | null)[];
  id: string;
  match_number: number;
  match_type: MatchType;
  name: string;
  played: boolean;
  ready: boolean;
  red_alliance?: number | null;
  red_teams: (number | null)[];
  round: number;
  set_number: number;
  start_time: string;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "MatchScoreSnapshot".
 */
export interface MatchScoreSnapshot {
  blue: SnapshotScore;
  red: SnapshotScore;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "SnapshotScore".
 */
export interface SnapshotScore {
  derived: DerivedScore;
  live: LiveScore;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "NetworkingSettings".
 */
export interface NetworkingSettings {
  admin_channel?: number | null;
  admin_password?: string | null;
  admin_ssid?: string | null;
  radio_password: string;
  radio_type: RadioType;
  radio_username: string;
  router_password: string;
  router_username: string;
  team_channel?: number | null;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "PlayoffAlliance".
 */
export interface PlayoffAlliance {
  number: number;
  teams: number[];
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "PlayoffMode".
 */
export interface PlayoffMode {
  awards: string[];
  minimum_round_break: number;
  mode: PlayoffModeType;
  n_alliances: number;
  time_per_award: number;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "QualsMatchGeneratorParams".
 */
export interface QualsMatchGeneratorParams {
  station_anneal_steps: number;
  team_anneal_steps: number;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "ReportData".
 */
export interface ReportData {
  data: number[];
  mime: string;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "ScheduleBlock".
 */
export interface ScheduleBlock {
  block_type: ScheduleBlockType;
  end_time: string;
  id: string;
  name: string;
  start_time: string;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "ScoreUpdateData".
 */
export interface ScoreUpdateData {
  alliance: Alliance;
  update: ScoreUpdate;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "SerialisedLoadedMatch".
 */
export interface SerialisedLoadedMatch {
  endgame: boolean;
  match_id: string;
  match_time?: number | null;
  remaining: number;
  state: MatchPlayState;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "SupportTicket".
 */
export interface SupportTicket {
  assigned_to?: string | null;
  author: string;
  id: string;
  issue_type: string;
  match_id?: string | null;
  notes: TicketComment[];
  resolved: boolean;
  team: number;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "TicketComment".
 */
export interface TicketComment {
  author: string;
  comment: string;
  time: string;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "TBASettings".
 */
export interface TBASettings {
  auth_id?: string | null;
  auth_key?: string | null;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "Team".
 */
export interface Team {
  affiliation?: string | null;
  display_number: string;
  location?: string | null;
  name?: string | null;
  notes?: string | null;
  number: number;
  schedule: boolean;
  wpakey: string;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "TeamRanking".
 */
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
