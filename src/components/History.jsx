import { useEffect, useState } from "react";
import './component.css';

function History() {
  const [journals, setJournals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    // Fetch data from the Flask API endpoint
    fetch('http://localhost:5000/api/journals')
      .then(response => response.json())
      .then(data => setJournals(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Calculate the index range for the current page
  let indexOfLastItem = 0;
  let indexOfFirstItem = 0;
  let currentItems = [];

  if (journals) {  // Check if journals is truthy before accessing it
    indexOfLastItem = currentPage * itemsPerPage;
    indexOfFirstItem = indexOfLastItem - itemsPerPage;
    currentItems = journals.slice(indexOfFirstItem, indexOfLastItem);
    console.log('currentItems', currentItems);
  }
 

  return (
    <>
      <div className="inputArea">
        <div className="resArea">
          {currentItems.map(journal => (
            <div key={journal._id} id="history_info">
              {journal.formatted_date}<br></br>{journal.input_text}
            </div>
          ))}
        </div>
        <div className="pagination">
          <button className="pageBtn" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            previous
          </button>
          <span> Page {currentPage} </span>
          <button className="pageBtn" onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastItem >= journals.length}>
            next
          </button>
        </div>
      </div>
    </>
  );
}

export default History;