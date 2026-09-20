import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import TaskCard from "./TaskCard";
import "@testing-library/jest-dom/vitest";

describe("TaskCard", () => {
  it("calls onToggle when the toggle button is clicked", async () => {

    let calledWith = null;
    const onToggle = (id) => { calledWith = id; };

    render(
      <MemoryRouter>
        <TaskCard task={{ id: 1, title: "Test title", completed: true }} onToggle={onToggle} />
      </MemoryRouter>)

    const button = screen.getByText("Mark incomplete")
    expect(button).toHaveTextContent(/mark incomplete/i);
    fireEvent(button, new MouseEvent("click", { bubbles: true, cancelable: true }))

    expect(calledWith).toBe(1)
  });

});