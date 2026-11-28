import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { socket } from './lib/socket';
import { ProtectedRoute } from './components/guard/ProtectedRoute';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Auth from './pages/Auth';
import Lobby from './pages/Lobby';
import MainLayout from './layout/Layout';
import Profile from './pages/Profile';
import Friends from './pages/Friends';
import Privacy from './pages/Privacy';
import CGU from './pages/CGU';
import Error404 from './pages/Error404';
import Room from './pages/Room';

// interface ChatMessage {
// from:     string;
// content:  string;
// at:       string;
// }
// Catalogue du design system : uniquement en développement (absent du build de prod).
const DevUi = import.meta.env.DEV
  ? lazy(() => import('./pages/dev/DevUi'))
  : null;

function App() {

  const [isReconnecting, setIsReconnecting] = useState(false);
  // check connection state + log debug
  useEffect(() => {
    const onConnect = () => {
      console.log('connected WS, id=', socket.id);
      setIsReconnecting(false); // Cache le bandeau dès que ça revient
    };
    const onDisconnect = (reason: string) => {
      console.log('disconnected WS :', reason);
      // Si la coupure n'est pas volontaire (ex: perte réseau ou redémarrage serveur)
      if (reason !== 'io client disconnect') {
        setIsReconnecting(true); //Affiche bandeau "Reconnexion..."
      }
    };
    socket.on('connect_error', (err) =>
      console.log('refused WS :', err.message),
    );
    socket.on('exception', (err) =>
      console.log('⚠️ Erreur ValidationPipe:', err),
    );

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
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
      {isReconnecting && (
        <div className='bg-amber-500 text-white text-center py-2 font-semibold fixed top-0 w-full z-50'>
          Reconnection...
        </div>
      )}
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/lobby" element={<ProtectedRoute><Lobby /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/friends" element={<ProtectedRoute><Friends /></ProtectedRoute>} />
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
          <Route path="/room/:code" element={<ProtectedRoute><Room /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
