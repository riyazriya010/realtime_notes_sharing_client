// utils/socket.ts
import { io } from 'socket.io-client';

// 'https://api.learngrow.live'
const socket = io('http://localhost:4001', {
    transports: ["websocket", "polling"],
    withCredentials: true,
});
export default socket;