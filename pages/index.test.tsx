import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./";
import TasksContextProvider from "./contexts/TasksContext";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("should add card to the list when clicking the button", async () => {
    const { getByPlaceholderText, getByRole, getByText } = render(
      <TasksContextProvider>
        <Home />
      </TasksContextProvider>
    );

    const input = getByPlaceholderText("Nova tarefa");
    const button = getByRole("button", { name: /Criar/i });

    await waitFor(() => {
      fireEvent.change(input, { target: { value: "Test task" } });
      fireEvent.click(button);
    });

    expect(getByText("Test task")).toBeInTheDocument();
  });

  it("should add card to the list when pressing enter on input", async () => {
    const { getByPlaceholderText, getByText } = render(
      <TasksContextProvider>
        <Home />
      </TasksContextProvider>
    );

    const input = getByPlaceholderText("Nova tarefa");

    await waitFor(() => {
      fireEvent.change(input, { target: { value: "Test task 2" } });
      fireEvent.keyDown(input, { key: "Enter", code: 13, charCode: 13 });
    });

    expect(getByText("Test task 2")).toBeInTheDocument();
  });
});
