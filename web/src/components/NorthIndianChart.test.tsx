// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { NorthIndianChart } from "./NorthIndianChart";

describe("NorthIndianChart", () => {
  it("renders all provided grahas", () => {
    const { getByText } = render(
      <NorthIndianChart positions={{ sun: 2, saturn: 9 }} house1Sign={0} />,
    );
    expect(getByText("Su")).toBeInTheDocument();
    expect(getByText("Sa")).toBeInTheDocument();
  });

  it("renders graha abbreviations in Devanagari when script=devanagari", () => {
    const { getByText, queryByText } = render(
      <NorthIndianChart positions={{ sun: 2, saturn: 9 }} house1Sign={0} script="devanagari" />,
    );
    expect(getByText("सू")).toBeInTheDocument(); // Sun
    expect(getByText("श")).toBeInTheDocument();  // Saturn
    expect(queryByText("Su")).toBeNull();
  });

  it("marks an exalted graha with ⬆", () => {
    const { getByText } = render(
      <NorthIndianChart positions={{ sun: 0 }} house1Sign={0} />, // Sun in Aries
    );
    expect(getByText(/Su/).textContent).toContain("⬆");
  });

  it("marks a debilitated graha with ⬇", () => {
    const { getByText } = render(
      <NorthIndianChart positions={{ saturn: 0 }} house1Sign={0} />, // Saturn in Aries
    );
    expect(getByText(/Sa/).textContent).toContain("⬇");
  });

  it("adds no mark for neutral placements", () => {
    const { getByText } = render(
      <NorthIndianChart positions={{ sun: 4 }} house1Sign={0} />, // Sun in Leo
    );
    const t = getByText(/Su/).textContent ?? "";
    expect(t).not.toContain("⬆");
    expect(t).not.toContain("⬇");
  });

  it("marks retrograde grahas with 🌀", () => {
    const { getByText } = render(
      <NorthIndianChart positions={{ mars: 4, jupiter: 5 }} house1Sign={0}
        retro={{ mars: true }} />,
    );
    expect(getByText(/Ma/).textContent).toContain("🌀");
    expect(getByText(/Ju/).textContent).not.toContain("🌀");
  });

  it("marks combust grahas with 🔥", () => {
    const { getByText } = render(
      <NorthIndianChart positions={{ venus: 4, jupiter: 5 }} house1Sign={0}
        combust={{ venus: true }} />,
    );
    expect(getByText(/Ve/).textContent).toContain("🔥");
    expect(getByText(/Ju/).textContent).not.toContain("🔥");
  });
});
