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
  it("toggles a planet on click", () => {
    const onToggle = vi.fn();
    const enabled = {
      sun: true, moon: false, mars: true, mercury: true, jupiter: true,
      venus: true, saturn: true, rahu: true, ketu: true,
    };
    const { getByText } = render(<PlanetFilter enabled={enabled} onToggle={onToggle} />);
    fireEvent.click(getByText(/sun/i));
    expect(onToggle).toHaveBeenCalledWith("sun");
  });
});
