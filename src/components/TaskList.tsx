import { useEffect, useState } from "react"
import { useTaskContext } from "./TaskProvider"
import { IconButton, Stack } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

type TaskListProp = {
    category: string
}

const TaskList = ({ category }: TaskListProp) => {
    // const  useContext(TaskContext)
    const { data, toggleState, handleDelete } = useTaskContext()
    const [filtrtedTask, setFiltratedTask] = useState(data)
    useEffect(() => {
        if (category === "all") {
            setFiltratedTask(data);
        } else if (category === "complete") {
            setFiltratedTask(data.filter((ele) => ele.isCompleted));
        } else {
            setFiltratedTask(data.filter(ele => !ele.isCompleted));
        }
    }, [data, category]);

    return (
        <div>
            {
                filtrtedTask?.map(ele => <div key={ele.id} className="bg-slate-100 p-2 rounded my-1 flex justify-between items-center gap-2 min-h-16">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <input type="checkbox" checked={ele.isCompleted} onChange={() => toggleState(ele.id)} />
                        {
                            ele.isCompleted ? <del className="text-red-400"> <p> {ele.task} </p> </del> : <p>{ele.task}</p>
                        }
                    </Stack>
                    {
                        ele.isCompleted && <IconButton aria-label="delete" size="small" onClick={() => handleDelete(ele.id)}>
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    }
                </div>)
            }
        </div>
    )
}

export default TaskList