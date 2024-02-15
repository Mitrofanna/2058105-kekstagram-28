import {addScale, resetScale} from './photo-scale.js';
import {isEscapeKey} from './utils.js';
import {addValidator, resetPristine, validatePristine} from './validation-form.js';
import {addEffect, resetEffect, createSlider} from './photo-effects.js';
import {sendData} from './api.js';
import {renderSuccessMessage, renderFailMessage} from './alert-messages.js';
import {uploadUserFile} from './user-photo.js';

const SEND_URL = 'https://28.javascript.htmlacademy.pro/kekstagram';
const imageUploadForm = document.querySelector('.img-upload__form');
const imageUpload = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const buttonCloseForm = document.querySelector('#upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const effects = document.querySelector('.effects');
const uploadSubmitButton = document.querySelector('.img-upload__submit');

const onEffectsChange = (evt) => addEffect(evt);

const openForm = () => {
  imageUpload.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  textHashtags.addEventListener('keydown', onInputKeydownEscape);
  textDescription.addEventListener('keydown', onInputKeydownEscape);
};

const closeForm = () => {
  imageUploadForm.reset();
  resetScale();
  resetEffect();
  resetPristine();
  imageUpload.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  textHashtags.removeEventListener('keydown', onInputKeydownEscape);
  textDescription.removeEventListener('keydown', onInputKeydownEscape);
};

const onUploadFileChange = (evt) => {
  uploadUserFile(evt);
  openForm();
};

const onButtonCloseFormClick = (evt) => {
  evt.preventDefault();
  closeForm();
};

const onSendSuccess = () => {
  renderSuccessMessage();
  closeForm();
  uploadSubmitButton.disabled = false;
};

const onSendFail = () => {
  renderFailMessage();
  uploadSubmitButton.disabled = false;
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    if(document.querySelector('.error')) {
      return;
    }
    evt.preventDefault();
    closeForm();
  }
}

function onInputKeydownEscape (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

function onFormSubmit (evt) {
  evt.preventDefault();
  if(validatePristine()) {
    uploadSubmitButton.disabled = true;
    sendData(SEND_URL, onSendSuccess, onSendFail, new FormData(evt.target));
  }
}

const addUploadForm = () => {
  uploadFile.addEventListener('change', onUploadFileChange);
  buttonCloseForm.addEventListener('click', onButtonCloseFormClick);
  effects.addEventListener('change', onEffectsChange);
  imageUploadForm.addEventListener('submit', onFormSubmit);
  addValidator();
  addScale();
  createSlider();
};

export {addUploadForm};
