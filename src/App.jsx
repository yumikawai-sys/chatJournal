import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Toppage from './components/Toppage';
import SideCalendar from './components/SideCalendar';
import GetResponse from './components/GetResponse';
import History from './components/History';
import Stats from './components/Stats';
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
        <div className="InputSection" style={{ height: '800px' }}>{children}</div>
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
      </Routes>
    </Router>
  );
}

export default App;

// function App() {
//   return (
//     <Router>
//       <>
//         <Routes>
//           <Route path="/" element={<Toppage />}>
//             <Route index element={<SideCalendar />} />
//           </Route>
//           <Route path="/getResponse" element={<GetResponse />} />
//           <Route path="/calendar" element={<Calendar />} />
//           <Route path="/stats" element={<Stats />} />
//           {/* <div className='Main'>
//             <SideCalendar />
//             <div className='InputSection'>
//                 <Route path="/getResponse" component={GetResponse} />
//                 <Route path="/calendar" component={Calendar} />
//                 <Route path="/stats" component={Stats} />
//             </div>
//           </div> */}
//         </Routes>
//       </>
//     </Router>
//   );
// }

// export default App;
