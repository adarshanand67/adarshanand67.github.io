import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";
import "@testing-library/jest-dom";

// Mock the API module
jest.mock("@/lib/api", () => ({
  getProfile: jest.fn().mockResolvedValue({
    name: "Test User",
    socials: {
      linkedin: "test-linkedin",
      github: "test-github",
    },
  }),
}));

describe("Footer", () => {
  it("renders footer sections", async () => {
    const component = await Footer();
    render(component);

    expect(screen.getByText("Writings and Learnings")).toBeInTheDocument();
    expect(screen.getByText("Legal and Contact")).toBeInTheDocument();
    expect(screen.getByText("Shelves")).toBeInTheDocument();
  });

  it("renders important links", async () => {
    const component = await Footer();
    render(component);

    expect(screen.getByText("Contact Me")).toBeInTheDocument();
    expect(screen.getByText("Bookshelf")).toBeInTheDocument();
  });
});
