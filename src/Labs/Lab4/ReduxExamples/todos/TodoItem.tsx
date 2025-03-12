import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: { todo: any }) {
  const dispatch = useDispatch();
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span>{todo.title}</span>
      <div>
        <button
          className="btn btn-primary text-white me-2"
          onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click">
          Edit
        </button>
        <button
          className="btn btn-danger text-white"
          onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click">
          Delete
        </button>
      </div>
    </li>
  );
}