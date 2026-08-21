import { useContext } from "react";
import ListEditorContext from "./ListEditorContext";

const useListEditor = () => useContext(ListEditorContext);

export default useListEditor;