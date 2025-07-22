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
    isCreateSuccess: boolean
  } = {
  listUsers: [],
  isCreateSuccess: false
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetCreate(state){
       state.isCreateSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      state.listUsers = action.payload;
    }),
      builder.addCase(createNewUser.fulfilled, (state) => {
        state.isCreateSuccess = true;
      })
  },
})

export const { resetCreate } = UserSlice.actions

export default UserSlice.reducer