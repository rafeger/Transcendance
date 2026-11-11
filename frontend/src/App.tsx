import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import { socket } from './lib/socket';
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Auth from "./pages/Auth";
import Lobby from "./pages/Lobby";
import MainLayout from "./layout/Layout";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import Privacy from "./pages/Privacy";
import CGU from "./pages/CGU";
import Error404 from "./pages/Error404";

interface ChatMessage {
  from:     string;
  content:  string;
  at:       string;
}
// Catalogue du design system : uniquement en développement (absent du build de prod).
const DevUi = import.meta.env.DEV
  ? lazy(() => import("./pages/dev/DevUi"))
  : null;

function App() {


  // check connection state + log debug
  useEffect(() => {
    socket.on('connect', () => 
    console.log('connected WS, id=', socket.id));
    socket.on('disconnect', (reason) =>
    console.log('disconnected WS :', (reason)));
    socket.on('connect_error', (err) =>
    console.log('refused WS :', err.message));
    socket.on("exception", (err) => console.log("⚠️ Erreur ValidationPipe:", err));

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
    };
  }, []);

  //messages

  // const [messages, setMessages] = useState<ChatMessage[]>([]);
  // useEffect(() => {
  // const onMessage = (msg:ChatMessage) => 
    // setMessages((prev) => [...prev,msg]);
  // socket.on('chatMessage', onMessage);
  // return () => {
    // socket.off('chatMessage',onMessage);//cleanup à chaque démontage
  // };
  // }, []);

  // const sendMessage = () => {
    // if (messages.trim()) {
      // socket.emit('message_to_server', messages);
      // setMessages('');
    // }
  // };


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<CGU />} />
          {DevUi && (
            <Route
              path="/dev/ui"
              element={
                <Suspense fallback={null}>
                  <DevUi />
                </Suspense>
              }
            />
          )}
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;