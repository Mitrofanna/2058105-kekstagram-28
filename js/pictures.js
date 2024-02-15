import {openBigPicture} from './big-pictures.js';
import {getData} from './api.js';
import {unitFilter} from './filter.js';

const GET_URL = 'https://28.javascript.htmlacademy.pro/kekstagram/data';
const ALERT_SHOW_TIME = 5000;
const ALERT_ERROR = 'Произошла ошибка загрузки';
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const renderPhotos = (data) => {
  const picture = templatePicture.cloneNode(true);
  picture.querySelector('.picture__img').src = data.url;
  picture.querySelector('.picture__comments').textContent = data.comments.length;
  picture.querySelector('.picture__likes').textContent = data.likes;

  picture.addEventListener('click', () => {
    openBigPicture(data);
  });
  return picture;
};

const renderPictures = (data) => {
  data.forEach((item) => pictures.append(renderPhotos(item)));
};

const showSuccessForm = (data) => {
  renderPictures(data);
  unitFilter(data);
};

const showFailForm = () => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('error__message');
  alertContainer.textContent = ALERT_ERROR;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const getPictureData = () => getData(GET_URL, showSuccessForm, showFailForm);

export{getPictureData, renderPictures};
