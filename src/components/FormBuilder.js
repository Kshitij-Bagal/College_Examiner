// src/components/FormBuilder.js

import React, { useState, useRef, useEffect  } from 'react';
import uploadToAirtable from '../utils/AirtableUploader';
import addShortAnswerQuestion from './addShortAnswerQuestion';
import addMCQQuestion from './addMCQQuestion';
import addTrueFalseQuestion from './addTrueFalseQuestion';
import '../styles/FormBuilder.css';
import Airtable from 'airtable';
// import DropboxOAuth from './DropboxOAuth';
// import uploadToDropbox from '../utils/DropboxUploader';

const FormBuilder = () => {
  const builderAreaRef = useRef(null);
  const [formName, setFormName] = useState('');
  const [formData, setFormData] = useState([]);
  const [batch, setBatch] = useState('');
  const [college, setCollege] = useState('');
  const [userCollege, setUserCollege] = useState('');
  useEffect(() => {
    const base = new Airtable({ apiKey: 'patmR9viVXmX3PJAw.71eebdadd0da2fb125650748e7e07b574b6d1a90643cb2f0baade97c33cf4c86' }).base('appmyBUPyd7QLQcwp');
    const username = localStorage.getItem('username');
    base('Users').select({
      filterByFormula: `{UserName} = '${username}'`,
    }).firstPage().then((records) => {
      if (records.length > 0) {
        const user = records[0].fields;
        setUserCollege(user.College); 
        console.log(user.College)
      }
    }).catch(err => console.error('Error fetching user details:', err));
  }, []);
  const addShortAnswerQuestionHandler = () => {
    addShortAnswerQuestion(builderAreaRef, addToFormData);
  };

  const addMCQQuestionHandler = () => {
    addMCQQuestion(builderAreaRef, addToFormData);
  };

  const addTrueFalseQuestionHandler = () => {
    addTrueFalseQuestion(builderAreaRef, addToFormData);
  };

  const addToFormData = (questionData) => {
    setFormData(prevData => [...prevData, questionData]);
    
  };
  
  const convertFormDataToJson = () => {
    const formElements = document.getElementById('previewArea').querySelectorAll('.fieldset');
    const formName = document.getElementById('formName').value.trim();
    if (!formName) {
      alert('Please enter a form name');
      return;
    }
    const formData = {
      formName: formName,
      formData: []
    };
    formElements.forEach(fieldset => {
      const legend = fieldset.querySelector('.legend').textContent;
      const questionText = fieldset.querySelector('label').textContent;

      let answers = [];
      if (legend === 'Short Answer') {
        const answerInput = fieldset.querySelector('input[type="text"]');
        answers.push(answerInput.value);
      } else if (legend === 'Multiple Choice' || legend === 'True/False') {
        const optionLabels = fieldset.querySelectorAll('label');
        optionLabels.forEach((label, index) => {
          if (index > 0) { // Skip the first label as it contains the question text
            answers.push(label.textContent.trim());
          }
        });
      }
      formData.formData.push({
        type: legend,
        question: questionText,
        answers: answers
      });
    });
    const jsonData = JSON.stringify(formData, null, 2);
    console.log(jsonData); 
    return formData;
  };

  const handleSubmit = async () => {
    
    const jsonFormData = convertFormDataToJson();
    if (jsonFormData) {
      try {
        // const formUri = await uploadToDropbox(accessToken, formName, jsonFormData);
        await uploadToAirtable(formName, localStorage.getItem('username'), jsonFormData, batch, userCollege);
        console.log('Form data saved successfully.');
        alert('Form saved successfully!');
      } catch (error) {
        console.error('Error saving form data:', error);
        alert('Failed to save form.');
      }
    }
  };
  
  // const handleDropboxAuth = (token) => {
  //   console.log('Received access token:', token); // Debugging line
  //   // setAccessToken(token);
  // };

  return (
    <div className="container">
      <div id="builderArea" className="form-builder" ref={builderAreaRef}>
        <h2>Form Builder</h2>
        <div className="controls">
          <button id="addShortAnswer" onClick={addShortAnswerQuestionHandler}>
            Add Short Answer
          </button>
          <button id="addMCQ" onClick={addMCQQuestionHandler}>
            Add MCQ
          </button>
          <button id="addTrueFalse" onClick={addTrueFalseQuestionHandler}>
            Add True/False
          </button>
        </div>
      </div>
      <div id="previewArea" className="form-preview">
        <h2>Form Preview</h2>
        <label htmlFor="formName">Form Name:</label>
        <input
          type="text"
          id="formName"
          placeholder="Enter form name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
        <br />
        <label htmlFor="selectBatch">Select Batch:</label>
        <select
          id="selectBatch"
          className='selectBatch'
          name="batch"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          required
        >
          <option value="" defaultValue>Select Batch</option>
          <option value="B.CS-F.Y">B.CS-F.Y</option>
          <option value="B.CS-S.Y">B.CS-S.Y</option>
          <option value="B.CS-T.Y">B.CS-T.Y</option>
          <option value="M.CS-F.Y">M.CS-F.Y</option>
          <option value="M.CS-S.Y">M.CS-S.Y</option>
        </select>
        <br />
        <button onClick={handleSubmit}>Save Form</button>
      </div>
    </div>
  );
};

export default FormBuilder;



















































 // const handleSubmit = async () => {
    // const jsonFormData = saveFormToJson(formName, formData);
    // if (jsonFormData) {
      // try {
        // await saveFormToJson(jsonFormData, localStorage.getItem('username'));
        // console.log(jsonFormData);  
        // alert(JSON.stringify(jsonFormData, null, 2));
        // const formUri = await uploadToDropbox(formName, jsonFormData);
        // console.log('Form URI:', formUri);
        // const formUri = await uploadToDropbox(accessToken, formName, jsonFormData);
        // await uploadToAirtable(formName, localStorage.getItem('username'), formUri, jsonFormData);
        // console.log('Form data saved successfully.');
        // alert('Form saved successfully!');
  //     } catch (error) {
  //       console.error('Error saving form data:', error);
  //       alert('Failed to save form.');
  //     }
  //   }
  // };

  
  // const convertFormDataToJson = () => {
  //   const formElements = document.getElementById('previewArea').querySelectorAll('.fieldset');
  //   const formName = document.getElementById('formName').value.trim();

  //   if (!formName) {
  //     alert('Please enter a form name');
  //     return;
  //   }

  //   const formData = {
  //     formName: formName,
  //     formData: []
  //   };

  //   formElements.forEach(fieldset => {
  //     const legend = fieldset.querySelector('.legend').textContent;
  //     const questionText = fieldset.querySelector('label').textContent;

  //     let answers = [];
  //     if (legend === 'Short Answer') {
  //       const answerInput = fieldset.querySelector('input[type="text"]');
  //       answers.push(answerInput.value);
  //     } else if (legend === 'Multiple Choice') {
  //       const optionLabels = fieldset.querySelectorAll('label');
  //       optionLabels.forEach(label => {
  //         answers.push(label.textContent.trim());
  //       });
  //     } else if (legend === 'True/False') {
  //       const trueFalseLabels = fieldset.querySelectorAll('label');
  //       trueFalseLabels.forEach(label => {
  //         answers.push(label.textContent.trim());
  //       });
  //     }

  //     formData.formData.push({
  //       type: legend,
  //       question: questionText,
  //       answers: answers
  //     });
  //   });


  //   const jsonData = JSON.stringify(formData, null, 2);
  //   console.log(jsonData); 
  // };