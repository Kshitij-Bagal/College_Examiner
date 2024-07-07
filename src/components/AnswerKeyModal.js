// src/components/AnswerKeyModal.js

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const AnswerKeyModal = ({ isOpen, onRequestClose, form, answerKeyData, handleSaveAnswerKey }) => {
  const [answerKey, setAnswerKey] = useState(answerKeyData); 

  useEffect(() => {
    setAnswerKey(answerKeyData);
  }, [answerKeyData]);
  console.log('AnswerKeyModal form data:', form); 
  const handleAnswerChange = (questionIndex, answer) => {
    setAnswerKey(prevKey => ({
      ...prevKey,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = () => {
    handleSaveAnswerKey(form.id, answerKey);
    onRequestClose();
  };

  if (!Array.isArray(form.formData)) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>{form.formName} - Answer Key</h2>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Options</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {form.formData.map((question, index) => (
            <tr key={index}>
              <td>{question.question}</td>
              <td>
                {Array.isArray(question.answers) ? (
                  question.answers.map((option, idx) => (
                    <div key={idx}>{option}</div>
                  ))
                ) : (
                  <div>No options available</div>
                )}
              </td>
              <td>
                <input
                  type="text"
                  value={answerKey[index] || ''}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit}>Save</button>
    </Modal>
  );
};

export default AnswerKeyModal;
