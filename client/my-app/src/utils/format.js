

export const CURRENCIES = [
  { code: "ILS", label: "₪ ILS" },
  { code: "USD", label: "$ USD" },
  { code: "EUR", label: "€ EUR" },
];

const CURRENCY_LOCALES = {
  ILS: "he-IL",
  USD: "en-US",
  EUR: "de-DE",
};

export function formatMoney(value, currency = "ILS") {
  const locale = CURRENCY_LOCALES[currency] || "he-IL";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(Number(value) || 0);
}