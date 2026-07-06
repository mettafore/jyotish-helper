// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { TimeSlider, pct } from "./TimeSlider";
import { fmtDate } from "../lib/format";

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

  it("renders a clickable Now button that jumps to the present", () => {
    const onChange = vi.fn();
    const nowStart = new Date(Date.now() - 86400000);
    const nowEnd = new Date(Date.now() + 86400000);
    const { getByLabelText } = render(
      <TimeSlider start={nowStart} end={nowEnd} value={nowStart} onChange={onChange}
        events={[]} />,
    );
    fireEvent.click(getByLabelText(/jump to now/i));
    expect(onChange).toHaveBeenCalledTimes(1);
    const arg = onChange.mock.calls[0][0] as Date;
    expect(Math.abs(arg.getTime() - Date.now())).toBeLessThan(5000);
  });

  it("shows the transition date in an instant CSS tooltip, not a native title", () => {
    const at = new Date("2026-03-29T00:00:00Z");
    const { getByLabelText } = render(
      <TimeSlider start={start} end={end} value={start} onChange={() => {}}
        events={[{ planet: "saturn", sign: 11, at }]} />,
    );
    const dot = getByLabelText(/saturn.*transition/i);
    // data-tip drives a zero-delay CSS tooltip; native title has a fixed ~1s delay.
    expect(dot.getAttribute("data-tip")).toContain(fmtDate(at));
    expect(dot.getAttribute("title")).toBeNull();
  });
});
