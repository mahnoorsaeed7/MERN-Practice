import React , {useState} from 'react'
import { useTodo } from '../context/Todocontext'

function Todoitem({task}) {
    const [istaskeditable, setIstaskeditable] = useState(false)
    const [taskvalue, setTaskvalue] = useState(task.task)
    const { updatetask, deletetask, togglecomplete } = useTodo()

    const editingtask = () => {
        updatetask(task.id , {...task, task: taskvalue}) // in simple words we are updating the task with the new value of taskvalue by calling the updatetask function from the context and passing the id of the task and the new value of taskvalue
        setIstaskeditable(false)
    }

    const toggletaskcomplete = () => {
        togglecomplete(task.id)  // in simple words we are toggling the completed value of the task by calling the togglecomplete function from the context and passing the id of the task
        
    }

   return (
       <div className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${ task.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]" }`} 
       > 
          <input
              type="checkbox"
              className="cursor-pointer"
              checked={task.completed}
              onChange={toggletaskcomplete}
          />
          <input
              type="text"
               className={`border outline-none w-full bg-transparent rounded-lg ${ istaskeditable ? "border-black/10 px-2" : "border-transparent" } ${task.completed ? "line-through" : ""}`} 
              value={taskvalue}
              onChange={(e) => setTaskvalue(e.target.value)}
              readOnly={!istaskeditable}
          />
          {/* Edit, Save Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
              onClick={() => {
                  if (task.completed) return;

                  if (istaskeditable) {
                      editingtask();
                  } else setIstaskeditable(true);
              }}
              disabled={task.completed}
          >
              {istaskeditable ? "📁" : "✏️"}
          </button>
          {/* Delete Todo Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
              onClick={() => deletetask(task.id)}
          >
              ❌
          </button>
      </div>
  );
}

export default Todoitem
