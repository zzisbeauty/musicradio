import Player from "./components/Player";
import ChatBox from "./components/ChatBox";
import Header from "./components/Header";
export default function App() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <Player />
      <ChatBox />
    </main>
  );
}
