import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchListUsers = createAsyncThunk(
  'users/fetchListUser',
  async () => {
    const res = await fetch('http://localhost:8000/users')
    const data = await res.json();
    return data;
  }
)

export const createNewUser = createAsyncThunk(
  'users/createNewUser',
  async (payload: IUserPayload, thunkAPI) => {
    const res = await fetch('http://localhost:8000/users', {
      method: "POST",
      body: JSON.stringify({ email: payload.email, name: payload.name }),
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchListUsers());
    }
    return data;
  }
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (payload: any, thunkAPI) => {
    const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify({
        email: payload.email,
        name: payload.name,
      }),
      headers: {
        "Content-Type": " application/json"
      }
    });
    const data = await res.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchListUsers());
    }
    return data;
  }
)
export const deleteUserById = createAsyncThunk(
  'users/deleteUserById',
  async (payload: any, thunkAPI) => {
    await fetch(`http://localhost:8000/users/${payload.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": " application/json"
      }
    });
    thunkAPI.dispatch(fetchListUsers());
  }
)
interface IUserPayload {
  email: string,
  name: string
}
interface IUser {
  id: number;
  name: string;
  email: string
}
const initialState:
  {
    listUsers: IUser[]
    isCreateSuccess: boolean,
    isUpdateSuccess: boolean,
    isDeleteSuccess: boolean,
  } = {
  listUsers: [],
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false,
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetCreate(state) {
      state.isCreateSuccess = false;
    },
    resetUpdate(state) {
      state.isUpdateSuccess = false;
    },
    resetDelete(state) {
      state.isDeleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      state.listUsers = action.payload;
    }),
      builder.addCase(createNewUser.fulfilled, (state) => {
        state.isCreateSuccess = true;
      }),
      builder.addCase(updateUser.fulfilled, (state) => {
        state.isUpdateSuccess = true;
      }),
      builder.addCase(deleteUserById.fulfilled, (state) => {
        state.isDeleteSuccess = true;
      })
  },
})

export const { resetCreate, resetUpdate, resetDelete } = UserSlice.actions

export default UserSlice.reducer