import { useEffect, useState, type SubmitEvent } from "react";
import { Avatar } from "../components/Avatar";
import {
  formatConversationTime,
  formatMessageTime,
  getAvatarColor,
  getInitials,
} from "../lib/chatUtils";
import { fetchMessages, sendMessage, subscribeToMessages } from "../lib/messages";
import { fetchProfiles, getCurrentUser } from "../lib/profiles";
import type { Conversation, Message, Profile } from "../types/types";

const GROUP_CHAT_ID = "group-team-gul";

const groupConversation: Conversation = {
  id: GROUP_CHAT_ID,
  name: "Gruppchatt - team gul",
  initials: "G",
  status: "Gruppchatt",
  color: "red",
  type: "group",
  lastMessage: "",
  time: "",
};

function profileToConversation(profile: Profile): Conversation {
  return {
    id: profile.id,
    name: profile.username,
    initials: getInitials(profile.username),
    status: "Medlem",
    color: getAvatarColor(profile.username),
    type: "private",
    lastMessage: "",
    time: "",
  };
}

export function ChatPage() {
  const [selectedConversationId, setSelectedConversationId] =
    useState(GROUP_CHAT_ID);
  const [messages, setMessages] = useState<Message[]>([]);
  const [otherProfiles, setOtherProfiles] = useState<Profile[]>([]);
  const [currentUserProfile, setCurrentUserProfile] = useState<Profile | null>(
    null,
  );
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const privateConversations = otherProfiles.map(profileToConversation);
  const conversations = [groupConversation, ...privateConversations];

  const selectedConversation =
    conversations.find(
      (conversation) => conversation.id === selectedConversationId,
    ) || groupConversation;

  const isGroupChat = selectedConversationId === GROUP_CHAT_ID;
  const lastMessage = messages.at(-1);
  const activeGroupConversation: Conversation = {
    ...groupConversation,
    lastMessage: lastMessage?.content ?? "Inga meddelanden än",
    time: lastMessage ? formatConversationTime(lastMessage.created_at) : "",
  };

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    async function loadChat() {
      setLoading(true);
      setError("");

      const [
        { user, error: userError },
        { data: profileData, error: profilesError },
        { data: messageData, error: messagesError },
      ] = await Promise.all([
        getCurrentUser(),
        fetchProfiles(),
        fetchMessages(),
      ]);

      if (userError || !user) {
        setError("Kunde inte hämta inloggad användare.");
        setLoading(false);
        return;
      }

      if (profilesError || messagesError) {
        setError("Kunde inte hämta chattdata.");
        setLoading(false);
        return;
      }

      setCurrentUserId(user.id);
      setCurrentUserProfile(
        (profileData ?? []).find((profile) => profile.id === user.id) ?? null,
      );
      setOtherProfiles(
        (profileData ?? []).filter((profile) => profile.id !== user.id),
      );
      setMessages(messageData ?? []);

      unsubscribe = subscribeToMessages((message) => {
        setMessages((current) => {
          if (current.some((item) => item.id === message.id)) {
            return current;
          }

          return [...current, message];
        });
      });

      setLoading(false);
    }

    loadChat();

    return () => {
      unsubscribe?.();
    };
  }, []);

  async function handleSendMessage(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isGroupChat || !currentUserId || newMessage.trim() === "" || sending) {
      return;
    }

    setSending(true);
    setError("");

    const content = newMessage.trim();
    const { data, error: sendError } = await sendMessage(content, currentUserId);

    if (sendError || !data) {
      setError("Kunde inte skicka meddelandet.");
      setSending(false);
      return;
    }

    setMessages((current) => {
      if (current.some((item) => item.id === data.id)) {
        return current;
      }

      return [...current, data];
    });
    setNewMessage("");
    setSending(false);
  }

  function renderConversation(conversation: Conversation) {
    const isActive = conversation.id === selectedConversationId;
    const displayConversation =
      conversation.id === GROUP_CHAT_ID
        ? activeGroupConversation
        : conversation;

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
          <h3>{displayConversation.name}</h3>
          <p>{displayConversation.lastMessage}</p>
        </div>

        <span>{displayConversation.time}</span>
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
        {renderConversation(groupConversation)}

        <p className="section-label">Privat</p>
        {privateConversations.length === 0 && !loading && (
          <p className="section-label">Inga andra användare ännu</p>
        )}
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

        {loading ? (
          <div className="messages">
            <p>Laddar meddelanden...</p>
          </div>
        ) : !isGroupChat ? (
          <div className="messages">
            <p>Privata meddelanden stöds inte än i databasen.</p>
          </div>
        ) : (
          <>
            <div className="date-divider">
              <span></span>
              <p>Idag</p>
              <span></span>
            </div>

            <div className="messages">
              {messages.length === 0 && <p>Inga meddelanden än. Skriv det första!</p>}

              {messages.map((message) => {
                const isMe = message.user_id === currentUserId;
                const username = message.profiles?.username ?? "Okänd";
                const initials = getInitials(username);
                const color = getAvatarColor(username);

                return (
                  <div
                    className={
                      isMe
                        ? "message-row message-row-me"
                        : "message-row message-row-other"
                    }
                    key={message.id}
                  >
                    {!isMe && (
                      <Avatar initials={initials} color={color} size="small" />
                    )}

                    <div
                      className={
                        isMe
                          ? "message-bubble my-message"
                          : "message-bubble other-message"
                      }
                    >
                      {!isMe && selectedConversation.type === "group" && (
                        <strong>{username}</strong>
                      )}
                      <p>{message.content}</p>
                      <span>{formatMessageTime(message.created_at)}</span>
                    </div>

                    {isMe && (
                      <Avatar
                        initials={
                          currentUserProfile
                            ? getInitials(currentUserProfile.username)
                            : "DU"
                        }
                        color={
                          currentUserProfile
                            ? getAvatarColor(currentUserProfile.username)
                            : "orange"
                        }
                        size="small"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {error && <p style={{ color: "red", padding: "0 24px" }}>{error}</p>}

            <form className="message-input-bar" onSubmit={handleSendMessage}>
              <input
                placeholder="Skriv ditt meddelande..."
                value={newMessage}
                onChange={(event) => setNewMessage(event.target.value)}
                disabled={sending}
              />

              <button type="submit" disabled={sending}>
                {sending ? "…" : "➤"}
              </button>
            </form>
          </>
        )}
      </section>
    </section>
  );
}
