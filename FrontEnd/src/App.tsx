import { useState } from "react";
import "./App.css";

import { SideNav } from "./components/SideNav";
import { TopBar } from "./components/TopBar";
import { ChatPage } from "./pages/ChatPage";
import { LoginPage } from "./pages/LoginPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="app-shell">
      <SideNav onLogout={() => setIsLoggedIn(false)} />

      <main className="content">
        <TopBar />
        <ChatPage />
      </main>
    </div>
  );
}

export default App;
