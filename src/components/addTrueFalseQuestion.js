// addTrueFalseQuestion.js

import { createFieldset, addPreviewButtonListener } from './fieldset'; // Import necessary functions from fieldset.js

const addTrueFalseQuestion = (builderAreaRef, addToPreview) => {
  const fieldset = createFieldset('True/False'); // Create fieldset with legend text

  // Create elements for question and true/false options
  const questionInputGroup = document.createElement('div');
  questionInputGroup.className = 'input-group';
  questionInputGroup.innerHTML = `
    <label>Question:</label>
    <input type="text" placeholder="Enter your question here" class="question">
  `;

  const trueFalseInputGroup = document.createElement('div');
  trueFalseInputGroup.className = 'input-group';
  trueFalseInputGroup.innerHTML = `
    <label>Options:</label>
    <div class="radio_group">
      <input type="radio" name="truefalse"> True
    </div>
    <div class="radio_group">
      <input type="radio" name="truefalse"> False
    </div>
  `;

  // Append elements to fieldset
  fieldset.appendChild(questionInputGroup);
  fieldset.appendChild(trueFalseInputGroup);

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

export default addTrueFalseQuestion;
