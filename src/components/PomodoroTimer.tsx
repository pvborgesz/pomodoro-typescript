import {useEffect, useState} from 'react'
import {useInterval } from '../hooks/useInterval'
import {secondsToTime} from '../utils/secondsToTime'
import {Button} from '../components/Button'
import { Timer } from './Timer'

interface Props{
    pomodoroTime:number
    longRestTime:number
    shortRestTime:number
    cycles:number
    status: string
}

export function PomodoroTimer(props:Props) : JSX.Element{
    const [mainTime, setMainTime] = useState(props.pomodoroTime)
    const [timeCounting, setTimeCounting] = useState(false)
    const [working, setWorking] = useState(false)
    const [status, setStatus] = useState('Descansando')

    useEffect( () =>{
        if(mainTime < 0){
            pauseWork()
        }

        if (working) {
            document.body.classList.add('working')
            setStatus('Trabalhando 😡')
        } else {
            document.body.classList.remove('working')
        }
    }, [working, mainTime])

    useInterval(()=>{
        setMainTime(mainTime-1)
    }, timeCounting ? 1000 : null)

    const configureWork: any = () => {
        setMainTime(25*60)
        setStatus('Trabalhando 😡')
        setTimeCounting(true)
        setWorking(true)
    }

    const restartWork: any = () =>{
        setStatus('Descansando 😴')
        setMainTime(props.pomodoroTime)
        setTimeCounting(!timeCounting)
        setWorking(false)
    }

    const pauseWork: any = () => {
        setWorking(false)
        setStatus('Descansando 😴')
        setMainTime(5*60)
        setTimeCounting(!timeCounting)
        setMainTime(props.shortRestTime)
    }

    const longPause: any = () =>{
        setWorking(false)
        setTimeCounting(!timeCounting)
        setMainTime(props.longRestTime)
        setTimeCounting(true)
        setStatus('Descansando 😴')
    }
    return (
        <div className="pomodoro">
            <h2>Você está: {status}</h2> 
            <Timer mainTime={mainTime}></Timer>
            
            <div className="controls">
                
                {(working) ? <Button onClick={ () => pauseWork()} text={'Pause'}></Button> : <Button onClick={ () => configureWork()} text={'Start'}></Button>}
                {/* <Button onClick={ () => longPause()} text="Pausa Longa"></Button> */}
                <Button onClick={ () => restartWork()} text="Reiniciar"></Button>
            </div>

            <div className="details">
                {/* <p> Testando: </p> */}
            </div>
        </div>
    )
}