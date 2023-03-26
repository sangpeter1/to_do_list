import React from "react";
import {Routes,Route,Link} from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTasks } from "./store";
import Tasks from './Tasks';
import TaskEdit from './TaskEdit';
import TaskCreate from './TaskCreate';
import TasksPending from './TasksPending';


const App = () => {
    const {tasks} = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTasks())
    },[])

    return (
        <div>
            <Link to='/'><h1>Tasks({tasks.length})</h1></Link>
            <nav>
                <Link to='/tasks/create'>Create a Task</Link>
                <Link to='/tasks/pending'>Pending Tasks</Link>
            </nav>
            <Routes>
                <Route path="/"  element={<Tasks/>}/>
                <Route path="/tasks/create"  element={<TaskCreate/>}/>
                <Route path="/tasks/pending"  element={<TasksPending/>}/>
                <Route path="/tasks/:id"  element={<TaskEdit/>}/>
            </Routes>
        </div>
    )

}

export default App;