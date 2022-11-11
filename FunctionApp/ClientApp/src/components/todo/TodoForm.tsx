import { FormEvent, useState } from "react";

const TodoForm = (): JSX.Element => {
    const [description, setDescription] = useState<string>('');

    const onSubmit = (event: any) => {
        event.preventDefault();

        console.log(description);
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
            <button type='submit'>Add</button>
        </form>
    );
}

export default TodoForm;