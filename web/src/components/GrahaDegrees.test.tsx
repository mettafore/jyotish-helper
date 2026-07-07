// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { GrahaDegrees } from "./GrahaDegrees";
import type { DegreesData } from "../lib/degrees";

const data: DegreesData = {
  ayanamsa: "lahiri",
  start: "2020-01-01T00:00:00Z",
  stepDays: 1,
  planets: {
    sun: [100.0, 101.0],
    mars: [20.5, 19.9],    // retrograde, far from Sun
    venus: [110.0, 111.0], // 10° from Sun -> combust at 15° orb
  },
};
const date = new Date("2020-01-01T12:00:00Z");

describe("GrahaDegrees", () => {
  it("shows each graha's degree within its sign", () => {
    const { getByText, getAllByText } = render(
      <GrahaDegrees data={data} transitions={{}} date={date} script="western" />,
    );
    expect(getByText("10.0°")).toBeInTheDocument(); // Sun 100° -> 10° Cancer
    expect(getAllByText("Cancer").length).toBe(2);  // Sun and Venus
    expect(getByText("20.5°")).toBeInTheDocument(); // Mars 20.5° Aries
  });

  it("uses Devanagari sign names when script=devanagari", () => {
    const { getAllByText, queryByText } = render(
      <GrahaDegrees data={data} transitions={{}} date={date} script="devanagari" />,
    );
    expect(getAllByText("कर्क").length).toBe(2);
    expect(queryByText("Cancer")).toBeNull();
  });

  it("marks retrograde grahas with 🌀", () => {
    const { getByText } = render(<GrahaDegrees data={data} transitions={{}} date={date} script="western" />);
    const marsRow = getByText("20.5°").closest("li")!;
    expect(marsRow.textContent).toContain("🌀");
    const sunRow = getByText("10.0°").closest("li")!;
    expect(sunRow.textContent).not.toContain("🌀");
  });

  it("marks combust grahas with 🔥", () => {
    const { getByText } = render(<GrahaDegrees data={data} transitions={{}} date={date} script="western" />);
    const venusRow = getByText("20.0°").closest("li")!; // Venus 110° = 20° Cancer
    expect(venusRow.textContent).toContain("🔥");
    const marsRow = getByText("20.5°").closest("li")!;
    expect(marsRow.textContent).not.toContain("🔥");
  });

  it("states the combustion-orb assumptions", () => {
    const { getByText } = render(<GrahaDegrees data={data} transitions={{}} date={date} script="western" />);
    expect(getByText(/15°.*Mercury 10°/).textContent).toMatch(/🔥/);
  });

  it("previews a same-day upcoming transition with its local time and sign", () => {
    const laterToday = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 45);
    const { getByText } = render(
      <GrahaDegrees
        data={data}
        transitions={{ mars: [{ sign: 5, enters: laterToday.toISOString() }] }}
        date={date} script="western"
      />,
    );
    const marsRow = getByText("20.5°").closest("li")!;
    expect(marsRow.textContent).toContain("23:45");
    expect(marsRow.textContent).toContain("Virgo");
  });

  it("does not preview a transition landing on a different local day", () => {
    const tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 1, 0);
    const { getByText } = render(
      <GrahaDegrees
        data={data}
        transitions={{ mars: [{ sign: 5, enters: tomorrow.toISOString() }] }}
        date={date} script="western"
      />,
    );
    const marsRow = getByText("20.5°").closest("li")!;
    expect(marsRow.textContent).not.toContain("Virgo");
  });

  it("keeps the degree/sign/mark row on one line, separate from the preview line", () => {
    // Mars here is retrograde (per fixture) and has a same-day preview; both the
    // 🌀 mark and the degree/sign must stay in the primary row, not wrap onto it.
    const laterToday = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 45);
    const { getByText } = render(
      <GrahaDegrees
        data={data}
        transitions={{ mars: [{ sign: 5, enters: laterToday.toISOString() }] }}
        date={date} script="western"
      />,
    );
    const marsRow = getByText("20.5°").closest("li")!;
    const primaryRow = marsRow.querySelector(".row")!;
    expect(primaryRow.textContent).toContain("🌀");
    expect(primaryRow.textContent).not.toContain("Virgo");
    expect(marsRow.querySelector(".n")!.textContent).toContain("Virgo");
  });

  it("renders no preview line when the graha has transitions but none today", () => {
    const tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 1, 0);
    const { getByText } = render(
      <GrahaDegrees
        data={data}
        transitions={{ mars: [{ sign: 5, enters: tomorrow.toISOString() }] }}
        date={date} script="western"
      />,
    );
    const marsRow = getByText("20.5°").closest("li")!;
    expect(marsRow.querySelector(".n")).toBeNull();
  });

  it("uses Devanagari sign names in the preview line when script=devanagari", () => {
    const laterToday = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 45);
    const { getByText, queryByText } = render(
      <GrahaDegrees
        data={data}
        transitions={{ mars: [{ sign: 5, enters: laterToday.toISOString() }] }}
        date={date} script="devanagari"
      />,
    );
    const marsRow = getByText("20.5°").closest("li")!;
    const preview = marsRow.querySelector(".n")!;
    expect(preview.textContent).toContain("कन्या"); // Virgo in Devanagari
    expect(queryByText(/Virgo/)).toBeNull();
  });
});
