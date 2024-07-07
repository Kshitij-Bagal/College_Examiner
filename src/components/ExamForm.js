import React, { useState, useEffect, useRef } from 'react';
import QuestionCube from './QuestionCube';
import Timer from './Timer';
import base from './airtableConfig';
import { useUser } from '../utils/UserContext'; 
import '../styles/ExamForm.css';

const ExamForm = ({ location }) => {
  const { userName, userRole, college, batch } = useUser() || {};
  const [formList, setFormList] = useState([]);
  const [formData, setFormData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [timerDuration, setTimerDuration] = useState(0);
  const formRef = useRef(null);
  const username = localStorage.getItem('username');
  useEffect(() => {
    if (userRole) {
      fetchForms();
    }
  }, [userRole, college, batch]); 

  const fetchForms = async () => {
    try {
      let records;

      if (userRole === 'Admin' || userRole === 'Teacher') {
        records = await base('Forms').select({
          filterByFormula: '{Publish} = TRUE()',
        }).all();
      } else {
        records = await base('Forms').select({
          filterByFormula: `AND({Publish} = TRUE(), {College} = '${college}', FIND('${batch}', {Batch}) > 0)`,
        }).all();
      }

      const formattedForms = records.map(record => ({
        id: record.id,
        formName: record.fields.FormName,
        formData: JSON.parse(record.fields.FormData),
      }));

      setFormList(formattedForms);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
    console.log();
  };

  const handleSelectForm = (form) => {
    setFormData({
      ...form,
      formData: form.formData.formData
    });
    setTimerDuration((form.formData.formData.length) * 60);
  };

  useEffect(() => {
    const allAnswered = formData?.formData?.length === Object.keys(answers).length;
    setIsFormComplete(allAnswered);
  }, [answers, formData]);

  const handleSubmitAnswer = () => {
    const question = formData?.formData[currentQuestionIndex];
    const answer = document.querySelector('input[name="answer"]:checked')?.value || document.querySelector('input[name="answer"]')?.value;
    if (!answer) {
      alert('Please provide an answer before submitting.');
      return;
    }
    setAnswers({
      ...answers,
      [currentQuestionIndex]: {
        question: question.question,
        answer
      }
    });
    const nextIndex = getNextActiveIndex(currentQuestionIndex);
    setCurrentQuestionIndex(nextIndex);
  };

  const getNextActiveIndex = (currentIndex) => {
    let nextIndex = currentIndex + 1;
    while (nextIndex < (formData?.formData?.length || 0)) {
      if (!answers[nextIndex]) {
        return nextIndex;
      }
      nextIndex++;
    }
    return currentIndex;
  };

  const handleFormSubmit = async () => {
    if (!username) {
      console.error('userName is undefined or null.');
      return;
    }
    const jsonData = JSON.stringify({
      username,
      name: formData.formName,
      answers
    }, null, 2);

    try {
      await base('Answers').create({
        UserName: username,
        FormName: formData.formName,
        Answer: jsonData,
        Result: ''
      });
      alert('Form submitted successfully.');
      console.log('Form submitted successfully.');
      clearSelectedForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the form.');
    }
  };

  const clearSelectedForm = () => {
    setFormData(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimerDuration(0);
  };

  if (!formData) {
    return (
      <div>
        <h2>Available Forms:</h2>
        {formList.length === 0 ? (
          <p>No forms available</p>
        ) : (
          <div className="form-list">
            {formList.map(form => (
              <div key={form.id} className="form-item" onClick={() => handleSelectForm(form)}>
                {form.formName}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (!formData.formData || !formData.formData.length) {
    return <p>No questions found.</p>; 
  }

  const question = formData?.formData[currentQuestionIndex];

  return (
    <div ref={formRef}>
      <Timer duration={timerDuration} onTimeUp={() => { }} />
      <div className="header">
        <div className="username">Logged in as: {username}</div>
        {formData && formData.formName && (
          <div className="form-name">Form Name: {formData.formName}</div>
        )}
      </div>
      <div className="question-section">
        <div className="cubes-container">
          {formData.formData && Array.isArray(formData.formData) && formData.formData.map((question, index) => (
            <QuestionCube
              key={index}
              index={index}
              isActive={index === currentQuestionIndex}
              isAnswered={answers[index]}
              onClick={() => setCurrentQuestionIndex(index)}
              isAnsweredColor="green"
            />
          ))}
        </div>
        <div className="question-container">
          <fieldset>
            <legend>{question?.type}</legend>
            <p>{question?.question}</p>
            {question?.type === 'Short Answer' && (
              <input type="text" name="answer" />
            )}
            {(question?.type === 'Multiple Choice' || question?.type === 'True/False') && question?.answers.map((answer, i) => (
              <div className='radio_group_in_exam' key={i}>
                <input className='radio_in_exam' type="radio" name="answer" value={answer} />
                <label className='label_in_radio '>{answer}</label>
              </div>
            ))}
          </fieldset>
        </div>
        <div className="navigation-buttons">
          <button disabled={currentQuestionIndex === 0} onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>Previous</button>
          <button onClick={handleSubmitAnswer}>Submit Answer</button>
          <button disabled={currentQuestionIndex === (formData?.formData?.length || 0) - 1} onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>Next</button>
        </div>
      </div>
      {isFormComplete && (
        <button onClick={handleFormSubmit}>Submit Form</button>
      )}
    </div>
  );
};

export default ExamForm;
