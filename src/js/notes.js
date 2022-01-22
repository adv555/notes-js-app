import refs from './refs';
import {
  getActive,
  addNote,
  getNoteById,
  updateNote,
  deleteNote,
  changeStatus,
  getStatistics,
} from './functions';
// import { modalToggle } from './modal';

//  рендерим заметки
const render = () => {
  refs.notesList.innerHTML = '';
  refs.statList.innerHTML = '';

  refs.notesList.innerHTML = getActive();
  refs.statList.innerHTML = getStatistics();
};

render();

// добавляем и рендерим новые заметки
refs.form.addEventListener('submit', onSubmit);
function onSubmit(e) {
  e.preventDefault();
  const name = e.target.name.value;
  const category = e.target.category.value;
  const message = e.target.message.value.trim();

  if (message === '') {
    return alert('Fill in the note.');
  }

  addNote(name, category, message);
  render();
  refs.form.reset();
}

// находим id, удаляем заметки
refs.notesList.addEventListener('click', onDelete);
function onDelete(e) {
  e.preventDefault();
  if (!e.target.classList.contains('deleteBtn')) {
    return;
  }
  const id = e.target.closest('tr').attributes.id.value;

  deleteNote(id);
  render();
}

// архивируем заметки
refs.notesList.addEventListener('click', onArchive);
function onArchive(e) {
  e.preventDefault();
  if (e.target.closest('.archiveBtn')) {
    const id = e.target.closest('tr').attributes.id.value;
    changeStatus(id);
    render();
  }
}
// редактируем заметки
refs.notesList.addEventListener('click', onEdit);
function onEdit(e) {
  e.preventDefault();
  if (e.target.closest('.updateBtn')) {
    const id = e.target.closest('tr').attributes.id.value;
    console.log(id);

    const note = getNoteById(id);
    // console.log(note);
    refs.input.value = note.name;
    refs.select.value = '';
    refs.textarea.value = note.content;
    refs.form.removeEventListener('submit', onSubmit);
    refs.form.addEventListener('submit', onSave);

    function onSave(e) {
      e.preventDefault();
      const name = refs.input.value;
      const category = refs.select.value;
      const message = refs.textarea.value;
      updateNote(id, name, category, message);
      render();
      refs.form.reset();
      refs.form.removeEventListener('submit', onSave);
      refs.form.addEventListener('submit', onSubmit);
    }
  }
}

refs.addBtn.addEventListener('click', modalToggle);

function modalToggle() {
  refs.modal.classList.toggle('isOpen');
  document.addEventListener('keydown', closeEsc);
  refs.modalBackdrop.addEventListener('click', modalBackdropClick);
}

// закрытие модалки по ESC/Click

function closeEsc(e) {
  // console.log(e.code);
  if (e.code === 'Escape') {
    modalToggle();
    document.removeEventListener('keydown', closeEsc);
  }
}

function modalBackdropClick(e) {
  if (e.target.classList.contains('modalBackdrop')) {
    modalToggle();
    refs.modalBackdrop.removeEventListener('click', modalBackdropClick);
  }
}
