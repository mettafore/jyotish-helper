// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle", () => {
  it("marks the active pref with the .on class", () => {
    const { getByText } = render(<ThemeToggle pref="auto" onChange={() => {}} />);
    expect(getByText("Auto").className).toContain("on");
    expect(getByText("Light").className).not.toContain("on");
  });

  it("calls onChange with the clicked pref", () => {
    const onChange = vi.fn();
    const { getByText } = render(<ThemeToggle pref="auto" onChange={onChange} />);
    fireEvent.click(getByText("Dark"));
    expect(onChange).toHaveBeenCalledWith("dark");
  });
});
