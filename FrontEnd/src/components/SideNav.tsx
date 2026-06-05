import { logout } from "../lib/auth";
import type { Page } from "../types/types";

type SideNavProps = {
  currentPage: Page;
  onChangePage: (page: Page) => void;
  onLogout: () => void;
};

export function SideNav({ currentPage, onChangePage, onLogout }: SideNavProps) {
  const handleLogout = async () => {
    const { error } = await logout();
    if (!error) {
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

      <button
        type="button"
        className="nav-button settings-button"
        onClick={handleLogout}
        title="Logga ut"
        aria-label="Logga ut"
      >
        ⚙️
      </button>
    </aside>
  );
}
