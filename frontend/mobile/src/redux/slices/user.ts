import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  role: string | null
  email: string | null
  userId: string | null
  isLoggedIn: boolean
  hasRegistered: boolean
}

const initialState: UserState = {
  role: null,
  email: null,
  userId: null,
  isLoggedIn: false,
  hasRegistered: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{
        role: string
        email: string
        userId: string
      }>
    ) {
      state.role = action.payload.role
      state.email = action.payload.email
      state.userId = action.payload.userId
      state.isLoggedIn = true
    },
    logout(state) {
      state.role = null
      state.email = null
      state.userId = null
      state.isLoggedIn = false
    },
    setHasRegistered: (state, action: PayloadAction<boolean>) => {
      state.hasRegistered = action.payload
    },
  },
})

export const { login, logout, setHasRegistered } = userSlice.actions
export default userSlice.reducer
