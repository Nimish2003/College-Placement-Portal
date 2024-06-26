import React, { useState } from "react";
import * as Components from "../components/login/Components";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import VerifyOtp from "../components/login/VerifyOtp";
import Api from "../api";
import { useAuth } from "../context/context";
import MenuItem from "@mui/material/MenuItem";

function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    role: "student", // Default value for role
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [signIn, toggle] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [btnName, setBtnName] = useState("Log In");

  const { login } = useAuth();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleClickShowLoginPassword = () =>
    setShowLoginPassword((show) => !show);

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(signupInfo);
    if (
      !signupInfo.name ||
      !signupInfo.email ||
      !signupInfo.password ||
      !signupInfo.contactNumber ||
      !confirmPassword
    ) {
      toast.error("Please fill all the fields");
      toggle(false);
      return;
    }
    await Api.registerUser(signupInfo)
      .then((res) => {
        console.log(res);
        toast.success("Account created successfully");
        toggle(true);
        setSignupInfo({
          name: "",
          email: "",
          password: "",
          contactNumber: "",
          role: "student", // Reset role to default after signup
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(loginInfo);
    setBtnName("Logging In...");
    if (!loginInfo.email || !loginInfo.password) {
      toast.error("Please fill all the fields");
      setBtnName("Log In");
      toggle(true);
      return;
    }
    await Api.loginUser(loginInfo)
      .then((res) => {
        console.log(res);
        toast.success("OTP sent to your email!");
        setShowOtp(true);
        const currentUser = JSON.parse(localStorage.getItem("user"));
        const userId = currentUser.id;
        console.log(userId);
        login(userId);
        setBtnName("Log In");
        toggle(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
        setBtnName("Log In");
      });
  };

  const handleRoleChange = (e) => {
    setSignupInfo({ ...signupInfo, role: e.target.value });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <VerifyOtp
        open={showOtp}
        handleClose={() => setShowOtp(false)}
        email={loginInfo.email}
        setLoginInfo={setLoginInfo}
      />
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form>
            <Components.Title>Create Account</Components.Title>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              margin="normal"
              fullWidth
              size="small"
              onChange={(e) =>
                setSignupInfo({ ...signupInfo, name: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              onChange={(e) =>
                setSignupInfo({ ...signupInfo, email: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="Contact Number"
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              onChange={(e) =>
                setSignupInfo({ ...signupInfo, contactNumber: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="Role"
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              select
              value={signupInfo.role}
              onChange={handleRoleChange}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>

            <div className="relative w-full">
              <TextField
                className="w-full "
                label="Password"
                variant="outlined"
                margin="normal"
                size="small"
                type={showPassword ? "text" : "password"}
                value={signupInfo.password}
                onChange={(e) =>
                  setSignupInfo({ ...signupInfo, password: e.target.value })
                }
              />
              <IconButton
                sx={{
                  position: "absolute",
                  top: "18px",
                  right: "5px",
                }}
                onClick={handleClickShowPassword}
              >
                {showPassword ? (
                  <VisibilityOff sx={{ fontSize: "20px" }} />
                ) : (
                  <Visibility sx={{ fontSize: "20px" }} />
                )}
              </IconButton>
            </div>
            <div className="relative w-full">
              <TextField
                className="w-full "
                label="Confirm Password"
                variant="outlined"
                margin="normal"
                size="small"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  top: "18px",
                  right: "5px",
                }}
                onClick={handleClickShowConfirmPassword}
              >
                {showConfirmPassword ? (
                  <VisibilityOff sx={{ fontSize: "20px" }} />
                ) : (
                  <Visibility sx={{ fontSize: "20px" }} />
                )}
              </IconButton>
            </div>
            <Components.Button
              onClick={handleSignup}
              style={{
                marginTop: "1rem",
              }}
            >
              Sign Up
            </Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form>
            <Components.Title
              style={{
                fontSize: "1.5rem",
              }}
            >
              Sign in
            </Components.Title>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, email: e.target.value })
              }
            />
            <div className="relative w-full">
              <TextField
                className="w-full "
                label="Password"
                variant="outlined"
                margin="normal"
                type={showLoginPassword ? "text" : "password"}
                value={loginInfo.password}
                onChange={(e) =>
                  setLoginInfo({ ...loginInfo, password: e.target.value })
                }
              />
              <IconButton
                sx={{
                  position: "absolute",
                  top: "22px",
                  right: "8px",
                }}
                onClick={handleClickShowLoginPassword}
              >
                {showLoginPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
            <Components.Button
              onClick={handleLogin}
              style={{
                marginTop: "1rem",
              }}
            >
              {btnName}
            </Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                Find the right Job that fits your skills and personality.
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome to Placement Portal!</Components.Title>
              <Components.Paragraph>
                One Click - Apply for the Role that needs you!
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
}

export default Login;
