// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { TimeSlider, pct } from "./TimeSlider";

const start = new Date("2025-01-01T00:00:00Z");
const end = new Date("2027-01-01T00:00:00Z");

describe("pct", () => {
  it("maps a date to 0..100 across the range", () => {
    expect(pct(start, start, end)).toBeCloseTo(0);
    expect(pct(end, start, end)).toBeCloseTo(100);
    expect(pct(new Date("2026-01-01T00:00:00Z"), start, end)).toBeCloseTo(50, 0);
  });
});

describe("TimeSlider", () => {
  it("jumps to a transition when its dot is clicked", () => {
    const onChange = vi.fn();
    const at = new Date("2026-03-29T00:00:00Z");
    const { getByLabelText } = render(
      <TimeSlider start={start} end={end} value={start} onChange={onChange}
        events={[{ planet: "saturn", sign: 11, at }]} />,
    );
    fireEvent.click(getByLabelText(/saturn.*transition/i));
    expect(onChange).toHaveBeenCalledWith(at);
  });

  it("shows the transition date in the dot's tooltip", () => {
    const at = new Date("2026-03-29T00:00:00Z");
    const { getByLabelText } = render(
      <TimeSlider start={start} end={end} value={start} onChange={() => {}}
        events={[{ planet: "saturn", sign: 11, at }]} />,
    );
    const dot = getByLabelText(/saturn.*transition/i);
    expect(dot.getAttribute("title")).toContain(at.toLocaleDateString());
  });
});
