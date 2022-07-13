import { useState } from 'react'
import './App.css'
import { PomodoroTimer } from './components/PomodoroTimer'

function App() : JSX.Element {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container">
        <PomodoroTimer pomodoroTime={1500} longRestTime={900} shortRestTime={300} cycles={4} status={'Descansando'}/>
      </div>
      <div className="footer">
            <p>
                <a href="https://github.com/pvborgesz">Desenvolvido por Paulo Victor Borges</a>
            </p>
      </div>
    </>
  )
}

export default App