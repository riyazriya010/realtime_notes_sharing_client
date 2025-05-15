// utils/socket.ts
import { io } from 'socket.io-client';

// 'https://api.learngrow.live'
const socket = io('https://realtime-notes-sharing-server.onrender.com', {
    transports: ["websocket", "polling"],
    withCredentials: true,
});
export default socket;