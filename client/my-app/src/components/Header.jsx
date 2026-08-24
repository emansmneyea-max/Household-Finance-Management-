export default function Header({ status }) {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo">💰</span>
        <div>
          <h1>Household Finance Tracker</h1>
          <p>Track income and expenses for your household</p>
        </div>
      </div>
      <div className={`header__status header__status--${status}`}>
        <span className="header__dot" />
        API: {status === "online" ? "Connected" : status === "offline" ? "Offline" : "Checking..."}
      </div>
    </header>
  );
}
