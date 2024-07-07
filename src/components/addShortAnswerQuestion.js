// addShortAnswerQuestion.js

import { createFieldset, addPreviewButtonListener } from './fieldset'; 

const addShortAnswerQuestion = (builderAreaRef, addToPreview) => {
  const fieldset = createFieldset('Short Answer'); 

  const questionInputGroup = document.createElement('div');
  questionInputGroup.className = 'input-group';
  questionInputGroup.innerHTML = `
    <label>Question:</label>
    <input type="text" placeholder="Enter your question here" class="question">
  `;

  const answerInputGroup = document.createElement('div');
  answerInputGroup.className = 'input-group';
  answerInputGroup.innerHTML = `
    <label>Answer:</label>
    <input type="text" placeholder="Answer">
  `;

  fieldset.appendChild(questionInputGroup);
  fieldset.appendChild(answerInputGroup);

  const addButton = document.createElement('button');
  addButton.className = 'add-to-preview';
  addButton.textContent = 'Add to Preview';
  addButton.addEventListener('click', () => {
    addToPreview(fieldset);
    addButton.remove();
  });

  fieldset.appendChild(addButton);

  builderAreaRef.current.appendChild(fieldset); 
  addPreviewButtonListener(fieldset, addToPreview); 
};

export default addShortAnswerQuestion;
