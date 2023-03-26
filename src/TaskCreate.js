import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { createTask } from "./store";


const TaskCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const[name,setName] = useState('');
    const[isComplete,setisComplete] = useState(false);
    const[priority,setPriority] = useState(5);
    const create = async(ev) => {
        ev.preventDefault()
        try{
            await dispatch(createTask({name,isComplete,priority}))
            navigate('/')
        }
        catch(ex){
            console.log(ex)
        }
    }
    const priorities = []
    for(let i = 1; i <= 20; i++){
        priorities.push(i)
    }
    return (
        <form onSubmit={ create }>
            <input value={name} onChange = {ev => setName(ev.target.value)}/>
            <input type={"checkbox"} checked={isComplete} onChange = {ev => setisComplete(ev.target.checked)}/>
            <select value={priority} onChange = {ev => setPriority(ev.target.value)}>
                {
                    priorities.map(p => {
                        return (
                            <option key={p}>{p}</option>
                        )
                    })
                }
            </select>
            <button>Create a task</button>
        </form>
    )
}

export default TaskCreate;