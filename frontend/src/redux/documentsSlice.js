import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documents: [],
  sharedDocuments: [],
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
  },
});

export const { setDocuments, setSharedDocuments } = documentsSlice.actions;
export default documentsSlice.reducer;
