import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginComponent from "../../src/components/LoginComponent";

describe("LoginComponent", () => {
  // Test 1: Kontrollera att alla delar av formuläret visas
  test("visar alla delar av inloggningsformuläret", () => {
    render(<LoginComponent onLogin={() => {}} />);
    expect(screen.getByLabelText("Användarnamn")).toBeInTheDocument();
    expect(screen.getByLabelText("Lösenord")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Logga in" }),
    ).toBeInTheDocument();
  });

  // Test 2: Kontrollera att användarnamn kan skrivas in
  test("låter användaren skriva in användarnamn", () => {
    render(<LoginComponent onLogin={() => {}} />);
    const användarnamnsInput = screen.getByLabelText("Användarnamn");

    // Simulera att användaren skriver in ett användarnamn
    fireEvent.change(användarnamnsInput, {
      target: { value: "testanvändare" },
    });

    // Kontrollera att värdet har uppdaterats
    expect(användarnamnsInput).toHaveValue("testanvändare");
  });

  // Test 3: Kontrollera att lösenord kan skrivas in
  test("låter användaren skriva in lösenord", () => {
    render(<LoginComponent onLogin={() => {}} />);
    const lösenordsInput = screen.getByLabelText("Lösenord");

    // Simulera att användaren skriver in ett lösenord
    fireEvent.change(lösenordsInput, { target: { value: "hemligt123" } });

    // Kontrollera att värdet har uppdaterats
    expect(lösenordsInput).toHaveValue("hemligt123");
  });

  // Test 4: Kontrollera att inloggningsfunktionen anropas med rätt värden
  test("skickar inloggningsuppgifter när formuläret skickas", () => {
    const mockOnLogin = jest.fn();
    render(<LoginComponent onLogin={mockOnLogin} />);

    // Simulera att användaren fyller i formuläret och klickar på "Logga in"
    fireEvent.change(screen.getByLabelText("Användarnamn"), {
      target: { value: "testanvändare" },
    });
    fireEvent.change(screen.getByLabelText("Lösenord"), {
      target: { value: "hemligt123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Logga in" }));

    // Kontrollera att inloggningsfunktionen anropades med rätt värden
    expect(mockOnLogin).toHaveBeenCalledWith("testanvändare", "hemligt123");
  });

  // Test 5: Kontrollera att fälten är obligatoriska
  test("kräver att användarnamn och lösenord fylls i", () => {
    render(<LoginComponent onLogin={() => {}} />);

    // Kontrollera att både användarnamn och lösenord är obligatoriska fält
    expect(screen.getByLabelText("Användarnamn")).toBeRequired();
    expect(screen.getByLabelText("Lösenord")).toBeRequired();
  });
});
