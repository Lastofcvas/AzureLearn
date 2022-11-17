import { Button } from "antd";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { TodoCommandAction, TODO_ADD } from "../../behavior/todo/actions";
import { AddTodo } from "../../behavior/todo/types";

const TodoForm = (): JSX.Element => {
    const [description, setDescription] = useState<string>('');

    const dispatch = useDispatch();

    const onSubmit = (event: any) => {
        event.preventDefault();
        dispatch(
            {
                type: TODO_ADD, 
                payload: {
                    description: description, 
                    isCompleted: false
                }
            } as TodoCommandAction
        )
        setDescription('');
    }
    
    return (
        <form onSubmit={onSubmit}>
            <label htmlFor='description' style={{paddingRight: 10}}>
                <input 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id='description'
                    name='desciption'
                    type='text'
                />
            </label>
            <Button htmlType='submit' type='primary'>Add</Button>
        </form>
    );
}

export default TodoForm;