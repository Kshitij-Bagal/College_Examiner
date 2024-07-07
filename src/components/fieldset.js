// fieldset.js
import addToPreview from './AddToPreview'; 

export const createFieldset = (legendText) => {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'fieldset';
  fieldset.innerHTML = `
    <legend class="legend">${legendText}</legend>
  `;
  return fieldset;
};

export const addPreviewButtonListener = (fieldset) => {
  const addButton = fieldset.querySelector('.add-to-preview');
  addButton.addEventListener('click', () => {
    addToPreview(fieldset); 
    addButton.remove();
  });
};
