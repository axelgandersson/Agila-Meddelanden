import { useEffect, useRef, useState } from "react";
import { logout } from "../lib/auth";
import type { Page } from "../types/types";

type SideNavProps = {
  currentPage: Page;
  onChangePage: (page: Page) => void;
  onLogout: () => void;
};

export function SideNav({ currentPage, onChangePage, onLogout }: SideNavProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!settingsOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [settingsOpen]);

  const handleLogout = async () => {
    const { error } = await logout();
    if (!error) {
      setSettingsOpen(false);
      onLogout();
    }
  };

  return (
    <aside className="side-nav">
      <div className="nav-logo"></div>

      <button
        className={currentPage === "home" ? "nav-button active" : "nav-button"}
        onClick={() => onChangePage("home")}
      >
        🏠
      </button>

      <button
        className={currentPage === "chat" ? "nav-button active" : "nav-button"}
        onClick={() => onChangePage("chat")}
      >
        💬
      </button>

      <button
        className={
          currentPage === "contacts" ? "nav-button active" : "nav-button"
        }
        onClick={() => onChangePage("contacts")}
      >
        👤
      </button>

      <div className="settings-area" ref={settingsRef}>
        {settingsOpen && (
          <div className="settings-panel" role="dialog" aria-label="Inställningar">
            <button
              type="button"
              className="settings-logout-button"
              onClick={handleLogout}
            >
              Logga ut
            </button>
          </div>
        )}

        <button
          type="button"
          className="nav-button settings-button"
          onClick={() => setSettingsOpen((open) => !open)}
          title="Inställningar"
          aria-label="Inställningar"
          aria-expanded={settingsOpen}
        >
          ⚙️
        </button>
      </div>
    </aside>
  );
}
