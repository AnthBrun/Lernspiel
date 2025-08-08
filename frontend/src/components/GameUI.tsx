'use client';

import { useEffect, useState } from 'react';
import socket from '@/lib/socket';

export default function GameUI() {
  const [response, setResponse] = useState('');

  useEffect(() => {
    socket.connect();

    socket.emit('ping');
    socket.on('pong', () => setResponse('🟢 Pong empfangen'));

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Spiel-UI (Socket-Test)</h1>
      <p>Status: {response}</p>
    </div>
  );
}
