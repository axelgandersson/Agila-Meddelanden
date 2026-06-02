import { useState } from "react";
import { Avatar } from "../components/Avatar";
import { contacts, startMessages } from "../data/mockData";
import type { ChatMessage } from "../types/types";

export function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(startMessages);
  const [newMessage, setNewMessage] = useState("");

  function handleSendMessage(event: React.FormEvent) {
    event.preventDefault();

    if (newMessage.trim() === "") {
      return;
    }

    const message: ChatMessage = {
      id: crypto.randomUUID(),
      text: newMessage,
      sender: "me",
      time: new Date().toLocaleTimeString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  }

  return (
    <section className="chat-page">
      <aside className="chat-list-panel">
        <div className="panel-title">
          <h2>Meddelanden</h2>
          <button>✎</button>
        </div>

        <p className="section-label">Grupper</p>

        <button className="chat-preview active-chat">
          <div className="group-avatar">⬜</div>

          <div>
            <h3>Gruppchatt - team gul</h3>
            <p>bla bla bla, hur går det?</p>
          </div>

          <span>LÖRDAG</span>
        </button>

        <p className="section-label">Privat</p>

        {contacts.map((contact) => (
          <button className="chat-preview" key={contact.id}>
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
      </aside>

      <section className="chat-window">
        <header className="chat-header">
          <div className="user-heading">
            <Avatar initials="MY" color="orange" />

            <div>
              <h2>Mohammed</h2>
              <p>Aktiv för 25 minuter sedan</p>
            </div>
          </div>

          <button className="dots-button">•••</button>
        </header>

        <div className="date-divider">
          <span></span>
          <p>Idag</p>
          <span></span>
        </div>

        <div className="messages">
          {messages.map((message) => (
            <div
              className={
                message.sender === "me"
                  ? "message-row message-row-me"
                  : "message-row message-row-other"
              }
              key={message.id}
            >
              {message.sender === "other" && (
                <Avatar initials="AA" color="blue" size="small" />
              )}

              <div
                className={
                  message.sender === "me"
                    ? "message-bubble my-message"
                    : "message-bubble other-message"
                }
              >
                <p>{message.text}</p>
                <span>{message.time}</span>
              </div>

              {message.sender === "me" && (
                <Avatar initials="M" color="orange" size="small" />
              )}
            </div>
          ))}
        </div>

        <form className="message-input-bar" onSubmit={handleSendMessage}>
          <input
            placeholder="Skriv ditt meddelande..."
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
          />

          <button type="submit">➤</button>
        </form>
      </section>
    </section>
  );
}
