import { Todo } from "../../behavior/todo/types"

type Props = {
    todo: Todo
}

const TodoItem = ({ todo }: Props): JSX.Element => {

    return (
        <tr>
            <td>
                {todo.description} 
            </td>
            <td>
                
                {todo.isCompleted.toString()}
            </td>
            <td>
                <button>
                    solve
                </button>
            </td>
            <td>
                <button>
                    edit
                </button>
            </td>
            <td>
                <button>
                    delete
                </button>
            </td>
        </tr>
    )
}

export default TodoItem;