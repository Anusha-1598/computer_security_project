import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documents: [],
};

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setDocuments: (state, action) => {
      state.documents = action.payload;
    },
  },
});

export const { setDocuments } = documentsSlice.actions;
export default documentsSlice.reducer;
