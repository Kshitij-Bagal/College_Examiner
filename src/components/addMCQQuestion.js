// addMCQQuestion.js

import { createFieldset, addPreviewButtonListener } from './fieldset'; 

const addMCQQuestion = (builderAreaRef, addToPreview) => {
  const fieldset = createFieldset('Multiple Choice'); 

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

  fieldset.appendChild(questionInputGroup);
  fieldset.appendChild(optionsInputGroup);

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

export default addMCQQuestion;
