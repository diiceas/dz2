const htmlElements = {};

function initHTMLElements() {
  htmlElements.selectColor = getHTMLElement('select');
  htmlElements.addButton = getHTMLElement('button.add-button');
  htmlElements.input = getHTMLElement('input.input-color');
  htmlElements.removeButton = getHTMLElement('button.remove-button');
  htmlElements.removeSelectedButton = getHTMLElement('button.remove-selected');
  htmlElements.body = document.body;
}

function initEvenHandles() {
  htmlElements.selectColor.addEventListener('change', selectColorValueChanged);
  htmlElements.addButton.addEventListener('click', addButtonClicked);
  htmlElements.removeButton.addEventListener('click', removeColorClicked);
  htmlElements.removeSelectedButton.addEventListener('click', removeSelectedColorClicked);
}

initHTMLElements();
initEvenHandles();

function selectColorValueChanged() {
  setColor(htmlElements.selectColor.value);
}

function addButtonClicked() {
  let newColor = htmlElements.input.value;
  let canBeAdded = checkIfColorCanBeAdded(newColor);
  if (canBeAdded) {
    let colorAdded = checkIfColorAdded(newColor);
    if (colorAdded === false) {
      addColor(newColor);
      chooseColor(newColor);
      setColor(newColor);
    } else {
      alert('Color has been already added');
    }
  } else {
    alert("There's no such a color");
  }
}

function removeColorClicked() {
  let colorToRemove = htmlElements.input.value;
  if (colorToRemove === '') {
    alert('Please enter a value first');
    return;
  } else {
    removeColor(colorToRemove);
    reset();
  }
}

function removeSelectedColorClicked() {
  let colorToRemove = getSelectedValue();
  if (colorToRemove === 'not selected') {
    alert('Please choose a value to remove');
  } else {
    removeColor(colorToRemove);
    reset();
  }
}

function getSelectedValue() {
  let selectedIdx = htmlElements.selectColor.selectedIndex;
  return htmlElements.selectColor[selectedIdx].value;
}

function getHTMLElement(selector) {
  return document.querySelector(selector);
}

function checkIfColorAdded(color) {
  let colorAdded = false;
  for (let i = 1; i < htmlElements.selectColor.length; i++) {
    if (htmlElements.selectColor[i].value === color) {
      colorAdded = true;
    }
  }
  return colorAdded;
}

function addColor(color) {
  let newOption = new Option(color, color);
  htmlElements.selectColor.appendChild(newOption);
  reset();
}

function chooseColor(color) {
  for (let i = 1; i < htmlElements.selectColor.length; i++) {
    if (htmlElements.selectColor[i].value === color) {
      setSelectedIndex(i);
    }
  }
}

function setSelectedIndex(idx) {
  htmlElements.selectColor.selectedIndex = idx;
}

function setColor(color) {
  htmlElements.body.style.setProperty('--color', color);
}

function removeColor(color) {
  let colorAdded = checkIfColorAdded(color);
  if (colorAdded === true) {
    for (let i = 1; i < htmlElements.selectColor.length; i++) {
      if (htmlElements.selectColor[i].value === color) {
        htmlElements.selectColor.removeChild(htmlElements.selectColor[i]);
        htmlElements.selectColor.selectedIndex = 0;
      }
    }
    reset();
  } else {
    alert("There's no such a color");
  }
}

function reset() {
  htmlElements.input.value = '';
  htmlElements.body.style.removeProperty('--color');
}

function checkIfColorCanBeAdded(color) {
  if (color.indexOf('rgb') > -1 || color === '') {
    return false;
  }

  let div = document.createElement('div');
  div.style.backgroundColor = color;
  let colorIsSetCorrectly = div.style.backgroundColor === color.toLowerCase();
  return colorIsSetCorrectly;
}
