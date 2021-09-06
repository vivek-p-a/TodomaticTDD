import { TodoItem } from "./TodoItem";
import React, { useEffect, useState } from "react";
import * as uuid from 'uuid';
function App() {
  const [todos, setTodos] = useState([]);
  const [buttonStates, setButtonStates] = useState([true,false,false])
  const [editingState, setEditingState] = useState(false)
  const [idOfTodoToBeEdited, setIDOfTodoToBeEdited] = useState(0)
  const handleSubmit = (e) => {
    const { todoItem } = e.target.elements;
    let todoTask = todoItem.value;
    if (todoTask === "") {
        alert("Can't add Empty Todo")
        e.preventDefault();
        return
    }
// tempObject[0] - Task, tempObject[1] = Active Status
    let tempObject = [todoTask, false, uuid.v4()];
    setTodos([...todos, tempObject]);
    e.preventDefault();
    e.target.reset();
  };

  const deleteHandler = (taskId) => {
    let tempCopy = [...todos];
    let index = tempCopy.map(function(el){return el[2];}).indexOf(taskId);
    tempCopy.splice(index, 1);
    setTodos(tempCopy);
  };

  const checkBoxHandler = (taskId) => {
    let tempCopy = [...todos];
    let index = tempCopy.map(function(el){return el[2];}).indexOf(taskId);
    tempCopy[index][1] = !tempCopy[index][1];
    setTodos(tempCopy);
  };

  const editHandler = (taskId) => {
    setEditingState(true)
    let index = todos.map(function(el){return el[2];}).indexOf(taskId);
    setIDOfTodoToBeEdited(index)
}
  const todoMapper = (items) => {
    let mappedItems = items.map((todo, index) => (
        <TodoItem
          todoItem={todo[0]}
          key={todo[2]}
          uniqueId={todo[2]}
          deleteHandler={deleteHandler}
          isActive={todo[1]}
          checkBoxHandler={checkBoxHandler}
          editHandler = {editHandler}
        />
      ))
      return mappedItems
  }

  let showAllJSX  = todoMapper(todos)
  let activeTodos = todos.filter((todo) => {return(todo[1] !== false )})
  let activeTodosJSX = todoMapper(activeTodos)
  let CompletedTodos = todos.filter((todo) => {return(todo[1] !== true )})
  let CompletedTodosJSX = todoMapper(CompletedTodos)

  const toggleHandler = () => {
      let newButtonState = [...buttonStates]
      newButtonState[0] = true
      setButtonStates([newButtonState, false, false])
  }

  const activeHandler = () => {
    let newButtonState = [...buttonStates]
    newButtonState[1] = true
    setButtonStates([false, false,newButtonState])
}

const completedHandler = () => {
    let newButtonState = [...buttonStates]
    newButtonState[2] = true
    setButtonStates([false,newButtonState,false])
}
 const editItem = (e) =>{
    const { todoItem } = e.target.elements;
    let todoTask = todoItem.value;
// tempObject[0] - Task, tempObject[1] = Active Status
    let tempObject = [todoTask, false];
    let tempTodos  = [...todos]
    tempTodos[idOfTodoToBeEdited][0] = tempObject[0]
    setTodos(tempTodos);
    e.preventDefault();
    e.target.reset();
    setEditingState(false)

 }
 useEffect(()=>{console.log(todos)},[todos])


  return (
    <div className="App p-4">
      <h1 className="font-bold text-gray-700 text-4xl text-center mx-4"> Todomatic!</h1>
      <form onSubmit={editingState?editItem:handleSubmit} className="mt-5" >
        <input type="text" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="todoItem" placeholder="Enter Todo" defaultValue={editingState?todos[idOfTodoToBeEdited][0]:""}   />
        <span className="flex justify-center mr-4">
            <input type="submit" className={editingState?"my-4 bg-purple-800 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded":"my-4 bg-red-800 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"} value={editingState?"Update Todo":"Add Todo"}/>
        </span>
      </form>
      <div className="flex justify-around">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded m-3" onClick = {toggleHandler}> All Tasks </button>
      <button className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded m-3" onClick = {activeHandler}> Active </button>
      <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded m-3" onClick = {completedHandler}> Completed </button>
      </div>
      <h1 className="text-xl font-bold">{CompletedTodos.length} Task(s) Remaining</h1>
      {buttonStates[0] && showAllJSX}
      {buttonStates[1] && activeTodosJSX}
      {buttonStates[2] && CompletedTodosJSX}
    </div>

  );

}

export default App;
