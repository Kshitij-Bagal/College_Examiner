// addShortAnswerQuestion.js

import { createFieldset, addPreviewButtonListener } from './fieldset'; // Import necessary functions from fieldset.js

const addShortAnswerQuestion = (builderAreaRef, addToPreview) => {
  const fieldset = createFieldset('Short Answer'); // Create fieldset with legend text

  // Create elements for question and answer inputs
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

  // Append elements to fieldset
  fieldset.appendChild(questionInputGroup);
  fieldset.appendChild(answerInputGroup);

  // Create "Add to Preview" button
  const addButton = document.createElement('button');
  addButton.className = 'add-to-preview';
  addButton.textContent = 'Add to Preview';
  addButton.addEventListener('click', () => {
    addToPreview(fieldset);
    addButton.remove();
  });

  fieldset.appendChild(addButton); // Append button to fieldset

  builderAreaRef.current.appendChild(fieldset); // Append fieldset to builderAreaRef
  addPreviewButtonListener(fieldset, addToPreview); // Attach preview button listener
};

export default addShortAnswerQuestion;
