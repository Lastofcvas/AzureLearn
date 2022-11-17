import { useSelector } from "react-redux";
import TodoForm from "../components/todo/TodoForm";
import TodoList from "../components/todo/TodoList";
import { RootState } from "../store/store";

const Todo = (): JSX.Element => {
    return (
        <div>
            <h3>Todo App</h3>
            <div style={{paddingBottom: 20}}>
                <TodoForm />
            </div>
            <TodoList />
        </div>
    )
}

export default Todo;