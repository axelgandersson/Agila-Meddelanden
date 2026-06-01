type LoginPageProps = {
  onLogin: () => void;
};

export function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <main className="login-page">
      <section className="login-card">
        <div className="logo-diamond"></div>

        <p className="brand-text">TEAM GUL CHATTVERKSTAD</p>

        <h1>Välkommen tillbaka</h1>
        <p className="login-subtitle">Logga in för att fortsätta</p>

        <form
          className="login-form"
          onSubmit={(event) => event.preventDefault()}
        >
          <label>
            E-postadress
            <input type="email" defaultValue="Ali@gmail.com" />
          </label>

          <label>
            Lösenord
            <input type="password" defaultValue="password123" />
          </label>

          <button type="button" onClick={onLogin}>
            Logga in
          </button>
        </form>

        <p className="register-text">
          Har du inget konto? <span>Skapa ett gratis konto här</span>
        </p>
      </section>
    </main>
  );
}
