const getRandomNumber = function (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomUniqueNumber = function (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const showAlert = function () {
  const errorModal = document.querySelector('#error').content.querySelector('.error');
  const showErrorModal = errorModal.cloneNode(true);
  document.body.appendChild(showErrorModal);

  const closeModalAlert = () => document.body.removeChild(showErrorModal);
  showErrorModal.addEventListener('click', closeModalAlert);
  showErrorModal.querySelector('.error__button').addEventListener('click', () => {
    showErrorModal.removeEventListener('click', closeModalAlert);
    closeModalAlert();
  });
  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      showErrorModal.removeEventListener('click', closeModalAlert);
      closeModalAlert();
    }
  });
};

const onSuccess = function () {
  const success = document.querySelector('#success').content.querySelector('.success');
  const showSuccessModal = success.cloneNode(true);
  document.body.appendChild(showSuccessModal);

  const closeModalSuccess = () => document.body.removeChild(showSuccessModal);
  showSuccessModal.addEventListener('click', closeModalSuccess);
  showSuccessModal.querySelector('.success__button').addEventListener('click', () => {
    showSuccessModal.removeEventListener('click', closeModalSuccess);
    closeModalSuccess();
  });
  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      showSuccessModal.removeEventListener('click', closeModalSuccess);
      closeModalSuccess();
    }
  });
};

export {getRandomNumber, getRandomUniqueNumber, showAlert, onSuccess};
