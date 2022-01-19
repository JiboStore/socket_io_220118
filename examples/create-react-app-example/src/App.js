import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

// const socket = io('localhost:3001');
// const socket = io('https://6660-13-250-193-173.ngrok.io', {cors: true});
// const socket = io('https://burnt-vivid-plow.glitch.me');
// const socket = io('https://3c3b-13-250-193-173.ngrok.io');
const socket = io('http://localhost:3001');

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    socket.on('message', data => {
      setLastMessage(data);
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  });

  const sendMessage = () => {
    socket.emit('hello!');
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Connected: { '' + isConnected }</p>
        <p>Last message: { lastMessage || '-' }</p>
        <button onClick={ sendMessage }>Say hello!</button>
      </header>
    </div>
  );
}

export default App;
