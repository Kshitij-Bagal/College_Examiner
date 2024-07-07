const addToPreview = (fieldset) => {
  const legendElement = fieldset.querySelector('.legend');
  const questionInputElement = fieldset.querySelector('.question');

  if (!legendElement) {
    console.error('Legend element not found');
    return;
  }
  if (!questionInputElement) {
    console.error('Question input element not found');
    return;
  }

  const legend = legendElement.textContent.trim();
  const questionText = questionInputElement.value.trim();

  const previewFieldset = document.createElement('fieldset');
  previewFieldset.className = 'fieldset';
  previewFieldset.dataset.type = legend; 
  previewFieldset.innerHTML = `
    <legend class="legend">${legend}</legend>
    <label>${questionText}</label>
    <br>
  `;

  if (legend === 'Short Answer') {
    const answerInput = document.createElement('input');
    answerInput.type = 'text';
    answerInput.className = 'answer';
    previewFieldset.appendChild(answerInput);
  } else if (legend === 'Multiple Choice') {
    const radioGroupPreview = document.createElement('div');
    radioGroupPreview.className = 'radio_group_preview';
    const options = fieldset.querySelectorAll('.option');
    options.forEach(option => {
      const optionText = option.value.trim();
      if (optionText) {
        const optionGroup = document.createElement('div');
        optionGroup.className = 'option_group';

        const optionInput = document.createElement('input');
        optionInput.type = 'radio';
        optionInput.name = 'mcqPreview';

        const optionLabel = document.createElement('label');
        optionLabel.textContent = optionText;

        optionGroup.appendChild(optionInput);
        optionGroup.appendChild(optionLabel);
        radioGroupPreview.appendChild(optionGroup);
      }
    });
    previewFieldset.appendChild(radioGroupPreview);
  } else if (legend === 'True/False') {
    const radioGroupPreview = document.createElement('div');
    radioGroupPreview.className = 'radio_group_preview';

    const trueOptionGroup = document.createElement('div');
    trueOptionGroup.className = 'option_group';
    const trueInput = document.createElement('input');
    trueInput.type = 'radio';
    trueInput.name = 'truefalsePreview';
    const trueLabel = document.createElement('label');
    trueLabel.textContent = 'True';
    trueOptionGroup.appendChild(trueInput);
    trueOptionGroup.appendChild(trueLabel);
    radioGroupPreview.appendChild(trueOptionGroup);

    const falseOptionGroup = document.createElement('div');
    falseOptionGroup.className = 'option_group';
    const falseInput = document.createElement('input');
    falseInput.type = 'radio';
    falseInput.name = 'truefalsePreview';
    const falseLabel = document.createElement('label');
    falseLabel.textContent = 'False';
    falseOptionGroup.appendChild(falseInput);
    falseOptionGroup.appendChild(falseLabel);
    radioGroupPreview.appendChild(falseOptionGroup);

    previewFieldset.appendChild(radioGroupPreview);
  }

  const previewArea = document.getElementById('previewArea');
  if (previewArea) {
    previewArea.appendChild(previewFieldset);
  } else {
    console.error('Preview area element not found');
  }
};

export default addToPreview;
