import { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, AlertCircle } from 'lucide-react';

interface TimeResponse {
  time: string;
}

interface ErrorState {
  message: string;
  count: number;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const App: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorState | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  const fetchTime = async () => {
    try {
      setLoading(true);
      const response = await axios.get<TimeResponse>(`${API_URL}time/`);
      setTime(response.data.time);
      setError(null);
      setRetryCount(0);
    } catch (error) {
      setError({
        message: 'Erreur de chargement',
        count: retryCount + 1
      });
      setRetryCount(prev => prev + 1);
      console.error('Error fetching time:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTime();
    const interval = setInterval(fetchTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRetry = () => {
    fetchTime();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-black text-white flex flex-col items-center justify-center p-4 space-y-8">
      <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 transform transition-all hover:scale-105">
        <div className="absolute -top-4 -right-4 bg-blue-500 rounded-full p-2">
          <Clock className="w-6 h-6 animate-pulse" />
        </div>
        
        <h1 className="text-3xl font-bold mb-6 text-blue-300">
          Heure actuelle
        </h1>

        {loading ? (
          <div className="flex flex-col space-y-4 animate-pulse">
            <div className="h-12 w-48 rounded bg-white/20" />
            <div className="h-4 w-32 rounded bg-white/10" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center space-y-4">
            <AlertCircle className="text-red-400 w-8 h-8" />
            <p className="text-red-400">{error.message}</p>
            <button 
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
            >
              Réessayer ({error.count})
            </button>
          </div>
        ) : (
          <h2 className="text-5xl font-mono tracking-wider animate-fade-in">
            {time}
          </h2>
        )}
      </div>
    </div>
  );
};

export default App;

