import './component.css'
import PropTypes from "prop-types";

export default function TopMenu({home, history, stats, event}) {

  const goTo = (reference) => {
      window.scrollTo({
        top: reference.current.offsetTop - 50,
        behavior: 'smooth',
      });
    };

return (
  
      <div className="topmenu" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      
          {/* menu items */}
          <ul style={{ display: 'flex', listStyle:'none'}}>
            <li style={{margin:'20px'}} onClick={(e)=> {e.preventDefault(); goTo(home)}}>Home</li>
              <li style={{margin:'20px'}} onClick={(e)=> {e.preventDefault(); goTo(history)}}>History</li>
              <li style={{margin:'20px'}} onClick={(e)=> {e.preventDefault(); goTo(stats)}}>Stats</li>
              <li style={{margin:'20px'}} onClick={(e)=> {e.preventDefault(); goTo(event)}}>Event</li>
          </ul>

      </div>
  
)
}
TopMenu.propTypes = {
  home: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
  stats: PropTypes.any.isRequired,
  event: PropTypes.any.isRequired,
};