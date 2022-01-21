import refs from './refs';
import notes from '../notes.json';
// import tplNote from '../templates/note.hbs';
import { getNotes, addNote } from './functions';

//  рендерим заметки
const notesListMarkup = getNotes(notes);
refs.notesList.insertAdjacentHTML('afterbegin', notesListMarkup);

// добавляем заметки
refs.form.addEventListener('submit', onSubmit);
function onSubmit(e) {
  e.preventDefault();
  const name = e.target.name.value;
  const category = e.target.category.value;
  const message = e.target.message.value;
  console.log(e.target.name.value);
  console.log(e.target.category.value);
  console.log(e.target.message.value);
  addNote(name, category, message);

  //  const {
  //    elements: { name, category, message },
  //  } = e.target;

  //  console.log(name.value, category.value, message.value);

  //  let inps = document.querySelectorAll('input, select, textarea');

  //  for (let q = 0; q < inps.length; ++q) {
  //    if (inps[q].name && inps[q].form === this) {
  //      console.log(typeof '%s %s', inps[q].name, inps[q].value);
  //    }
  //  }
}

// const notesListMarkup = createNoteListMarkup(notes);

// function createNoteListMarkup(notes) {
//   return notes.map(tplNote).join('');
// }

// //  рендерим заметки
// refs.notesList.insertAdjacentHTML('afterbegin', notesListMarkup);
