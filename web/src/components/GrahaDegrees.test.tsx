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
    mars: [20.5, 19.9], // retrograde
  },
};
const date = new Date("2020-01-01T12:00:00Z");

describe("GrahaDegrees", () => {
  it("shows each graha's degree within its sign", () => {
    const { getByText } = render(<GrahaDegrees data={data} date={date} script="western" />);
    expect(getByText("10.0°")).toBeInTheDocument(); // Sun 100° -> 10° Cancer
    expect(getByText("Cancer")).toBeInTheDocument();
    expect(getByText("20.5°")).toBeInTheDocument(); // Mars 20.5° Aries
  });

  it("uses Devanagari sign names when script=devanagari", () => {
    const { getByText, queryByText } = render(
      <GrahaDegrees data={data} date={date} script="devanagari" />,
    );
    expect(getByText("कर्क")).toBeInTheDocument();
    expect(queryByText("Cancer")).toBeNull();
  });

  it("marks retrograde grahas with 🌀", () => {
    const { getByText } = render(<GrahaDegrees data={data} date={date} script="western" />);
    const marsRow = getByText("20.5°").closest("li")!;
    expect(marsRow.textContent).toContain("🌀");
    const sunRow = getByText("10.0°").closest("li")!;
    expect(sunRow.textContent).not.toContain("🌀");
  });
});
