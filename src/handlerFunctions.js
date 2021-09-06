import TodoItem from "./TodoItem"

const todoMapper = (items) =>{
    return items.map(item => {return <TodoItem item = {item}/> })
}


module.exports.todoMapper = todoMapper
