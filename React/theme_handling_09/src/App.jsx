import { useState , useEffect } from 'react'
import './App.css'
import Card from './components/Card'
import Themebtn from './components/Themebtn'
import { Themeprovider } from './context/theme'

function App() {
  const[thememode , setthememode] = useState("dark")

  const darkmode = () => {
    setthememode("dark")
  }

  const lightmode = () => {
    setthememode("light")
  }

  useEffect(() => {
    document.querySelector("html").classList.remove("dark" , "light")
    document.querySelector('html').classList.add(thememode)
  },[thememode])
  return (
    <Themeprovider value ={{thememode , darkmode  , lightmode}}>
    <div className="flex flex-wrap min-h-screen items-center bg-zinc-50 dark:bg-zinc-950 transition-colors duration-200">
          <div className="w-full">
              <div className="w-full max-w-sm mx-auto flex justify-end mb-4 px-4">
                  <Themebtn />
              </div>

              <div className="w-full max-w-sm mx-auto px-4">
                  <Card />
              </div>
          </div>
      </div>
    </Themeprovider>
  )
}

export default App
