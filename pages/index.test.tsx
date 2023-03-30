import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Home from "./";
import TasksContextProvider from "./contexts/TasksContext";

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
      fireEvent.change(input, { target: { value: "Task pressing 'enter'" } });
      fireEvent.keyDown(input, { key: "Enter", code: 13, charCode: 13 });
    });

    expect(getByText("Task pressing 'enter'")).toBeInTheDocument();
  });

  it("should not add card to the list when input is empty", async () => {
    const { getByPlaceholderText, queryByTestId, getByRole } = render(
      <TasksContextProvider>
        <Home />
      </TasksContextProvider>
    );

    const input = getByPlaceholderText("Nova tarefa");
    const button = getByRole("button", { name: /Criar/i });

    await waitFor(() => {
      fireEvent.click(button);
      fireEvent.keyDown(input, { key: "Enter", code: 13, charCode: 13 });
    });

    // expected: not finding a label (card) that has the test-id of the first task
    const label = queryByTestId("task-0");

    expect(input).toHaveValue("");
    expect(label).not.toBeInTheDocument();
  });

  it("should change task checked status on click on card", async () => {
    const { getByPlaceholderText, getByRole, queryByTestId } = render(
      <TasksContextProvider>
        <Home />
      </TasksContextProvider>
    );

    const input = getByPlaceholderText("Nova tarefa");
    const button = getByRole("button", { name: /Criar/i });

    await waitFor(() => {
      fireEvent.change(input, { target: { value: "Test task checked" } });
      fireEvent.click(button);
    });

    const cardCheckbox = getByRole("checkbox");
    const label = queryByTestId("task-0");

    await waitFor(() => {
      fireEvent.click(cardCheckbox);
    });
    console.log(cardCheckbox);

    expect(cardCheckbox).toBeChecked();
    expect(label).toHaveClass("line-through");
  });

  it("should delete task when click in the delete button", async () => {
    const { getByPlaceholderText, getByRole, getByText, queryByText, getByTestId } = render(
      <TasksContextProvider>
        <Home />
      </TasksContextProvider>
    );

    const input = getByPlaceholderText("Nova tarefa");
    const createTaskButton = getByRole("button", { name: /Criar/i });

    await waitFor(() => {
      fireEvent.change(input, { target: { value: "Deleteable task" } });
      fireEvent.click(createTaskButton);
    });

    expect(getByText("Deleteable task")).toBeInTheDocument();

    const deleteButton = getByTestId("task-0-delete-button");

    await waitFor(() => {
      fireEvent.click(deleteButton);
    });

    expect(queryByText("Deleteable task")).not.toBeInTheDocument();
  });
});

