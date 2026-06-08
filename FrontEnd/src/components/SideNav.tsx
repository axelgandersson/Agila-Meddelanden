import { useEffect, useRef, useState } from "react";
import { logout } from "../lib/auth";

type SideNavProps = {
  onLogout: () => void;
};

export function SideNav({ onLogout }: SideNavProps) {
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

      <button className="nav-button active" title="Chatt">
        💬
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
