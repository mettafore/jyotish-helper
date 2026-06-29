// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";
import { fmtDate } from "./lib/format";

const fake = {
  ayanamsa: "lahiri",
  range: { start: "2015-01-01T00:00:00Z", end: "2040-01-01T00:00:00Z" },
  planets: {
    sun: [{ sign: 8, enters: "2014-12-16T00:00:00Z" }],
    moon: [{ sign: 0, enters: "2014-12-31T00:00:00Z" }],
    mars: [{ sign: 9, enters: "2014-11-01T00:00:00Z" }],
    mercury: [{ sign: 8, enters: "2014-12-01T00:00:00Z" }],
    jupiter: [{ sign: 3, enters: "2014-07-01T00:00:00Z" }],
    venus: [{ sign: 9, enters: "2014-12-20T00:00:00Z" }],
    saturn: [{ sign: 7, enters: "2014-11-02T00:00:00Z" }],
    rahu: [{ sign: 5, enters: "2014-07-01T00:00:00Z" }],
    ketu: [{ sign: 11, enters: "2014-07-01T00:00:00Z" }],
  },
};

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: async () => fake })));
});

describe("App", () => {
  it("loads data and renders the chart with grahas", async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText("Ju")).toBeInTheDocument());
    expect(screen.getByText("Sa")).toBeInTheDocument();
  });

  it("offers 3M and 6M range presets (plus year presets)", async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText("Ju")).toBeInTheDocument());
    expect(screen.getByText(/3M/)).toBeInTheDocument();
    expect(screen.getByText(/6M/)).toBeInTheDocument();
    expect(screen.getByText(/1Y/)).toBeInTheDocument();
  });

  it("Today button returns the viewed date to now after scrubbing away", async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText("Ju")).toBeInTheDocument());
    // Scrub to the far past edge of the range.
    fireEvent.change(screen.getByLabelText("scrub time"), { target: { value: "0" } });
    const todayStr = fmtDate(new Date());
    // After scrubbing, the viewed date should no longer be today.
    expect(screen.queryByText((t) => t.includes(todayStr))).toBeNull();
    // Click Today -> back to now.
    fireEvent.click(screen.getByText("Today"));
    expect(screen.getByText((t) => t.includes(todayStr))).toBeInTheDocument();
  });
});
