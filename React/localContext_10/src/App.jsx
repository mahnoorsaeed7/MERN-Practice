import { useState ,useEffect } from 'react'
import './App.css'
import  Todoform  from './components/Todoform'
import  Todoitem  from './components/Todoitem'
import { Todoprovider } from './context/Todocontext'


function App() {
    const [tasks, settasks] = useState([])

    const addtask = (task) => {
        settasks((prevTasks) => [{id: Date.now(), ...task}, ...prevTasks])
    }

    const updatetask = (id, task) => {
        settasks((prevTasks) => prevTasks.map((prevTask) => (prevTask.id === id ? task : prevTask)))
    }

    const deletetask = (id) => {
        settasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    }

    const togglecomplete = (id) => {
       settasks((prevTasks) => prevTasks.map((prevTask) => prevTask.id === id ? {...prevTask, completed: !prevTask.completed} : prevTask))
    }
    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem('tasks'))
        if (tasks && tasks.length > 0) {
            settasks(tasks)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])
    return (
    <Todoprovider value={{tasks, addtask, updatetask, deletetask, togglecomplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <Todoform />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {tasks.map((task) => (
                          <div key={task.id}
                          className='w-full'
                          >
                            <Todoitem task={task} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </Todoprovider>
  )

}

export default App
