import Dictionary from './dictionary.language';
import Label from './label.language';
import Message from './message.language';
import Note from './note.language';
import Title from './title.language';

export default { ...Dictionary, ...Label, ...Message, ...Note, ...Title };
