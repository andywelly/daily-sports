'use client'

import { useState } from 'react';
import { ApiResponse } from '../types/nba';
import { isValidDate, getTodayDateUS } from '../utils/helpers';
import { OddsService } from '../services/odds_services';
import LoadingButton from '../components/loading_button';
import GameTable from '../components/game_table';

export default function Home() {
  const [date, setDate] = useState<string>('');
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentDisplayDate, setCurrentDisplayDate] = useState<string>('');

  /**
   * Handle the API call to fetch NBA odds
   */
  const fetchData = async (dateToFetch?: string) => {
    const fetchDate = dateToFetch || date;
    
    if (!isValidDate(fetchDate)) {
      setError('Please enter a valid date in YYYYMMDD format.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await OddsService.getNBAOdds(fetchDate);
      setData(response);
      setCurrentDisplayDate(fetchDate);
      
      // If using today's date from the button, update the input field too
      if (dateToFetch) {
        setDate(dateToFetch);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      
      if (error instanceof Error && error.message === 'API credentials are missing') {
        setError('API credentials are missing. Please check your environment variables.');
      } else {
        setError('Failed to fetch data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch today's games using US Eastern Time
   */
  const fetchTodayGames = () => {
    const todayDate = getTodayDateUS();
    fetchData(todayDate);
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

        {/* Fetch Buttons */}
        <div className="self-end flex gap-2">
          <LoadingButton 
            onClick={() => fetchData()} 
            loading={loading}
            loadingText="Fetching..."
          >
            Fetch Odds
          </LoadingButton>
          
          <LoadingButton 
            onClick={fetchTodayGames} 
            loading={loading}
            loadingText="Fetching..."
            disabled={loading}
          >
            Today&apos;s Games
          </LoadingButton>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Display Table of Games */}
      {data?.body && <GameTable games={data.body} date={currentDisplayDate} />}
    </div>
  );
}