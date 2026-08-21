import ListEditorContext from "./ListEditorContext";
import { useState } from "react";

const ListEditorProvider = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [currentEntry, setCurrentEntry] = useState(null);

  const openEditor = (movie, existingEntry = null) => {
    setCurrentMovie(movie);
    setCurrentEntry(existingEntry);
    setIsOpen(true);
  };

  const closeEditor = () => {
    setIsOpen(false);
    setCurrentMovie(null);
    setCurrentEntry(null);
  };
  
  return(
    <ListEditorContext.Provider value={{isOpen, currentMovie, currentEntry, openEditor, closeEditor}}>
      {children}
    </ListEditorContext.Provider>
  );
};

export default ListEditorProvider;
