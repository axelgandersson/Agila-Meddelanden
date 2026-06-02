import { Avatar } from "../components/Avatar";
import { contacts } from "../data/mockData";

type HomePageProps = {
  onOpenChat: () => void;
};

export function HomePage({ onOpenChat }: HomePageProps) {
  return (
    <section className="home-page">
      <div className="stats-grid">
        <article className="stat-card">
          <div className="stat-icon">💬</div>
          <p>Olästa chattar</p>
          <h2>3</h2>
          <span>3 olika olästa chattar</span>
        </article>

        <article className="stat-card">
          <div className="stat-icon">🥷</div>
          <p>Online just nu</p>
          <h2>3</h2>
          <span>Mohammed, Alfred, Axel</span>
        </article>
      </div>

      <section className="online-section">
        <h2>Online just nu</h2>

        <div className="avatar-row">
          {contacts.map((contact) => (
            <div className="avatar-wrapper" key={contact.id}>
              <Avatar initials={contact.initials} color={contact.color} />
              <span className="online-dot"></span>
            </div>
          ))}
        </div>
      </section>

      <section className="recent-section">
        <h2>Senaste konversationer</h2>

        <div className="conversation-list">
          <button className="conversation-item" onClick={onOpenChat}>
            <div className="group-avatar">⬜</div>

            <div>
              <h3>Gruppchatt</h3>
              <p>Ali: bla bla, hur går det?</p>
            </div>

            <span>LÖRDAG</span>
          </button>

          {contacts.map((contact) => (
            <button
              className="conversation-item"
              key={contact.id}
              onClick={onOpenChat}
            >
              <Avatar
                initials={contact.initials}
                color={contact.color}
                size="small"
              />

              <div>
                <h3>{contact.name}</h3>
                <p>bla bla bla, hur går det?</p>
              </div>

              <span>LÖRDAG</span>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}
