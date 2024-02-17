import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Toppage from './components/Toppage';
import SideCalendar from './components/SideCalendar';
import GetResponse from './components/GetResponse';
import History from './components/History';
import Stats from './components/Stats';
import MyCalendar from './components/MyCalendar';
import './App.css'

// Import necessary dependencies
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// Add the icons to the library
library.add(fas, far, fab);

function SharedLayout({ children }) {
  return (
    <>
      <div className="Main">
        <SideCalendar />
        <div className="InputSection" style={{ height: '720px' }}>{children}</div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Toppage />} />
        <Route
          path="/getResponse"
          element={
            <SharedLayout>
              <GetResponse />
            </SharedLayout>
          }
        />
        <Route
          path="/history"
          element={
            <SharedLayout>
              <History />
            </SharedLayout>
          }
        />
        <Route
          path="/stats"
          element={
            <SharedLayout>
              <Stats />
            </SharedLayout>
          }
        />
        <Route
          path="/calendar/:current_date"
          element={
            <SharedLayout>
              <MyCalendar />
            </SharedLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

