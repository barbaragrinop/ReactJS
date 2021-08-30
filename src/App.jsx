import React, { useEffect, useState } from 'react';
import './App.css';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
import {v4 as uuidv4} from 'uuid';
import Header from './components/Header';
import{BrowserRouter as Router, Route} from 'react-router-dom';
import TaskDetails from './components/TaskDetails';
import axios from 'axios';

const App = () => {
  // const message = 'Hello Wold';
  const [tasks, setTasks] = useState([
    {id: "1", title: "Estudar programação", completed: false},
    {id: "2", title: "Ler livros", completed: true},
    {id: "3", title: "Fazer mudança", completed: false}
  ]);

  useEffect(() => {
    const fetchTasks = async () =>{
      const {data} = await axios.get(
        'https://jsonplaceholder.cypress.io/todos?_limit=10'
        );
        setTasks(data);
      };
      fetchTasks();
    }, []);

  const handleTaskClick = (taskId) => {
    const newTask = tasks.map(task => {
      if(task.id === taskId) return {...task, completed: !task.completed}
      return task;
    });
    
    setTasks(newTask);
  }


  const handleTaskAddition = (taskTitle) => {
    const newTasks = [
      ...tasks,
      {
        title: taskTitle,
        id: uuidv4(),
        completed: false
      }
    ];
    setTasks(newTasks);
  };

  const handleTaskDeletion = (taskid) =>{
    const newTasks = tasks.filter((task) => task.id !== taskid);
		setTasks(newTasks);
  }
  
  return (
    <Router>
      <div className="container">
        <Header />
        <Route 
          path="/" exact 
          render = {() => (
            <>
              <AddTask handleTaskAddition={handleTaskAddition} />
              <Tasks tasks={tasks} 
              handleTaskClick={handleTaskClick} 
              handleTaskDeletion={handleTaskDeletion} /> 
            </>
        )} />
        <Route path="/:taskTitle" exact component={TaskDetails}/>
      </div> 
    </Router>
  )
}

export default App;