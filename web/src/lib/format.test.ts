import { describe, it, expect } from "vitest";
import { fmtDate, fmtDateTime, fmtTime } from "./format";

describe("fmtDate", () => {
  it("formats as dd-mm-yy (local)", () => {
    expect(fmtDate(new Date(2026, 5, 29, 21, 46))).toBe("29-06-26"); // 29 Jun 2026
    expect(fmtDate(new Date(2025, 0, 3, 0, 0))).toBe("03-01-25"); // 3 Jan 2025
  });
});

describe("fmtDateTime", () => {
  it("formats as dd-mm-yy HH:mm (local, 24h)", () => {
    expect(fmtDateTime(new Date(2026, 5, 29, 21, 46))).toBe("29-06-26 21:46");
    expect(fmtDateTime(new Date(2025, 0, 3, 9, 5))).toBe("03-01-25 09:05");
  });
});

describe("fmtTime", () => {
  it("formats as HH:mm (local, 24h)", () => {
    expect(fmtTime(new Date(2026, 5, 29, 21, 46))).toBe("21:46");
    expect(fmtTime(new Date(2025, 0, 3, 9, 5))).toBe("09:05");
  });
});
