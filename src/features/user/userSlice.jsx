import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const themes = {
  winter: 'winter',
  dracula: 'dracula',
  corporate:'corporate',
  luxury:"luxury",
  retro:"retro",
  coffee:"coffee",
  myTheme:"myTheme"
};
const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem('theme') || themes.corporate;
  document.documentElement.setAttribute('data-theme', theme);
  return theme;
};

const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('user')) || null;
  };
  
  const initialState = {
    user: getUserFromLocalStorage(),
    theme: getThemeFromLocalStorage(),
    
  };
  

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
  
      loginUser: (state, action) => {
        const user = { ...action.payload.user, token: action.payload.token };
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        // toast.success('Logged in success');
      },
      logoutUser: (state) => {
        state.user = null;
        localStorage.clear()
        localStorage.removeItem('user');
        // toast.success('Logged out successfully');
      },
      toggleTheme: (state) => {
        const { dracula, winter,corporate,luxury,coffee,retro,myTheme } = themes;
        // state.theme = state.theme === dracula ? winter : dracula;
        state.theme = state.theme === myTheme ? corporate : myTheme;
        document.documentElement.setAttribute('data-theme', state.theme);
        localStorage.setItem('theme', state.theme);
      },
    },
});

export const { loginUser,logoutUser,toggleTheme } = userSlice.actions;

export default userSlice.reducer;