import {createContext, useContext} from 'react'

export const Todocontext = createContext({
    todos: [
        {
            id: 1,
            task:"todo msg",
            completed: false,
        }
    ],
    addtask: (task) => {},
    updatetask: (id , task) => {},
    deletetask: (id) => {},
    togglecomplete: (id) => {}
})

export const useTodo = () => {
    return useContext(Todocontext)
}

export const Todoprovider = Todocontext.Provider