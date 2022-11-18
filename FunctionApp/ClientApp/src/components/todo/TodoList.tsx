import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, getAllTodos, solveTodo, updateTodo } from "../../behavior/todo/actions";
import { Todo } from "../../behavior/todo/types";
import { RootState } from "../../store/store";
import EditTodoModal from "./EditTodoModal";

type TodoTableData = {
    key: string
    description: string
    isCompleted: string
}

const TodoList = (): JSX.Element => {
    const dispatch = useDispatch();
    
    const [editModalPayload, setEditModalPayload] = useState<Todo | undefined>(undefined);
    const [isVisibleEditModal, setVisibleEditModal] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getAllTodos());
    }, [])

    const todos: Todo[] = useSelector((state: RootState) => state.todo);
    const data: TodoTableData[] = todos.map(todo => 
        ({
            key: todo.id, 
            description: 
            todo.description, 
            isCompleted: todo.isCompleted.toString()
        })).sort((a, b) => Number(a.isCompleted === 'true') - Number(b.isCompleted === 'true'));

    const onSolveClick = (id: string) => {
        dispatch(solveTodo(id));
    }

    const onDeleteClick = (id: string) => {
        dispatch(deleteTodo(id));
    } 

    const onEditClick = (record: TodoTableData) => {
        setEditModalPayload({
            id: record.key,
            description: record.description,
            isCompleted: record.isCompleted === 'true'
        })
        setVisibleEditModal(true);
    }

    const onCloseModalCallback = () => {
        setEditModalPayload(undefined);
        setVisibleEditModal(false);
    }

    const onOkModalCallback = () => {
        dispatch(updateTodo(editModalPayload!));
    }

    const RenderAcions = (record: TodoTableData): JSX.Element => {
        return (
            <div>
                {
                    record.isCompleted === 'false' && 
                    <>
                        <Button size='small' type='text' onClick={() => onSolveClick(record.key)} >
                            solve
                        </Button>
                        <Button size='small' type='text' onClick={() => onEditClick(record)}>
                            edit
                        </Button>
                    </>
                }
                <Button size='small' type='text' danger onClick={() => onDeleteClick(record.key)} >
                    delete
                </Button>
            </div>
        )
    }
    
    return (
        <div>
            <Table 
                dataSource={data}
                pagination={false}
                size={'small'}
                style={{width: '50%'}}
            >
                <Table.Column
                    width={'40%'}
                    title='Description'
                    dataIndex='description'
                    key='description'
                />
                <Table.Column
                    title='Is Completed'
                    dataIndex='isCompleted'
                    key='isCompleted'
                />
                <Table.Column
                    title='Actions'
                    key='actions'
                    render={RenderAcions}
                />
            </Table>
            <EditTodoModal
                isVisible={isVisibleEditModal}
                onCloseCallback={onCloseModalCallback}
                onOkCallback={onOkModalCallback}
                payload={editModalPayload}
                setPayload={setEditModalPayload}
            />
        </div>
    )
}

export default TodoList;