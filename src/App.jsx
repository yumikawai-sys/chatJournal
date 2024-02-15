import './App.css'
// import { useRef } from 'react'
import GetResponse from './components/GetResponse'
import SideCalendar from './components/SideCalendar'
import Toppage from './components/Toppage'
import Calendar from './components/Calendar'
import Stats from './components/Stats'

function App() {
  
  return (
    <>
      <Toppage />
      <div className='Main'>
        <SideCalendar />
        <div className='InputSection'>
          
          <GetResponse />
          <Calendar />
          <Stats />
        </div>
      </div>
    </>
  )
}

export default App
