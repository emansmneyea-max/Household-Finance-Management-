import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatDate, formatMoney } from "./format.js";

describe("formatMoney", () => {
  it("formats a number as USD", () => {
    assert.equal(formatMoney(45.5), "$45.50");
  });

  it("treats invalid values as zero", () => {
    assert.equal(formatMoney("abc"), "$0.00");
  });
});

describe("formatDate", () => {
  it("formats an ISO date for en-US", () => {
    assert.equal(formatDate("2026-08-10T12:00:00.000Z"), "Aug 10, 2026");
  });
});
