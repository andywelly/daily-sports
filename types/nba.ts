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
  
  // Interface for team codes and basketball reference links
  export interface TeamCodeInfo {
    code: string;
    basketball_reference_code: string;
    full_name: string;
  }
  
  // Constants for sportsbooks
  export const SPORTSBOOKS = [
    'ballybet', 'bet365', 'betmgm', 'betrivers', 'caesars_sportsbook',
    'draftkings', 'espnbet', 'fanduel'
  ];
  
  // Map of NBA team names to their codes
  // Some teams have different codes on Basketball Reference
  export const NBA_TEAM_CODES: Record<string, TeamCodeInfo> = {
    'Hawks': { code: 'ATL', basketball_reference_code: 'ATL', full_name: 'Atlanta Hawks' },
    'Celtics': { code: 'BOS', basketball_reference_code: 'BOS', full_name: 'Boston Celtics' },
    'Nets': { code: 'BKN', basketball_reference_code: 'BRK', full_name: 'Brooklyn Nets' },
    'Hornets': { code: 'CHA', basketball_reference_code: 'CHO', full_name: 'Charlotte Hornets' },
    'Bulls': { code: 'CHI', basketball_reference_code: 'CHI', full_name: 'Chicago Bulls' },
    'Cavaliers': { code: 'CLE', basketball_reference_code: 'CLE', full_name: 'Cleveland Cavaliers' },
    'Mavericks': { code: 'DAL', basketball_reference_code: 'DAL', full_name: 'Dallas Mavericks' },
    'Nuggets': { code: 'DEN', basketball_reference_code: 'DEN', full_name: 'Denver Nuggets' },
    'Pistons': { code: 'DET', basketball_reference_code: 'DET', full_name: 'Detroit Pistons' },
    'Warriors': { code: 'GSW', basketball_reference_code: 'GSW', full_name: 'Golden State Warriors' },
    'Rockets': { code: 'HOU', basketball_reference_code: 'HOU', full_name: 'Houston Rockets' },
    'Pacers': { code: 'IND', basketball_reference_code: 'IND', full_name: 'Indiana Pacers' },
    'Clippers': { code: 'LAC', basketball_reference_code: 'LAC', full_name: 'Los Angeles Clippers' },
    'Lakers': { code: 'LAL', basketball_reference_code: 'LAL', full_name: 'Los Angeles Lakers' },
    'Grizzlies': { code: 'MEM', basketball_reference_code: 'MEM', full_name: 'Memphis Grizzlies' },
    'Heat': { code: 'MIA', basketball_reference_code: 'MIA', full_name: 'Miami Heat' },
    'Bucks': { code: 'MIL', basketball_reference_code: 'MIL', full_name: 'Milwaukee Bucks' },
    'Timberwolves': { code: 'MIN', basketball_reference_code: 'MIN', full_name: 'Minnesota Timberwolves' },
    'Pelicans': { code: 'NOP', basketball_reference_code: 'NOP', full_name: 'New Orleans Pelicans' },
    'Knicks': { code: 'NYK', basketball_reference_code: 'NYK', full_name: 'New York Knicks' },
    'Thunder': { code: 'OKC', basketball_reference_code: 'OKC', full_name: 'Oklahoma City Thunder' },
    'Magic': { code: 'ORL', basketball_reference_code: 'ORL', full_name: 'Orlando Magic' },
    '76ers': { code: 'PHI', basketball_reference_code: 'PHI', full_name: 'Philadelphia 76ers' },
    'Suns': { code: 'PHX', basketball_reference_code: 'PHO', full_name: 'Phoenix Suns' },
    'Trail Blazers': { code: 'POR', basketball_reference_code: 'POR', full_name: 'Portland Trail Blazers' },
    'Kings': { code: 'SAC', basketball_reference_code: 'SAC', full_name: 'Sacramento Kings' },
    'Spurs': { code: 'SAS', basketball_reference_code: 'SAS', full_name: 'San Antonio Spurs' },
    'Raptors': { code: 'TOR', basketball_reference_code: 'TOR', full_name: 'Toronto Raptors' },
    'Jazz': { code: 'UTA', basketball_reference_code: 'UTA', full_name: 'Utah Jazz' },
    'Wizards': { code: 'WAS', basketball_reference_code: 'WAS', full_name: 'Washington Wizards' }
  };