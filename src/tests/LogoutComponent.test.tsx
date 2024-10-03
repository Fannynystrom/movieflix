import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LogoutComponent from "../components/LogoutComponent";
import { useAuth } from "../AuthContext"; // Justera sökvägen om nödvändigt

// Definiera typen för användarkontexten
type AuthContextType = {
  logout: () => void;
};

// Mocka useAuth så att vi kan testa logout-funktionen
vi.mock("../AuthContext", () => ({
  useAuth: vi.fn(),
}));

describe("LogoutComponent", () => {
  // Test 1: Kontrollera att knappen visas korrekt
  it("renderar korrekt och visar 'Logga ut'-knappen", () => {
    (useAuth as jest.Mock).mockReturnValue({ logout: vi.fn() });

    render(<LogoutComponent />);

    // Kontrollera att knappen renderas med korrekt text
    const logoutButton = screen.getByRole("button", { name: /logga ut/i });
    expect(logoutButton).toBeInTheDocument();
  });

  // Test 2: Kontrollera att logout-funktionen anropas vid klick
  it("kallar logout-funktionen vid knappklick", () => {
    const mockLogout = vi.fn();
    (useAuth as jest.Mock).mockReturnValue({
      logout: mockLogout,
    } as AuthContextType);

    render(<LogoutComponent />);

    const logoutButton = screen.getByRole("button", { name: /logga ut/i });

    // Simulera ett klick på knappen
    fireEvent.click(logoutButton);

    // Kontrollera att logout har anropats
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  // Test 3: Kontrollera att knappen har rätt klassnamn
  it("har rätt klassnamn på knappen", () => {
    (useAuth as jest.Mock).mockReturnValue({
      logout: vi.fn(),
    } as AuthContextType);

    render(<LogoutComponent />);

    const logoutButton = screen.getByRole("button", { name: /logga ut/i });

    // Kontrollera att knappen har klassnamnet 'logout-button'
    expect(logoutButton).toHaveClass("logout-button");
  });

  // Test 4: Kontrollera att logout-funktionen är en giltig funktion
  it("returnerar en giltig logout-funktion från useAuth", () => {
    const mockLogout = vi.fn();
    (useAuth as jest.Mock).mockReturnValue({
      logout: mockLogout,
    } as AuthContextType);

    render(<LogoutComponent />);

    // Kontrollera att logout är en funktion
    expect(typeof useAuth().logout).toBe("function");
  });

  // Test 5: Kontrollera att rätt text visas på knappen
  it("visar korrekt text på knappen", () => {
    (useAuth as jest.Mock).mockReturnValue({
      logout: vi.fn(),
    } as AuthContextType);

    render(<LogoutComponent />);

    // Kontrollera att knappen har rätt text
    const logoutButton = screen.getByRole("button", { name: /logga ut/i });
    expect(logoutButton).toHaveTextContent("Logga ut");
  });
});
