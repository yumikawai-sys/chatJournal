import './App.css'
import { useRef } from 'react'
import GetResponse from './components/GetResponse'
import TopMenu from './components/TopMenu'
import SideCalendar from './components/SideCalendar'

function App() {
  const homeRef = useRef()
  const historyRef = useRef()
  const statsRef = useRef()
  const eventRef = useRef()


  return (
    <>
      <TopMenu home={homeRef} history={historyRef} stats={statsRef} event={eventRef} />
      <div className='Main'>
        <SideCalendar />
        <div className='InputSection'>
          <GetResponse />
        </div>
      </div>
    </>
  )
}

export default App
