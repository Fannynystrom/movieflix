import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogoutComponent from "../components/LogoutComponent";
import { describe, it, expect, vi, Mock } from "vitest";
import { useAuth } from "../AuthContext";

// Definiera typen för användarkontexten
type AuthContextType = {
  logout: () => void;
};

// Mocka useAuth med manual mocking
vi.mock("../AuthContext", () => ({
  useAuth: vi.fn(),
}));

describe("LogoutComponent", () => {
  // // Test 1: Kontrollera att knappen visas korrekt
  // it("renderar korrekt och visar 'Logga ut'-knappen", () => {
  //   render(
  //     <AuthProvider> {/* Ensure the AuthProvider wraps your component */}
  //         <LogoutComponent />
  //     </AuthProvider>
  // );
  //   const logoutButton = screen.getByRole("button", { name: /logga ut/i });
  //   expect(logoutButton).toBeInTheDocument();
  // });

  // Test 2: Kontrollera att logout-funktionen anropas vid klick
  it("kallar logout-funktionen vid knappklick", async () => {
    const mockLogout = vi.fn();
    (useAuth as Mock).mockReturnValue({
      logout: mockLogout,
    } as AuthContextType);

    render(<LogoutComponent />);
    const logoutButton = screen.getByRole("button", { name: /logga ut/i });

    // Simulera ett klick på knappen
    await userEvent.click(logoutButton);

    // Kontrollera att logout har anropats
    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
  });

  // Test 3: Kontrollera att knappen har rätt klassnamn
  it("har rätt klassnamn på knappen", () => {
    render(<LogoutComponent />);
    const logoutButton = screen.getByRole("button", { name: /logga ut/i });
    expect(logoutButton).toHaveClass("logout-button");
  });

  // Test 4: Kontrollera att logout-funktionen är en giltig funktion
  it("returnerar en giltig logout-funktion från useAuth", () => {
    const mockLogout = vi.fn();
    (useAuth as Mock).mockReturnValue({
      logout: mockLogout,
    } as AuthContextType);

    render(<LogoutComponent />);
    expect(typeof useAuth().logout).toBe("function");
  });

  // Test 5: Kontrollera att rätt text visas på knappen
  it("visar korrekt text på knappen", () => {
    render(<LogoutComponent />);
    const logoutButton = screen.getByRole("button", { name: /logga ut/i });
    expect(logoutButton).toHaveTextContent("Logga ut");
  });
});
