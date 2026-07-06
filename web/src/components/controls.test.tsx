// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { LagnaSelect } from "./LagnaSelect";
import { PlanetFilter } from "./PlanetFilter";

describe("LagnaSelect", () => {
  it("calls onChange with the chosen sign index", () => {
    const onChange = vi.fn();
    const { getByRole } = render(<LagnaSelect value={0} onChange={onChange} script="western" />);
    fireEvent.change(getByRole("combobox"), { target: { value: "1" } });
    expect(onChange).toHaveBeenCalledWith(1);
  });
});

describe("PlanetFilter", () => {
  const enabled = {
    sun: true, moon: false, mars: true, mercury: true, jupiter: true,
    venus: true, saturn: true, rahu: true, ketu: true,
  };

  it("toggles a planet on click", () => {
    const onToggle = vi.fn();
    const { getByText } = render(<PlanetFilter enabled={enabled} onToggle={onToggle} />);
    fireEvent.click(getByText(/sun/i));
    expect(onToggle).toHaveBeenCalledWith("sun");
  });

  it("renders Devanagari planet names when script=devanagari", () => {
    const { getByText, queryByText } = render(
      <PlanetFilter enabled={enabled} onToggle={() => {}} script="devanagari" />,
    );
    expect(getByText("सूर्य")).toBeInTheDocument(); // Sun
    expect(getByText("शनि")).toBeInTheDocument();   // Saturn
    expect(queryByText("Sun")).toBeNull();
    fireEvent.click(getByText("शनि"));
  });

  it("still toggles the right planet in Devanagari", () => {
    const onToggle = vi.fn();
    const { getByText } = render(
      <PlanetFilter enabled={enabled} onToggle={onToggle} script="devanagari" />,
    );
    fireEvent.click(getByText("राहु"));
    expect(onToggle).toHaveBeenCalledWith("rahu");
  });
});
