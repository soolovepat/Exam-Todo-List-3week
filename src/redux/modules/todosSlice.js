import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { waitTwoSeconds } from "../../utils";

const initialState = {
  list: [],
  isLoading: false,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = action.payload;
      state.list = [...state.list, newTodo];
      // console.log(state.list);
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      state.list = state.list.filter((todo) => todo.id !== id);
    },
    todoLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const __addToDo = createAsyncThunk(
  "__addToDo",
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(todosSlice.actions.todoLoading());
    await waitTwoSeconds(); // 2초 지연

    thunkAPI.dispatch(todosSlice.actions.addTodo(payload));
    // console.log(payload);
    return payload;
  }
);

export const __deleteTodo = createAsyncThunk(
  "__deleteToDo",
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(todosSlice.actions.todoLoading());
    await waitTwoSeconds(); // 2초 지연

    thunkAPI.dispatch(todosSlice.actions.deleteTodo(payload));
    // console.log(payload);
    return payload;
  }
);

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
