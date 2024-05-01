import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index";
import Dropzone from "react-dropzone";
import FlexBetween from "../styles/FlexBetween";



const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [firstName, setfName] = useState("");
  const [lastName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [password, setpassword] = useState("");
  const [picture, setPicture] = useState(null);
  const register = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName",firstName);
    formData.append("lastName",lastName);
    formData.append("email",email);
    formData.append("location",location);
    formData.append("occupation",occupation);
    formData.append("password",password);
    // formData.append("picture",picture);
    const savedUserResponse = await axios.post(
      `${import.meta.env.VITE_backend_URL}/auth/register`,
    formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type":"multipart/form-data",
        },
      }
    )
    if (savedUserResponse) {
      setPageType("login");
    }
  };

  const login = async (e) => {
    e.preventDefault();
    // const loggedInResponse = await fetch("http://localhost:3000/api/v1/auth/login",
    // {
    //   email,
    //   password
    // },
    //  {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    // });
    const loggedInResponse = await axios.post(
      `${import.meta.env.VITE_backend_URL}/auth/login`,
    {email,password},
      {
        withCredentials: true,
        headers: {
          "Content-Type":"application/json",
        },
      }
    )
   console.log(loggedInResponse.data);
    if (loggedInResponse) {
      dispatch(
        setLogin({
          user: loggedInResponse.data.user,
          token: loggedInResponse.data.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login();
    if (isRegister) await register();
  };

  return (
        <form onSubmit={pageType==="login"?login:register}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                 
                  onChange={(e)=>{setfName(e.target.value)}}
                  value={firstName}
                  name="firstName"
                 
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
              
                  onChange={(e)=>{setlName(e.target.value)}}
                  value={lastName}
                  name="lastName"
                
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                 
                  onChange={(e)=>{setLocation(e.target.value)}}
                  value={location}
                  name="location"
                
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
               
                  onChange={(e)=>{setOccupation(e.target.value)}}
                  value={occupation}
                  name="occupation"
               
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                      <Box
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input type="file" onChange={(e)=>{setPicture(e.target.files[0])}} name="picture"/>
                        {picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{picture}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onChange={(e)=>{setEmail(e.target.value)}}
              value={email}
              name="email"
            
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onChange={(e)=>{setpassword(e.target.value)}}
              value={password}
              name="password"
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>

  );
};

export default Form;