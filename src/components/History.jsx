import { useEffect, useState } from "react";
import './component.css';

function History() {
  const [journals, setJournals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [indexOfLastItem, setIndexOfLastItem] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const itemsPerPage = 3;

  useEffect(() => {
    // Fetch data from the Flask API endpoint
    fetch('http://localhost:5000/api/journals')
      .then(response => response.json())
      .then(data => setJournals(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

    // Calculate the index range for the current page
  if (!journals) {
    setIndexOfLastItem(currentPage * itemsPerPage);
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(journals.slice(indexOfFirstItem, indexOfLastItem));
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