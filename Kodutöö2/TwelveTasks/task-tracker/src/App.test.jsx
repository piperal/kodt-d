import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import App from "./App";


describe("App", () => {
  it("shows the titles fetched from tasks.json", async () => {

    //globalThis muudab raeguses näites globaalse fetchi mock fetchiks 
    const originalFetch = globalThis.fetch;
    try {
      //vi.fn() on võlts funktsioon
      globalThis.fetch = vi.fn();
      //MockResolvedValueOnce määrab fetch tulemused
      globalThis.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          return [{ id: 1, title: "Title 1", completed: false }, { id: 2, title: "Title 2", completed: true }, { id: 3, title: "Title 3", completed: false }]
        }
      })

      render(
        <MemoryRouter initialEntries={["/tasks"]}>
          <App />
        </MemoryRouter>)

      //Otsib elemendi mis on link, ja mille nime on Title 1
      const el1 = await screen.findByRole('link', { name: /Title 1/i });
      const el2 = await screen.findByRole('link', { name: /Title 2/i });
      //Ootab ja vaatab et el1 ja el2 oleks dokumendis
      expect(el1).toBeInTheDocument();
      expect(el2).toBeInTheDocument();
    } finally {
      //Peale testi muudetakse mock fetch tagasi normaalseks fetchiks
      globalThis.fetch = originalFetch;
    }

  });
});