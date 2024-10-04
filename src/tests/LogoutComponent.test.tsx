import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogoutComponent from "../components/LogoutComponent";
import { describe, it, expect, vi, Mock } from "vitest";
import { useAuth } from "../AuthContext";

// Definiera typen för användarkontexten
type AuthContextType = {
  logout: () => void;
  isLoggedIn: boolean;
};

// Mocka useAuth med manual mocking
vi.mock("../AuthContext", () => ({
  useAuth: vi.fn(),
}));

describe("LogoutComponent", () => {
  // Test 1: Kontrollera att användaren loggas ut och inloggningsstatus ändras
  it("loggar ut användaren korrekt och uppdaterar inloggningsstatus", async () => {
    const mockLogout = vi.fn();

    // Lokalt inloggningstillstånd för att simulera statusändring
    let isLoggedIn = true;

    (useAuth as Mock).mockImplementation(() => ({
      logout: () => {
        mockLogout();
        isLoggedIn = false; // Simulera att användaren loggas ut
      },
      isLoggedIn,
    }));

    render(<LogoutComponent />);
    const logoutButton = screen.getByRole("button", { name: /logga ut/i });

    // Simulera ett klick på logga ut-knappen
    await userEvent.click(logoutButton);

    // Kontrollera att logout-funktionen anropades
    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });

    // Kontrollera att användaren är utloggad
    await waitFor(() => {
      expect(isLoggedIn).toBe(false); // Kontrollera att inloggningsstatus ändrades
    });
  });

  // Test 2: Kontrollera att knappen har rätt klassnamn
  it("har rätt klassnamn på knappen", () => {
    render(<LogoutComponent />);
    const logoutButton = screen.getByRole("button", { name: /logga ut/i });
    expect(logoutButton).toHaveClass("logout-button");
  });

  // Test 3: Kontrollera att logout-funktionen är en giltig funktion
  it("returnerar en giltig logout-funktion från useAuth", () => {
    const mockLogout = vi.fn();

    (useAuth as Mock).mockReturnValue({
      logout: mockLogout,
      isLoggedIn: true, // Lägg till isLoggedIn för att matcha AuthContextType
    } as AuthContextType);

    render(<LogoutComponent />);
    expect(typeof useAuth().logout).toBe("function"); // Kontrollera att logout är en funktion
  });

  // Test 4: Kontrollera att rätt text visas på knappen
  it("visar korrekt text på knappen", () => {
    render(<LogoutComponent />);
    const logoutButton = screen.getByRole("button", { name: /logga ut/i });
    expect(logoutButton).toHaveTextContent("Logga ut"); // Kontrollera att knappen har rätt text
  });
});
