
export type Todo = {
    id: string
    description: string
    isCompleted: boolean
}

export type AddTodo = {
    description: string
    isCompleted: boolean
}

export type TodoState = Todo[]

