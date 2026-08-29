import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatDate, formatMoney } from "./format.js";


describe("formatMoney", () => {
  it("formats a number as USD when USD is passed", () => {
    const result = formatMoney(45.5, "USD");
    assert.match(result, /\$/);
    assert.match(result, /45/);
  });

  it("formats a number as ILS when ILS is passed", () => {
    const result = formatMoney(45.5, "ILS");
    assert.match(result, /₪/);
    assert.match(result, /45/);
  });

  it("formats a number as EUR when EUR is passed", () => {
    const result = formatMoney(45.5, "EUR");
    assert.match(result, /€/);
    assert.match(result, /45/);
  });

  it("treats invalid values as zero", () => {
    const result = formatMoney("abc", "USD");
    assert.match(result, /\$/);
    assert.match(result, /0/);
  });
});