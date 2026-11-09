import { io } from "socket.io-client";

export const socket = io( 'http://3000', {
    autoConnect: false,
    withCredentials: true,
});