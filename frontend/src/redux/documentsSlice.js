import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documents: [],
  currentDocument: null,
  sharedDocuments: [],
};

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setDocuments: (state, action) => {
      state.documents = action.payload;
    },
    updateDocumentName: (state, action) => {
      const { fileId, newName } = action.payload;
      const document = state.documents.find((doc) => doc.fileId === fileId);
      if (document) {
        document.fileName = newName;
      }
    },
    deleteDocument: (state, action) => {
      state.documents = state.documents.filter(
        (doc) => doc.fileId !== action.payload
      );
    },
    setCurrentDocument: (state, action) => {
      state.currentDocument = action.payload;
    },
    updateSharedUsers: (state, action) => {
      const { fileId, sharedUsers } = action.payload;
      const document = state.documents.find((doc) => doc.fileId === fileId);
      if (document) {
        document.sharedUsers = sharedUsers;
      }
    },
    setSharedDocuments: (state, action) => {
      state.sharedDocuments = action.payload;
    },
  },
});

export const {
  setDocuments,
  setSharedDocuments,
  updateDocumentName,
  deleteDocument,
  setCurrentDocument,
  updateSharedUsers,
} = documentsSlice.actions;
export default documentsSlice.reducer;
