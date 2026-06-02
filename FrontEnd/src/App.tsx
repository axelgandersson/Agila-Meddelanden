import { useState } from "react";
import "./App.css";

import { SideNav } from "./components/SideNav";
import { TopBar } from "./components/TopBar";

import { ChatPage } from "./pages/ChatPage";
import { ContactsPage } from "./pages/ContactsPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";

import type { Page } from "./types/types";

function App() {
  const [page, setPage] = useState<Page>("login");

  if (page === "login") {
    return <LoginPage onLogin={() => setPage("home")} />;
  }

  return (
    <div className="app-shell">
      <SideNav currentPage={page} onChangePage={setPage} />

      <main className="content">
        <TopBar />

        {page === "home" && <HomePage onOpenChat={() => setPage("chat")} />}

        {page === "chat" && <ChatPage />}

        {page === "contacts" && (
          <ContactsPage onOpenChat={() => setPage("chat")} />
        )}
      </main>
    </div>
  );
}

export default App;
