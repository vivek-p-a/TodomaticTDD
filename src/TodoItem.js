const TodoItem = (props) => {
    return (
      <div className={props.isActive?"flex justify-between my-3 p-3 rounded-md bg-green-600":"flex justify-between my-3 p-3 rounded-md bg-purple-600"}>
        <span>
          <div className="flex items-center">
            <input
                id = {props.uniqueId}
                type="checkbox"
                className = "form-checkbox h-8 w-6"
                checked={props.isActive}
                onChange={() => props.checkBoxHandler(props.uniqueId)}
            />
           <label htmlFor={props.uniqueId} className="ml-3 text-md font-medium text-white">{props.todoItem}</label>
          </div>
        </span>
        <span>
        <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-1 px-2 rounded mx-1" onClick={() => props.editHandler(props.uniqueId)}>
            Edit
        </button>
        <button
          onClick={() => props.deleteHandler(props.uniqueId)}
          className="bg-red-700 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded inline-flex items-center"
        >
            Delete
        </button>
        </span>
      </div>
    );
  };

  export { TodoItem };
