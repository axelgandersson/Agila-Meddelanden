import { useState, type SubmitEvent } from "react";
import { loginWithUsername } from "../lib/auth";

type LoginPageProps = {
  onLogin: () => void;
};

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    const { error } = await loginWithUsername(username, password);

    if (error) {
      setError(error);
    } else {
      onLogin(); // ← anropar funktionen vid lyckad inloggning
    }

    setLoading(false);
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="logo-diamond"></div>
        <p className="brand-text">TEAM GUL CHATTVERKSTAD</p>
        <h1>Välkommen tillbaka</h1>
        <p className="login-subtitle">Logga in för att fortsätta</p>

        <form className="login-form" onSubmit={handleLogin}>
          <label>
            Användarnamn
            <input
              type="text"
              placeholder="Ditt användarnamn"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label>
            Lösenord
            <input
              type="password"
              placeholder="Ditt lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Loggar in..." : "Logga in"}
          </button>
        </form>

        <p className="register-text">
          Har du inget konto? <span>Skapa ett gratis konto här</span>
        </p>
      </section>
    </main>
  );
}
