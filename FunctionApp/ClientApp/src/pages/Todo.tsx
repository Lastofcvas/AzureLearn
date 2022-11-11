import TodoForm from "../components/todo/TodoForm";
import TodoList from "../components/todo/TodoList";

const Todo = (): JSX.Element => {
    return (
        <div>
            <h3>Todo App</h3>
            <TodoForm />
            <TodoList />
        </div>
    )
}

export default Todo;