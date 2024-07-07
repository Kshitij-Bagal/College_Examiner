// SaveFormToJson.js

import React from 'react';

const SaveFormToJson = () => {
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
      } else if (legend === 'Multiple Choice') {
        const optionLabels = fieldset.querySelectorAll('label');
        optionLabels.forEach(label => {
          answers.push(label.textContent.trim());
        });
      } else if (legend === 'True/False') {
        const trueFalseLabels = fieldset.querySelectorAll('label');
        trueFalseLabels.forEach(label => {
          answers.push(label.textContent.trim());
        });
      }

      formData.formData.push({
        type: legend,
        question: questionText,
        answers: answers
      });
    });

    // Convert formData to JSON string
    const jsonData = JSON.stringify(formData, null, 2);
    console.log(jsonData); // Display JSON data in console (replace with your desired handling)
  };

  // return (
  //   <div>
  //     <button onClick={convertFormDataToJson}>Convert to JSON</button>
  //   </div>
  // );
};

export default SaveFormToJson;
