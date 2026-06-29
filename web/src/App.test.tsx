// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

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
});
