import { useState } from "react";
import { Avatar } from "../components/Avatar";
import { contacts } from "../data/mockData";

type ContactsPageProps = {
  onOpenChat: () => void;
};

export function ContactsPage({ onOpenChat }: ContactsPageProps) {
  const [searchText, setSearchText] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <section className="contacts-page">
      <h2>Kontakter</h2>

      <div className="contacts-actions">
        <div className="contact-search">
          <span>🔍</span>

          <input
            placeholder="Sök person..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>

        <button className="add-button">+ Lägg till</button>
      </div>

      <div className="contacts-list">
        {filteredContacts.map((contact) => (
          <article className="contact-card" key={contact.id}>
            <Avatar
              initials={contact.initials}
              color={contact.color}
              size="large"
            />

            <div>
              <h3>{contact.name}</h3>
              <p>{contact.status}</p>
            </div>

            <button onClick={onOpenChat}>Chatta</button>
          </article>
        ))}
      </div>
    </section>
  );
}
