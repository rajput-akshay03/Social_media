import { useState } from 'react';
import {BrowserRouter,Navigate,Routes,Route} from 'react-router-dom';
import HomePage from './components/homePage';
import ProfilePage from './components/profilePage';
import LoginPage from './components/loginPage';
import Navbar from './components/navbar';
import './App.css'
import { useMemo } from 'react';
import {useSelector} from "react-redux";
import {CssBaseline,ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {themeSettings} from "./theme";  
function App() {
    const mode  = useSelector((state)=>state.mode);
    const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode]);
  return (
    <>
       <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            {/* <Navbar/> */}
           <Routes>
               <Route path="/" element={<LoginPage/>}/>
               <Route path="/home" element={<HomePage/>}/>
               <Route path="/profile/:userId" element={<ProfilePage/>}/>
           </Routes>
          </ThemeProvider>
       </BrowserRouter>
    </>
  )
}

export default App;
