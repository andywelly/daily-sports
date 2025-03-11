import axios from 'axios';
import { ApiResponse, Game, LineInfo, SPORTSBOOKS, BookOdds } from '../types/nba';

/**
 * Service for fetching NBA betting odds
 */
export const OddsService = {
  /**
   * Fetches NBA betting odds for a specific date
   */
  getNBAOdds: async (date: string): Promise<ApiResponse> => {
    const rapidApiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
    const rapidApiHost = process.env.NEXT_PUBLIC_RAPIDAPI_HOST;

    if (!rapidApiKey || !rapidApiHost) {
      throw new Error('API credentials are missing');
    }

    const response = await axios.get<ApiResponse>('https://tank01-fantasy-stats.p.rapidapi.com/getNBABettingOdds', {
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': rapidApiHost
      },
      params: {
        gameDate: date
      }
    });
    
    return response.data;
  },

  /**
   * Finds the highest and lowest lines for a game
   */
  findLines: (game: Game): { highest: LineInfo, lowest: LineInfo } => {
    let highest: LineInfo = { value: '0', odds: '0', sportsbook: '' };
    let lowest: LineInfo = { value: '999', odds: '0', sportsbook: '' };

    SPORTSBOOKS.forEach(bookName => {
      const book = game[bookName] as BookOdds | undefined;
      
      if (book && book.totalUnder) {
        const underValue = parseFloat(book.totalUnder);

        // Find highest line
        if (!isNaN(underValue) && underValue > parseFloat(highest.value)) {
          highest = {
            value: book.totalUnder,
            odds: book.totalUnderOdds,
            sportsbook: bookName
          };
        }

        // Find lowest line
        if (!isNaN(underValue) && underValue < parseFloat(lowest.value)) {
          lowest = {
            value: book.totalUnder,
            odds: book.totalUnderOdds,
            sportsbook: bookName
          };
        }
      }
    });

    return { highest, lowest };
  }
};