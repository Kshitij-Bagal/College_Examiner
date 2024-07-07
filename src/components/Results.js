import React, { useState, useEffect } from 'react';
import base from './airtableConfig';
import Modal from 'react-modal';
import { useUser } from '../utils/UserContext';
import '../styles/Results.css';

const Results = () => {
  const user = useUser();
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answerKey, setAnswerKey] = useState({});
  const [results, setResults] = useState({});
  const [modalView, setModalView] = useState('answerKey'); // 'answerKey' or 'results'

  useEffect(() => {
    if (user.username) {
      fetchForms();
    }
  }, [user]);

  const fetchForms = async () => {
    try {
      let filterFormula = `{Publish} = TRUE()`;
      if (user.userRole === 'Teacher') {
        filterFormula = `AND({CreatedBy} = '${user.username}', {Publish} = TRUE())`;
      } else if (user.userRole === 'Admin' || user.userRole === 'Student') {
        filterFormula = `AND({College} = '${user.college}', {Publish} = TRUE())`;
      }

      const records = await base('Forms').select({
        filterByFormula: filterFormula,
      }).all();

      const formattedForms = records.map(record => {
        try {
          const formData = JSON.parse(record.fields.FormData);
          return {
            id: record.id,
            formName: record.fields.FormName,
            createdBy: record.fields.CreatedBy,
            formData: formData,
            answerKey: record.fields.AnswerKey ? JSON.parse(record.fields.AnswerKey) : {},
          };
        } catch (error) {
          console.error('Error parsing FormData for record:', record.id, 'FormData:', record.fields.FormData, error);
          return null;
        }
      }).filter(form => form !== null);

      setForms(formattedForms);
    } catch (error) {
      console.error('Error fetching forms:', error);
      alert('Failed to fetch forms. Please try again later.');
    }
  };

  const handleSaveAnswerKey = async (formId, updatedAnswerKey) => {
    try {
      // Update AnswerKey in Forms table
      await base('Forms').update([
        {
          id: formId,
          fields: {
            AnswerKey: JSON.stringify(updatedAnswerKey),
          },
        },
      ]);

      // Fetch form name to find related answers
      const formRecord = await base('Forms').find(formId);
      const formName = formRecord.fields.FormName;

      // Fetch answers for this form
      const answerRecords = await base('Answers').select({
        filterByFormula: `{FormName} = '${formName}'`,
      }).all();

      // Update AnswerKey and calculate results for each student
      for (const record of answerRecords) {
        // Parse studentAnswers correctly
        const studentAnswers = JSON.parse(record.fields.Answer);

        console.log(`Student answers for ${record.fields.UserName}:`, studentAnswers);

        let score = 0;
        let totalQuestions = 0;

        const answers = studentAnswers.answers;

        Object.keys(updatedAnswerKey).forEach(questionIndex => {
          totalQuestions += 1;
          const questionId = parseInt(questionIndex); // Convert questionIndex to integer

          // Compare student's answer with answer key
          const studentAnswer = answers[questionIndex]?.answer || '';
          const correctAnswer = updatedAnswerKey[questionIndex]?.answer || '';

          console.log(`Comparing student's answer (${studentAnswer}) with correct answer (${correctAnswer})`);

          // Convert both answers to lowercase for case-insensitive comparison
          if (studentAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            score += 1;
            console.log('Correct!');
          } else {
            console.log('Incorrect.');
          }
        });

        const percentage = (score / totalQuestions) * 100;

        // Update Result in Answers table
        await base('Answers').update([
          {
            id: record.id,
            fields: {
              AnswerKey: JSON.stringify(updatedAnswerKey),
              Result: percentage.toFixed(2), // Store the calculated percentage score
            },
          },
        ]);
      }

      alert('Answer key and results saved successfully.');
      fetchForms(); // Refresh forms to update the answer key
    } catch (error) {
      console.error('Error saving answer key and results:', error);
      alert('Failed to save the answer key and results.');
    }
  };

  const openModal = (form, view) => {
    setSelectedForm(form);
    setAnswerKey(form.answerKey || {});
    setModalView(view);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedForm(null);
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <h2>Results</h2>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {forms.length === 0 ? (
          <p>No forms available</p>
        ) : (
          <table className="forms-table">
            <thead>
              <tr>
                <th>Form Name</th>
                <th>Created By</th>
                <th>Actions</th>
                <th>Results</th>
              </tr>
            </thead>
            <tbody>
              {forms.map(form => (
                <tr key={form.id}>
                  <td>{form.formName}</td>
                  <td>{form.createdBy}</td>
                  <td>
                    <button className="view-button" onClick={() => openModal(form, 'answerKey')}>View Answer Key / Results</button>
                  </td>
                  <td>
                    <button className="view-results-button" onClick={() => openModal(form, 'results')}>View Results</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {selectedForm && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Form Modal"
          ariaHideApp={false} // Add this line to prevent the React-Modal error
        >
          {modalView === 'answerKey' ? (
            <AnswerKeyModal form={selectedForm} answerKey={answerKey} setAnswerKey={setAnswerKey} handleSaveAnswerKey={handleSaveAnswerKey} closeModal={closeModal} />
          ) : (
            <ResultsModal form={selectedForm} results={results} setResults={setResults} closeModal={closeModal} />
          )}
        </Modal>
      )}
    </div>
  );
};

const AnswerKeyModal = ({ form, answerKey, setAnswerKey, handleSaveAnswerKey, closeModal }) => {
  return (
    <>
      <h2>{form.formName} - Answer Key</h2>
      <table className="answer-key-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Options</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {form.formData.formData.length > 0 ? (
            form.formData.formData.map((question, index) => (
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
                    value={answerKey[index]?.answer || ''}
                    onChange={(e) => {
                      const updatedKey = { ...answerKey };
                      updatedKey[index] = { question: question.question, answer: e.target.value };
                      setAnswerKey(updatedKey);
                    }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No questions available</td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="save-button" onClick={() => handleSaveAnswerKey(form.id, answerKey)}>Save Answer Key</button>
      <button className="close-button" onClick={closeModal}>Close</button>
    </>
  );
};

const ResultsModal = ({ form, results, setResults, closeModal }) => {
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const answerRecords = await base('Answers').select({
          filterByFormula: `{FormName} = '${form.formName}'`,
        }).all();

        const formattedResults = answerRecords.map(record => ({
          username: record.fields.UserName,
          answers: JSON.parse(record.fields.Answer),
          result: record.fields.Result,
        }));

        setResults(formattedResults);
      } catch (error) {
        console.error('Error fetching results:', error);
        alert('Failed to fetch results. Please try again later.');
      }
    };

    fetchResults();
  }, [form.formName, setResults]);

  return (
    <>
      <h2>{form.formName} - Results</h2>
      <table className="results-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Answers</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {results.length > 0 ? (
            results.map((result, index) => (
              <tr key={index}>
                <td>{result.username}</td>
                <td>
                  {Object.keys(result.answers.answers).map((key, idx) => {
                    const studentAnswer = result.answers.answers[key].answer;
                    const correctAnswer = form.answerKey[key]?.answer || '';

                    return (
                      <div
                        key={idx}
                        className="answer-item"
                        style={{ color: studentAnswer.toLowerCase() === correctAnswer.toLowerCase() ? 'black' : 'red' }}
                      >
                        <strong>{result.answers.answers[key].question}:</strong> {studentAnswer}
                      </div>
                    );
                  })}
                </td>
                <td>{result.result}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No results available</td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="close-button" onClick={closeModal}>Close</button>
    </>
  );
};


export default Results;
