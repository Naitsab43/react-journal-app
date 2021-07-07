import React, { useRef, useEffect } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { activeNote, startDeleting } from '../../actions/notes'

export const NoteScreen = () => {

  const dispatch = useDispatch();

  const {active: note} = useSelector(state => state.notes)
  const [formValues, handleInputChange, reset] = useForm(note);
  const {body, title} = formValues;
  const activeId = useRef(note.id) // Almacena un variable mutable que no redibuja todo el componente si cambia

  useEffect(() => {
    
    if(note.id !== activeId.current){
      reset(note);
      activeId.current = note.id;
    }

  }, [note, reset])

  useEffect(() => {

    dispatch(activeNote(formValues.id, {...formValues}))

  }, [formValues, dispatch])

  const handleDelete = () => {
    dispatch(startDeleting(formValues.id))
  }

  return (
    <div className="notes__main-content">

      <NotesAppBar />

      <div className="notes__content">

        <input name="title" className="notes__title-input" type="text" placeholder="Some awesome title" autoComplete="off" value={title} onChange={handleInputChange}/>

        <textarea name="body" className="notes__text-area" placeholder="What happened today" value={body} onChange={handleInputChange}></textarea>

      </div>

      {
        note.url && (
          
          <div className="notes__image">
            <img src={note.url} alt="imagen"/>
          </div>

        )

      }

      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>

    </div>
  )
}
