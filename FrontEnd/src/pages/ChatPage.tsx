import { useState } from "react";
import { Avatar } from "../components/Avatar";
import { conversations, startMessages } from "../data/mockData";
import type { ChatMessage, Conversation } from "../types/types";

export function ChatPage() {
  const [selectedConversationId, setSelectedConversationId] =
    useState("group-team-gul");

  const [messages, setMessages] = useState<ChatMessage[]>(startMessages);
  const [newMessage, setNewMessage] = useState("");

  const selectedConversation =
    conversations.find(
      (conversation) => conversation.id === selectedConversationId,
    ) || conversations[0];

  const selectedMessages = messages.filter(
    (message) => message.conversationId === selectedConversationId,
  );

  const groupConversations = conversations.filter(
    (conversation) => conversation.type === "group",
  );

  const privateConversations = conversations.filter(
    (conversation) => conversation.type === "private",
  );

  function handleSendMessage(event: React.FormEvent) {
    event.preventDefault();

    if (newMessage.trim() === "") {
      return;
    }

    const message: ChatMessage = {
      id: crypto.randomUUID(),
      conversationId: selectedConversation.id,
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

  function renderConversation(conversation: Conversation) {
    const isActive = conversation.id === selectedConversationId;

    return (
      <button
        className={isActive ? "chat-preview active-chat" : "chat-preview"}
        key={conversation.id}
        onClick={() => setSelectedConversationId(conversation.id)}
      >
        {conversation.type === "group" ? (
          <div className="group-avatar">▣</div>
        ) : (
          <Avatar
            initials={conversation.initials}
            color={conversation.color}
            size="small"
          />
        )}

        <div>
          <h3>{conversation.name}</h3>
          <p>{conversation.lastMessage}</p>
        </div>

        <span>{conversation.time}</span>
      </button>
    );
  }

  return (
    <section className="chat-page">
      <aside className="chat-list-panel">
        <div className="panel-title">
          <h2>Meddelanden</h2>
        </div>

        <p className="section-label">Grupper</p>

        {groupConversations.map((conversation) =>
          renderConversation(conversation),
        )}

        <p className="section-label">Privat</p>

        {privateConversations.map((conversation) =>
          renderConversation(conversation),
        )}
      </aside>

      <section className="chat-window">
        <header className="chat-header">
          <div className="user-heading">
            {selectedConversation.type === "group" ? (
              <div className="group-avatar">▣</div>
            ) : (
              <Avatar
                initials={selectedConversation.initials}
                color={selectedConversation.color}
              />
            )}

            <div>
              <h2>{selectedConversation.name}</h2>
              <p>{selectedConversation.status}</p>
            </div>
          </div>
        </header>

        <div className="date-divider">
          <span></span>
          <p>Idag</p>
          <span></span>
        </div>

        <div className="messages">
          {selectedMessages.map((message) => (
            <div
              className={
                message.sender === "me"
                  ? "message-row message-row-me"
                  : "message-row message-row-other"
              }
              key={message.id}
            >
              {message.sender === "other" && (
                <Avatar
                  initials={
                    selectedConversation.type === "group"
                      ? "AA"
                      : selectedConversation.initials
                  }
                  color={
                    selectedConversation.type === "group"
                      ? "blue"
                      : selectedConversation.color
                  }
                  size="small"
                />
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
