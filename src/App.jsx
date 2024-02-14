import './App.css'
import GetResponse from './components/GetResponse'
import TopMenu from './components/TopMenu'
import SideCalendar from './components/SideCalendar'
// import InputMessage from './components/InputMessage'

function App() {

  return (
    <>
      <TopMenu />
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
