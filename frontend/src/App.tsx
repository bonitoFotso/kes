import { useState, useEffect } from 'react';
import axios from 'axios';

interface TimeResponse {
  time: string;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const App: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchTime = async () => {
      try {
        setLoading(true);
        const response = await axios.get<TimeResponse>(`${API_URL}time/`);
        setTime(response.data.time);
        setError('');
      } catch (error) {
        setError('Erreur de chargement');
        console.error('Error fetching time:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTime();
    const interval = setInterval(fetchTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white flex items-center justify-center p-4">
            <h1 className="text-3xl font-bold underline">    Hello world!  </h1>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-4 text-blue-300">Heure actuelle</h1>
        
        {loading ? (
          <div className="animate-pulse bg-white/20 h-12 w-48 rounded"></div>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <h2 className="text-5xl font-mono tracking-wider">{time}</h2>
        )}
      </div>
    </div>
  );
};

export default App;