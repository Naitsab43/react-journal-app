import { db } from "../firebase/firebase-config"
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import Swal from "sweetalert2"
import { fileUpload } from "../helpers/fileUpload";



export const startNewNote = () => {

  return async (dispatch, getState) => { // getState Parecido al useSelector

    const {uid} = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime()
    }

    const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);
    
    dispatch(activeNote(docRef.id, newNote))
    dispatch(addNewNote(docRef.id, newNote))

  }
}

export const activeNote = (id, note) => {

  return {
    type: types.notesActive,
    payload: {
      id,
      ...note
    }
  }

}

export const addNewNote = (id, note) => {
  return {
    type: types.notesAddNew,
    payload: {
      id,
      ...note
    }
  }
}

export const startLoadingNotes = (uid) => {

  return async (dispatch) => {

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));

  }

}

export const setNotes = (notes) => {

  return {
    type: types.notesLoad,
    payload: notes
  }

}

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {

    const {uid} = getState().auth;

    if(!note.url){
      delete note.url
    }

    const noteToFirestore = {...note};
    delete noteToFirestore.id;
    try{
      await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
      dispatch(refreshNote(note));
      Swal.fire("Saved", note.title, "success");
    }
    catch{
      Swal.fire("Error", "Oh Noo:(", "error" )
    }

  } 
}
  
export const refreshNote = (note) => {
    
  return {
    type: types.notesUpdate,
    payload:{ 
      id: note.id,
      note
    }
  }

}


export const startUploading = (file) => {
  return async (dispatch, getState) => {

    const {active: activeNote} = getState().notes;

    Swal.fire({
      title: "Uploading...",
      text: "Please wait...", 
      allowOutsideClick: false, 
      onBeforeOpen: () => {
        Swal.showLoading();
      } 
    })

    const fileUrl = await fileUpload(file)

    activeNote.url = fileUrl;

    dispatch(startSaveNote(activeNote));

    Swal.close();

  }
}

export const startDeleting = (id) => {
  return async (dispatch, getState) => {

    const {uid} = getState().auth;

    await db.doc(`${uid}/journal/notes/${id}`).delete();

    dispatch(deleteNote(id))

  } 
}


export const deleteNote = (id) => {
  return {
    type: types.notesDelete,
    payload: id
  }
}

export const noteLogout = () => {
  return {
    type: types.notesLogoutCleaning
  }
}