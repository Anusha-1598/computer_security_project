import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documents: [],
  sharedDocuments: [],
  currentDocument: null,
};

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setDocuments: (state, action) => {
      state.documents = action.payload;
    },
    setSharedDocuments: (state, action) => {
      state.sharedDocuments = action.payload;
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
    updateDocumentContent: (state, action) => {
      const { fileId, newContent } = action.payload;
      const document =
        state.documents.find((doc) => doc.fileId === fileId) ||
        state.sharedDocuments.find((doc) => doc.fileId === fileId);
      if (document) {
        document.content = newContent;
      }
      if (state.currentDocument && state.currentDocument.fileId === fileId) {
        state.currentDocument.content = newContent;
      }
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
  updateDocumentContent,
} = documentsSlice.actions;
export default documentsSlice.reducer;
