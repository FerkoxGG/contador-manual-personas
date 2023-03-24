import { io } from 'socket.io-client';

const SOCKET_BASE_URL = 'https://ikcount.com/live';

export function createSocketConnection(accessToken, updateCounter) {
  const socket = io(SOCKET_BASE_URL, {
    query: {
      atoken: accessToken,
    },
    forceNew: true,
  });

  socket.on('connect', () => {
    console.log('SocketIO connected');
  });

  socket.on('welcome', (data) => {
    console.log('WELCOME:', data);
    const newCounterValue = data.current_aforo;
    updateCounter(newCounterValue);
  });

  socket.on('raw', (data) => {
    console.log('RAW', data);
    const newCounterValue = data.current_aforo;
    updateCounter(newCounterValue);
  });

  socket.on('summary', (data) => {
    console.log('SUMMARY:', data);
    const newCounterValue = data.current_aforo;
    updateCounter(newCounterValue);
  });

  socket.on('heartbeat', (data) => {
    console.log('HEARTBEAT:', data);
    const newCounterValue = data.current_aforo;
    updateCounter(newCounterValue);
  });

  return socket;
}
