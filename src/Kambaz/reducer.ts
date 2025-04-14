import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  enrollments: [],
};
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    deleteEnrollment: (state, { payload: { enrollmentId } }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => e._id !== enrollmentId
      );
    },
    addEnrollment: (state, { payload: enrollment }) => {
      state.enrollments = [...state.enrollments, enrollment] as any;
    },
    setEnrollments: (state, { payload: enrollments }) => {
      state.enrollments = enrollments;
    }
  },
});
export const { deleteEnrollment, addEnrollment, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;