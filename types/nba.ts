// Define the types for NBA betting odds
export interface BookOdds {
    totalUnder: string;
    totalOver: string;
    totalUnderOdds: string;
    totalOverOdds: string;
    awayTeamSpread: string;
    awayTeamSpreadOdds: string;
    homeTeamSpread: string;
    homeTeamSpreadOdds: string;
    awayTeamMLOdds: string;
    homeTeamMLOdds: string;
  }
  
  export interface Game {
    gameID: string;
    last_updated_e_time: string;
    gameDate: string;
    teamIDHome?: string;
    teamIDAway?: string;
    homeTeam?: string;
    awayTeam?: string;
    ballybet?: BookOdds;
    bet365?: BookOdds;
    betmgm?: BookOdds;
    betrivers?: BookOdds;
    caesars_sportsbook?: BookOdds;
    draftkings?: BookOdds;
    espnbet?: BookOdds;
    fanduel?: BookOdds;
    [key: string]: BookOdds | string | undefined;
  }
  
  export interface ApiResponse {
    statusCode: number;
    body: {
      [key: string]: Game;
    };
    error?: string;
  }
  
  export interface LineInfo {
    value: string;
    odds: string;
    sportsbook: string;
  }
  
  // Constants for sportsbooks
  export const SPORTSBOOKS = [
    'ballybet', 'bet365', 'betmgm', 'betrivers', 'caesars_sportsbook',
    'draftkings', 'espnbet', 'fanduel'
  ];