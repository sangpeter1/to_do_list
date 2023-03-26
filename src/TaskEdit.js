import React, { useEffect, useState } from "react";
import { updateTask } from "./store";
import { useDispatch,useSelector} from "react-redux";
import { useNavigate,useParams } from "react-router-dom";


const TaskEdit = () => {
    const{tasks} = useSelector(state => state)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [name,setName] = useState('');
    const [isComplete,setisComplete] = useState(false);
    const [priority,setPriority] = useState(5);
    useEffect(() => {
        const task = tasks.find(task => task.id === id)
        if(task){
            setName(task.name)
            setisComplete(task.isComplete)
            setPriority(task.priority)
        }
    },[tasks])

    const update = async(ev) => {
        ev.preventDefault()
        await dispatch(updateTask({id,name,isComplete,priority}))
        navigate('/')
    }

    const priorities = []
    for(let i = 1; i <= 20; i++){
        priorities.push(i)
    }
    return(
        <form onSubmit={ update }>
            <input value={name} onChange = {ev => setName(ev.target.value)}/>
            <input type={"checkbox"} checked = {isComplete} onChange = {ev => setisComplete(ev.target.checked)}/>
            <select value={priority} onChange = {ev => setPriority(ev.target.value)}>
                {
                    priorities.map(p => {
                        return (
                            <option key={p}>{p}</option>
                        )
                    })
                }
            </select>
            <button>Update</button>
        </form>
    )

}

export default TaskEdit;