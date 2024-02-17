import { useEffect, useState } from 'react';
import PropTypes from "prop-types";

const Feedback = ({ mood, keywords }) => {
    const [feedback, setFeedback] = useState('');

    function generateFeedbackBasedOnKeywords(mood, keywords) {
        
        // Feedback Rules
        const feedbackRules = {
            POSITIVE: "I am glad to know you are having a great time.",
            NEGATIVE: "It seems tough these days, I am sorry to hear that.",
        };
      
        // Generate Feedback based on Mood and Keywords
        const moodFeedback = feedbackRules[mood] || "No specific feedback for the given mood.";
      
        if (keywords && keywords.length > 0) {
            let keywordsFeedback = "";
            if (mood === 'POSITIVE') {
                keywordsFeedback = `It seems like you are into ${keywords.join(', ')}. I hope you keep up the positive vibes.`;
            } else if (mood === 'NEGATIVE') {
                keywordsFeedback = `It seems like you have been thinking about ${keywords.join(', ')}. Journalling will help you clear your mind.`;
            }   
            setFeedback(`${moodFeedback} ${keywordsFeedback}`);
        }
      }

    useEffect(() => {
        generateFeedbackBasedOnKeywords(mood, keywords)
    },[mood, keywords])

  return (
    <>
        {feedback && <div className='feedback'>{feedback}</div>}
    </>
  )

  
};
Feedback.propTypes = {
    mood: PropTypes.any.isRequired,
    keywords: PropTypes.any.isRequired,
}
export default Feedback;
