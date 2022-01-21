import * as basicLightbox from 'basiclightbox';
import refs from './refs';
import tplForm from '../templates/form.hbs';
import data from '../data.json';

refs.modal.addEventListener('click', addModal);

const editortMarkup = createMarkup(data);

function createMarkup(data) {
  return data.map(tplForm).join('');
}

function addModal() {
  const ModalCard = basicLightbox.create(editortMarkup, {
    onShow: ModalCard => {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', closeEsc);
      // const editorInput = ModalCard.element().querySelector('.editorInput');
      const noteEditorForm = ModalCard.element().querySelector('.editorInput');
      noteEditorForm.addEventListener('submit', onSubmit);
      noteEditorForm.addEventListener('input', onChange);
    },
    onClose: ModalCard => {
      document.body.style.overflow = 'visible';
    },
  });

  ModalCard.show();
}

// закрытие модалки по ESC
function closeEsc(e) {
  if (e.code === 'Escape') {
    ModalCard.close();
    document.removeEventListener('keydown', closeEsc);
    refs.noteEditorForm.removeEventListener('submit', onSubmit);
  }
}

// submit формы

function onSubmit(e) {
  e.preventDefault();
  console.log(e);
}

function onChange(e) {
  e.preventDefault();
  console.log(e);
}
