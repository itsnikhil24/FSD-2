import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { describe, it, expect } from "vitest";

describe("App Form Test", () => {
  it("updates input and displays name", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Enter name");

    fireEvent.change(input, { target: { value: "Nikhil" } });

    expect(screen.getByText("Hello Nikhil")).toBeTruthy();
  });
});