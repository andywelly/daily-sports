import { NBA_TEAM_CODES, TeamCodeInfo } from '../types/nba';

/**
 * Parse team names from the game ID
 */
export const parseGameInfo = (gameID: string) => {
  // Remove the date part
  const teams = gameID.split('_')[1];
  // Split the away and home teams
  const [awayTeam, homeTeam] = teams.split('@');
  
  return { awayTeam, homeTeam };
};

/**
 * Format date from YYYYMMDD to MM/DD/YYYY for display
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  
  return `${month}/${day}/${year}`;
};

/**
 * Validate date in YYYYMMDD format
 */
export const isValidDate = (dateString: string): boolean => {
  if (!dateString || dateString.length !== 8) return false;
  
  const regex = /^\d{8}$/;
  return regex.test(dateString);
};

/**
 * Get today's date in YYYYMMDD format using US Eastern Time
 */
export const getTodayDateUS = (): string => {
  // Create a date object for current time
  const now = new Date();
  
  // Convert to US Eastern Time (ET)
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };
  
  // Format the date as MM/DD/YYYY
  const etDateStr = new Intl.DateTimeFormat('en-US', options).format(now);
  
  // Convert from MM/DD/YYYY to YYYYMMDD
  const [month, day, year] = etDateStr.split('/');
  return `${year}${month}${day}`;
};


export const getTeamInfo = (teamCode: string): TeamCodeInfo | null => {
  if (!teamCode) return null;

  // Normalize the team code for case-insensitive matching
  const normalizedTeamCode = teamCode.trim().toUpperCase();

  // Find the team info in NBA_TEAM_CODES
  for (const [, info] of Object.entries(NBA_TEAM_CODES)) {
    if (info.code === normalizedTeamCode) {
      return info;
    }
  }

  // If no match is found, return null
  return null;
};
  

/**
 * Generate Basketball Reference team page URL
 */
export const getBasketballReferenceUrl = (teamInfo: TeamCodeInfo): string => {
  const currentSeason = new Date().getFullYear();
  const nextYear = currentSeason + 1;
  
  // Basketball Reference URLs use the format: https://www.basketball-reference.com/teams/[CODE]/[YEAR].html
  return `https://www.basketball-reference.com/teams/${teamInfo.basketball_reference_code}/${nextYear}.html`;
};