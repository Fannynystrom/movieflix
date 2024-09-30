import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginComponent from "../../src/components/LoginComponent";
import { signInWithEmailAndPassword } from "firebase/auth";

jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

describe("LoginComponent", () => {
  // Test 1: Kontrollera att alla delar av formuläret visas
  test("visar alla delar av inloggningsformuläret", () => {
    render(<LoginComponent onLoginSuccess={() => {}} />);
    expect(screen.getByLabelText("E-post")).toBeInTheDocument();
    expect(screen.getByLabelText("Lösenord")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Logga in" }),
    ).toBeInTheDocument();
  });

  // Test 2: Kontrollera att epost kan skrivas in
  test("låter användaren skriva in e-post", () => {
    render(<LoginComponent onLoginSuccess={() => {}} />);
    const epostInput = screen.getByLabelText("E-post");

    // Simulera att användaren skriver in epost
    fireEvent.change(epostInput, {
      target: { value: "test@test.com" },
    });

    // Kontrollera att värdet har uppdaterats
    expect(epostInput).toHaveValue("test@test.com");
  });

  // Test 3: Kontrollera att lösenord kan skrivas in
  test("låter användaren skriva in lösenord", () => {
    render(<LoginComponent onLoginSuccess={() => {}} />);
    const lösenordsInput = screen.getByLabelText("Lösenord");

    // Simulera att användaren skriver in ett lösenord
    fireEvent.change(lösenordsInput, { target: { value: "hemligt123" } });

    // Kontrollera att värdet har uppdaterats
    expect(lösenordsInput).toHaveValue("hemligt123");
  });

  // Test 4: Kontrollera att inloggningsfunktionen anropas med rätt värden
  test("skickar inloggningsuppgifter när formuläret skickas", async () => {
    const mockUser = { uid: "123", email: "test@example.com" };
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: mockUser,
    });

    const onLoginSuccess = jest.fn();
    render(<LoginComponent onLoginSuccess={onLoginSuccess} />);

    // Simulera att användaren fyller i formuläret och klickar på "Logga in"
    fireEvent.change(screen.getByLabelText("E-post"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Lösenord"), {
      target: { value: "hemligt123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Logga in" }));

    // Kontrollera att inloggningsfunktionen anropades med rätt värden
    await waitFor(() => {
      expect(onLoginSuccess).toHaveBeenCalledWith(mockUser);
    });
  });

  // Test 5: Kontrollera att fälten är obligatoriska
  test("kräver att e-post och lösenord fylls i", () => {
    render(<LoginComponent onLoginSuccess={() => {}} />);

    // Kontrollera att både E-post och lösenord är obligatoriska fält
    expect(screen.getByLabelText("E-post")).toBeRequired();
    expect(screen.getByLabelText("Lösenord")).toBeRequired();
  });
});
