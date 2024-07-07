// addTrueFalseQuestion.js

import { createFieldset, addPreviewButtonListener } from './fieldset';

const addTrueFalseQuestion = (builderAreaRef, addToPreview) => {
  const fieldset = createFieldset('True/False'); 

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

  fieldset.appendChild(questionInputGroup);
  fieldset.appendChild(trueFalseInputGroup);

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

export default addTrueFalseQuestion;
