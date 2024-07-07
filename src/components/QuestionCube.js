import React from 'react';


const QuestionCube = ({ index, isActive, isAnswered, onClick, isAnsweredColor }) => {
  return (
    <div
      className={`question-cube ${isActive ? 'active' : ''}`}
      style={{ backgroundColor: isAnswered ? isAnsweredColor : 'initial' }}
      onClick={onClick}
    >
      {index + 1}
    </div>
  );
};

export default QuestionCube;
