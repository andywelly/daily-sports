import React from 'react';
import { Game } from '../types/nba';
import { formatDate, parseGameInfo } from '../utils/helpers';
import { OddsService } from '../services/odds_services';

interface GameTableProps {
  games: Record<string, Game>;
  date: string;
}

const GameTable: React.FC<GameTableProps> = ({ games, date }) => {
  if (!games || Object.keys(games).length === 0) {
    return <p className="text-gray-700">No games found for this date.</p>;
  }

  return (
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
          {Object.values(games).map((game) => {
            const { awayTeam, homeTeam } = game.homeTeam && game.awayTeam 
              ? { homeTeam: game.homeTeam, awayTeam: game.awayTeam }
              : parseGameInfo(game.gameID);
            
            const { highest, lowest } = OddsService.findLines(game);
            
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
  );
};

export default GameTable;