import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Använder userEvent för alla interaktioner
import LoginComponent from "../../src/components/LoginComponent";
import { signInWithEmailAndPassword } from "firebase/auth";
import { describe, it, expect, vi, Mock } from "vitest"; // Import från Vitest

// Mocka firebase-auth-funktioner med Vitest's "vi"
vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: vi.fn(),
  getAuth: vi.fn(),
}));

describe("LoginComponent", () => {
  // Test 1: Kontrollera att alla delar av formuläret visas
  it("visar alla delar av inloggningsformuläret", () => {
    render(<LoginComponent onLoginSuccess={() => {}} />);
    expect(screen.getByLabelText("E-post")).toBeInTheDocument();
    expect(screen.getByLabelText("Lösenord")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Logga in" }),
    ).toBeInTheDocument();
  });

  // Test 2: Kontrollera att e-post kan skrivas in
  it("låter användaren skriva in e-post", async () => {
    render(<LoginComponent onLoginSuccess={() => {}} />);
    const epostInput = screen.getByLabelText("E-post");

    // Använd userEvent för att simulera att användaren skriver in e-post
    await userEvent.type(epostInput, "test@test.com");

    // Kontrollera att värdet har uppdaterats
    expect(epostInput).toHaveValue("test@test.com");
  });

  // Test 3: Kontrollera att lösenord kan skrivas in
  it("låter användaren skriva in lösenord", async () => {
    render(<LoginComponent onLoginSuccess={() => {}} />);
    const lösenordsInput = screen.getByLabelText("Lösenord");

    // Använd userEvent för att simulera att användaren skriver in lösenord
    await userEvent.type(lösenordsInput, "hemligt123");

    // Kontrollera att värdet har uppdaterats
    expect(lösenordsInput).toHaveValue("hemligt123");
  });

  // Test 4: Kontrollera att inloggningsfunktionen anropas med rätt värden
  it("skickar inloggningsuppgifter när formuläret skickas", async () => {
    const mockUser = { uid: "123", email: "test@example.com" };
    (signInWithEmailAndPassword as Mock).mockResolvedValue({
      user: mockUser,
    });

    const onLoginSuccess = vi.fn();
    render(<LoginComponent onLoginSuccess={onLoginSuccess} />);

    // Använd userEvent för att fylla i formuläret och klicka på "Logga in"
    await userEvent.type(screen.getByLabelText("E-post"), "test@test.com");
    await userEvent.type(screen.getByLabelText("Lösenord"), "hemligt123");
    await userEvent.click(screen.getByRole("button", { name: "Logga in" }));

    // Kontrollera att inloggningsfunktionen anropades med rätt värden
    await waitFor(() => {
      expect(onLoginSuccess).toHaveBeenCalledWith(mockUser);
    });
  });

  // Test 5: Kontrollera att fälten är obligatoriska
  it("kräver att e-post och lösenord fylls i", () => {
    render(<LoginComponent onLoginSuccess={() => {}} />);

    // Kontrollera att både e-post och lösenord är obligatoriska fält
    expect(screen.getByLabelText("E-post")).toBeRequired();
    expect(screen.getByLabelText("Lösenord")).toBeRequired();
  });
});
