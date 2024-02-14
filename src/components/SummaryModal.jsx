// SummaryModal.js
import PropTypes from "prop-types";

function SummaryModal({ show, summary, onClose }) {
    return (
        show && (
            <div className="summaryModal">
                <div className="summaryContent">
                    <h4>Your Journal</h4>
                    <p>{summary}</p>
                    <button id="closeBtn" onClick={onClose}>Close</button>
                </div>
            </div>
        )
    );
}

SummaryModal.propTypes = {
    show: PropTypes.bool.isRequired,
    summary: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};
export default SummaryModal;
