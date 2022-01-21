import tplNote from '../templates/note.hbs';
import notes from '../notes.json';

let data = {
  notes,
};
console.log(data);
// получаем заметки

export function getNotes(notes) {
  return notes.map(tplNote).join('');
}

// добавляем заметки
export function addNote(name, category, message) {
  const note = {
    id: Date.now().toString(),
    name: name,
    created: new Date(),
    category: category,
    content: message,
    dates: getDates(message),
    archived: false,
  };

  data.notes = { ...data.notes, note };
  console.log(data.notes);
}

// удаляем заметки
export const deleteNote = id => {
  const newNotes = notes.filter(note => note.id !== id);
  data.notes = newNotes;
};

// helpers
export const getDates = text => {
  let results = text.match(/[0-9]{1,2}([\-\/ \.])[0-9]{1,2}([\-\/ \.])((19)|(20))[0-9]{2}/g);

  if (!results) {
    return [];
  }
  return results;
};
