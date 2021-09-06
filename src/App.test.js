import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { TodoItem } from './TodoItem';

describe("App Component", () => {
      it("renders 'Todomatic!' heading", () => {
        render(<App />);

        const linkElement = screen.getByText("Todomatic!");

        expect(linkElement).toBeInTheDocument();
      });

      it("renders an input field", () => {
          render(<App/>);

          const inputElement = document.querySelector("input");

          expect(inputElement).toBeInTheDocument();
      })

      it("renders a submit button", () =>{
        render(<App/>);

        const buttonElement = document.querySelector("input[type=submit]");

        expect(buttonElement).toBeInTheDocument();
      })

      it("renders a TodoItem and clears input on clicking 'submit'", () =>{
        render(<App/>);
        const inputElement = document.querySelector("input[type=text]");
        const buttonElement = document.querySelector("input[type=submit]");

        userEvent.type(inputElement,"Task 1");
        userEvent.click(buttonElement);
        const todo = screen.getByText("Task 1");
        const inputCleared = inputElement.value

        expect(todo).toBeInTheDocument();
        expect(inputCleared).toBeFalsy()
      })

      it("renders 'edit', 'checkbox' and 'delete' button", async ()=>{
        render(<App/>)
        const inputElement = document.querySelector("input[type=text]");
        const buttonElement = document.querySelector("input[type=submit]");

        userEvent.type(inputElement,"Task 1");
        userEvent.click(buttonElement);
        const editButtonElement = await screen.findByText("Edit");
        const deleteElement = await screen.findByText("Delete");
        const checkBoxElement = await document.querySelector("input[type=checkbox]")

        expect(editButtonElement).toBeInTheDocument();
        expect(checkBoxElement).toBeInTheDocument();
        expect(deleteElement).toBeInTheDocument();
      })

      it("changes text from 'Add Todo' to 'Update Todo' when 'Edit' button is clicked",async ()=>{
        render(<App/>)
        const inputElement = document.querySelector("input[type=text]");
        const buttonElement = document.querySelector("input[type=submit]");

        userEvent.type(inputElement,"Task 1");
        userEvent.click(buttonElement);
        const editButtonElement = await screen.findByText("Edit");
        userEvent.click(editButtonElement)
        const updateButton = screen.getByText("Update Todo")
        const addButton = screen.queryByText("Add Todo")

        expect(updateButton).toBeInTheDocument();
        expect(addButton).not.toBeInTheDocument();
      })

      it("check if 'edit' function works", ()=>{
        render(<App/>)
        const inputElement = document.querySelector("input[type=text]");
        const buttonElement = document.querySelector("input[type=submit]");

        userEvent.type(inputElement,"Task 1");
        userEvent.click(buttonElement);
        const editButtonElement = screen.queryByText("Edit");
        userEvent.click(editButtonElement)
        userEvent.click(inputElement)
        userEvent.clear(inputElement)
        userEvent.type(inputElement,"Task 2")
        userEvent.click(buttonElement)
        const updatedElement =  screen.queryByText("Task 2")
        const previouslement =  screen.queryByText("Task 1")

        expect(updatedElement).toBeInTheDocument();
        expect(previouslement).not.toBeInTheDocument();
      })

      it("check if 'delete' function works", ()=>{
        render(<App/>)
        const inputElement = document.querySelector("input[type=text]");
        const buttonElement = document.querySelector("input[type=submit]");

        userEvent.type(inputElement,"Task 1");
        userEvent.click(buttonElement);
        const deleteButtonElement = screen.queryByText("Delete");
        const todoElement = screen.queryByText("Task 1")

        expect(todoElement).toBeInTheDocument();
        userEvent.click(deleteButtonElement)
        expect(todoElement).not.toBeInTheDocument();
      })
      it('tests completed todo filter button', async () =>{
        render(<App/>)
        const inputElement = document.querySelector("input[type=text]");
        const buttonElement = document.querySelector("input[type=submit]");

        userEvent.type(inputElement,"Task 1");
        userEvent.click(buttonElement);
        const checkBoxElement = await document.querySelector("input[type=checkbox]")
        userEvent.click(checkBoxElement)
        const activeButton = await screen.findByText("Active")
        userEvent.click(activeButton)
        let todoItem  = screen.queryByText("Task 1")

        expect(todoItem).not.toBeInTheDocument();
        const completedButton = await screen.findByText("Completed")
        userEvent.click(completedButton)
        todoItem  =  screen.queryByText("Task 1")
        expect(todoItem).toBeInTheDocument()
      })

      it('tests active todo filter button', async () =>{
        render(<App/>)
        const inputElement = document.querySelector("input[type=text]");
        const buttonElement = document.querySelector("input[type=submit]");

        userEvent.type(inputElement,"Task 1");
        userEvent.click(buttonElement);
        const activeButton = await screen.findByText("Active")
        userEvent.click(activeButton)
        let todoItem  = screen.queryByText("Task 1")

        expect(todoItem).toBeInTheDocument();
      })
})
