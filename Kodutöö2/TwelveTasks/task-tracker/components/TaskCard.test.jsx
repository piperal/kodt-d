import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import TaskCard from "./TaskCard";

describe("TaskCard", () => {
  it("calls onToggle when the toggle button is clicked", () => {
    const onToggle = vi.fn();

    render(
      <MemoryRouter>
        <TaskCard
          task={{ id: 1, title: "Learn JSX", completed: false }}
          onToggle={onToggle}
          onDelete={vi.fn()}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /mark completed/i }));

    expect(onToggle).toHaveBeenCalledWith(1);
  });
});