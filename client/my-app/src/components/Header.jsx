import { CURRENCIES } from "../utils/format.js";

export default function Header({ status, currency, onCurrencyChange }) {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo">💰</span>
        <div>
          <h1>Household Finance Tracker</h1>
          <p>Track income and expenses for your household</p>
        </div>
      </div>
      <div className="header__actions">
        <label className="header__currency">
          <span>Currency</span>
          <select
            value={currency}
            onChange={(event) => onCurrencyChange(event.target.value)}
          >
            {CURRENCIES.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <div className={`header__status header__status--${status}`}>
          <span className="header__dot" />
          API: {status === "online" ? "Connected" : status === "offline" ? "Offline" : "Checking..."}
        </div>
      </div>
    </header>
  );
}