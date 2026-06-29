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
});
