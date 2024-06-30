import { createContext, useContext, useState } from "react"

type TaskProviderProp = {
    children: React.ReactNode
}

type DataProp = {
    id: string
    task: string
    isCompleted: boolean
}
type TaskContextProp = {
    data: DataProp[]
    handleAdd: (task: string) => void
    toggleState: (id: string) => void
    handleDelete: (id: string) => void
}
export const TaskContext = createContext<TaskContextProp | null>(null);

const TaskProvider = ({ children }: TaskProviderProp) => {
    const [data, setData] = useState<DataProp[]>([])
    const handleAdd = (task: string) => {
        setData((prev) => {
            const newTask: DataProp = {
                id: Math.random() + "",
                task: task,
                isCompleted: false
            }
            return [newTask, ...prev]
        })
    }

    const toggleState = (id: string) => {
        setData(prev => prev.map(ele => ele.id === id ? { ...ele, isCompleted: !ele.isCompleted } : ele))
    }

    const handleDelete = (id: string) => {
        setData(prev => {
            const newTaskList = prev.filter(ele => ele.id !== id);
            return newTaskList;
        })
    }
    return (
        <TaskContext.Provider value={{ handleAdd, data, toggleState, handleDelete }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider

//custom hook
export const useTaskContext = () => {
    const allTaskList = useContext(TaskContext)
    if (!allTaskList) {
        throw new Error("Something is wrong")
    }
    return allTaskList
}
