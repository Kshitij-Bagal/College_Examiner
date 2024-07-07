// addMCQQuestion.js

import { createFieldset, addPreviewButtonListener } from './fieldset'; // Import necessary functions from fieldset.js

const addMCQQuestion = (builderAreaRef, addToPreview) => {
  const fieldset = createFieldset('Multiple Choice'); // Create fieldset with legend text

  // Create elements for question and options
  const questionInputGroup = document.createElement('div');
  questionInputGroup.className = 'input-group';
  questionInputGroup.innerHTML = `
    <label>Question:</label>
    <input type="text" placeholder="Enter your question here" class="question">
  `;

  const optionsInputGroup = document.createElement('div');
  optionsInputGroup.className = 'input-group';
  optionsInputGroup.innerHTML = `
    <label>Options:</label>
    <div class="radio_group">
      <input type="radio" name="mcq"> <input type="text" placeholder="Option 1" class="option">
    </div>
    <div class="radio_group">
      <input type="radio" name="mcq"> <input type="text" placeholder="Option 2" class="option">
    </div>
    <div class="radio_group">
      <input type="radio" name="mcq"> <input type="text" placeholder="Option 3" class="option">
    </div>
    <div class="radio_group"> 
        <input type="radio" name="mcq"> <input type="text" placeholder="Option 4" class="option">
    </div>
  `;

  // Append elements to fieldset
  fieldset.appendChild(questionInputGroup);
  fieldset.appendChild(optionsInputGroup);

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

export default addMCQQuestion;
