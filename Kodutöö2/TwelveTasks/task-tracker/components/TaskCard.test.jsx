import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import TaskCard from "./TaskCard";

describe("TaskCard", () => {
  it("calls onToggle when the toggle button is clicked", () => {
    let calledWith = null;
    const onToggle = (id) => {
      calledWith = id;
    };

    render(
      <MemoryRouter>
        <TaskCard
          task={{ id: 1, title: "Learn JSX", completed: false }}
          onToggle={onToggle}
          onDelete={() => {}}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /mark completed/i }));

    expect(calledWith).toBe(1);
  });
});