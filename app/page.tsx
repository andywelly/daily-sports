'use client'
import axios from 'axios';
import { useState } from 'react';

// Define the types
interface BookOdds {
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

interface Game {
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

interface ApiResponse {
  statusCode: number;
  body: {
    [key: string]: Game;
  };
  error?: string; // Optional error field
}

interface LineInfo {
  value: string;
  odds: string;
  sportsbook: string;
}

export default function Home() {
  const [date, setDate] = useState<string>(''); // State for the date input
  const [data, setData] = useState<ApiResponse | null>(null); // State for the API response
  const [loading, setLoading] = useState<boolean>(false); // State for loading
  const [error, setError] = useState<string | null>(null); // State for errors

  // Access environment variables
  const rapidApiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
  const rapidApiHost = process.env.NEXT_PUBLIC_RAPIDAPI_HOST;

  // Function to handle the API call
  const fetchData = async () => {
    if (!date) {
      setError('Please enter a valid date in YYYYMMDD format.');
      return;
    }

    if (!rapidApiKey || !rapidApiHost) {
      setError('API credentials are missing. Please check your environment variables.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<ApiResponse>('https://tank01-fantasy-stats.p.rapidapi.com/getNBABettingOdds', {
        headers: {
          'X-RapidAPI-Key': rapidApiKey, // Use environment variable
          'X-RapidAPI-Host': rapidApiHost // Use environment variable
        },
        params: {
          gameDate: date // Use the date entered by the user
        }
      });

      setData(response.data); // Save the API response
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to parse team names from the game ID
  const parseGameInfo = (gameID: string) => {
    // Remove the date part
    const teams = gameID.split('_')[1];
    // Split the away and home teams
    const [awayTeam, homeTeam] = teams.split('@');
    
    return { awayTeam, homeTeam };
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    
    return `${month}/${day}/${year}`;
  };

  // Function to find the highest and lowest lines for a game
  const findLines = (game: Game): { highest: LineInfo, lowest: LineInfo } => {
    let highest: LineInfo = { value: '0', odds: '0', sportsbook: '' };
    let lowest: LineInfo = { value: '999', odds: '0', sportsbook: '' };

    // List of known sportsbooks to check
    const sportsbooks = [
      'ballybet', 'bet365', 'betmgm', 'betrivers', 'caesars_sportsbook',
      'draftkings', 'espnbet', 'fanduel'
    ];

    sportsbooks.forEach(bookName => {
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
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">NBA Betting Odds</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Date Input */}
        <div className="flex flex-col">
          <label htmlFor="date" className="mb-1 font-medium">Enter Date (YYYYMMDD): </label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="e.g., 20240107"
            className="border p-2 rounded"
          />
        </div>

        {/* Fetch Button */}
        <div className="self-end">
          <button 
            onClick={fetchData} 
            disabled={loading}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? 'Fetching...' : 'Fetch Odds'}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Display Table of Games */}
      {data?.body && Object.keys(data.body).length > 0 && (
        <div className="overflow-x-auto">
          <h2 className="text-xl font-semibold mb-2">
            Odds for {formatDate(date)}
          </h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left border-b">Game</th>
                <th className="px-4 py-2 text-center border-b">Highest Line</th>
                <th className="px-4 py-2 text-center border-b">Lowest Line</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(data.body).map((game) => {
                const { awayTeam, homeTeam } = game.homeTeam && game.awayTeam 
                  ? { homeTeam: game.homeTeam, awayTeam: game.awayTeam }
                  : parseGameInfo(game.gameID);
                
                const { highest, lowest } = findLines(game);
                
                return (
                  <tr key={game.gameID} className="hover:bg-gray-50 border-b">
                    <td className="px-4 py-3">
                      <div className="font-medium">{homeTeam} vs {awayTeam}</div>
                      <div className="text-sm text-gray-600">{formatDate(game.gameDate)}</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="font-medium">{highest.value}</div>
                      <div>Odds: {highest.odds}</div>
                      <div className="text-xs text-gray-500">via {highest.sportsbook}</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="font-medium">{lowest.value}</div>
                      <div>Odds: {lowest.odds}</div>
                      <div className="text-xs text-gray-500">via {lowest.sportsbook}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Show message if no data */}
      {data && (!data.body || Object.keys(data.body).length === 0) && (
        <p className="text-gray-700">No games found for this date.</p>
      )}
    </div>
  );
}