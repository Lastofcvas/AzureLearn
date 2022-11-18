import { Input, Modal } from "antd";
import React from "react";
import { Todo } from "../../behavior/todo/types";

type Props = {
    isVisible: boolean
    onCloseCallback: () => void
    onOkCallback: () => void
    payload: Todo | undefined
    setPayload: React.Dispatch<React.SetStateAction<Todo | undefined>>

}

const EditTodoModal = ({ isVisible, onCloseCallback, onOkCallback, payload, setPayload }: Props): JSX.Element => {
    
    return (
        <Modal
            open={isVisible}
            onCancel={onCloseCallback}
            onOk={onOkCallback}
        >
            <Input
                style={{marginTop: 30}}
                value={payload?.description} 
                onChange={event => setPayload({...payload!, description: event.target.value})} 
            />
        </Modal>
    )
}

export default EditTodoModal;