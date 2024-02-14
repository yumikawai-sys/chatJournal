import './App.css'
import { useRef } from 'react'
import GetResponse from './components/GetResponse'
// import TopMenu from './components/TopMenu'
import SideCalendar from './components/SideCalendar'

function App() {
  const diaryRef = useRef()
  const statsRef = useRef()

  return (
    <>
      {/* <TopMenu diary={diaryRef} stats={statsRef}  /> */}
      <div className='Main'>
        <SideCalendar diary={diaryRef} stats={statsRef} />
        <div className='InputSection'>
          <GetResponse />
        </div>
      </div>
    </>
  )
}

export default App
