import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import { getTasks } from "../services/taskApi";

vi.mock("../services/taskApi", () => ({
  getTasks: vi.fn(),
}));

describe("App", () => {
  it("shows the titles fetched from tasks.json", async () => {
    getTasks.mockResolvedValue([
      { id: 1, title: "Learn JSX", completed: true },
      { id: 2, title: "Practise React state", completed: false },
      { id: 3, title: "Build a Node.js API", completed: false },
    ]);

    render(
      <MemoryRouter initialEntries={["/tasks"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText("Learn JSX")).toBeInTheDocument();
    expect(screen.getByText("Practise React state")).toBeInTheDocument();
    expect(screen.getByText("Build a Node.js API")).toBeInTheDocument();
  });
});