import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '../../types/auth';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  mfaVerified: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ address: string } | null>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    setMfaVerified: (state, action: PayloadAction<boolean>) => {
      state.mfaVerified = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.mfaVerified = false;
    },
  },
});

export const { setUser, setMfaVerified, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;