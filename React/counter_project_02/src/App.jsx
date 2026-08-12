import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


function App() {
  
  let [count , setcounter] = useState(13) 
  // console.log("click" , Math.random());
  // let count = 14
  
  const addvalue = () => { 
  console.log("click" , count);
  if(count < 0 ) setcounter(count + 1)

}
const removevalue = () => {
  if(count > 0 ) setcounter(count - 1)
} 

  return (
    <>
      <section id="center"> 
         <h1>Counter</h1>

      
        <h3> count is : {count} </h3>
      
        <button onClick= {addvalue}  >Add count</button>
      
        <button onClick={removevalue} >Dec count</button>
      
      </section>
      </>
  )
}

export default App
