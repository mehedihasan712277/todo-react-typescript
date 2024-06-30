import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useContext, useState } from 'react';
import { TaskContext } from './TaskProvider';
const Body = () => {
    const [task, setTask] = useState("")
    const data = useContext(TaskContext)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        data?.handleAdd(task);
        setTask("");
    }

    return (
        <div>
            <form className='bg-slate-100 p-4 rounded w-fit mx-auto space-x-3' onSubmit={handleSubmit}>
                <input type="text" className='p-2' value={task} onChange={(e) => setTask(e.target.value)} />
                <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} type="submit">
                    Add
                </Button>
            </form>
        </div>
    )
}

export default Body