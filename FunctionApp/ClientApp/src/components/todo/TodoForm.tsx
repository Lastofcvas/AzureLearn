import { Button } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../behavior/todo/actions";

const TodoForm = (): JSX.Element => {
    const [description, setDescription] = useState<string>('');

    const dispatch = useDispatch();

    const onSubmit = (event: any) => {
        event.preventDefault();
        dispatch(addTodo({description: description, isCompleted: false}));
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