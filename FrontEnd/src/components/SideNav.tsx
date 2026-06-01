import type { Page } from "../types/types";

type SideNavProps = {
  currentPage: Page;
  onChangePage: (page: Page) => void;
};

export function SideNav({ currentPage, onChangePage }: SideNavProps) {
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

      <button className="nav-button settings-button">⚙️</button>
    </aside>
  );
}
