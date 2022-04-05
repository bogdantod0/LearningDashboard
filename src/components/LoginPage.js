import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { styled as mstyled } from "@mui/material/styles";
import { singInAPI, singInGoogleApi } from "../Redux/actions";
import { connect } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

function LoginPage(props) {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // setEmailLogin(data.get("email"));
    // setPasswordLogin(data.get("password"));

    props.signInUP(emailLogin, passwordLogin);
  };

  return (
    <Container>
      {props.user && (
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
      )}

      <div>
        <img src="/images/login/Illustration.jpg" alt="" />
      </div>
      <LoginContainer>
        <TopMessage>
          <h1>Greetings to </h1>
          <h2>Test App Login</h2>
        </TopMessage>
        <AlternativeLogin>
          <GoogleLoginButton>
            <GButton
              type="button"
              startIcon={<GoogleIcon style={{ fontSize: 40 }} />}
              onClick={() => props.signIn()}
            >
              Login with Google
            </GButton>
          </GoogleLoginButton>
          <FacebookLoginButton>
            <FbButton
              type="button"
              startIcon={<FacebookIcon style={{ fontSize: 40 }} />}
            >
              Login with Facebook
            </FbButton>
          </FacebookLoginButton>
        </AlternativeLogin>

        <hr />
        <ConventionalLogin>
          <h1>Login with account</h1>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmailLogin(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPasswordLogin(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </ConventionalLogin>
      </LoginContainer>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  signIn: () => dispatch(singInGoogleApi()),
  signInUP: (user, password) => dispatch(singInAPI(user, password)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  font-family: "Poppins";
  height: 100%;
  width: 100%;
  padding: 30px;
  @media (max-width: 820px) {
    img {
      height: 150px;
    }
    display: flex;
    flex-direction: column;
    background: transparent;
    align-items: center;
    /* background: URL("/images/login/Illustration.jpg"); */
    padding: 0;
  }
`;
const LoginContainer = styled.div`
  z-index: 1;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
`;
const TopMessage = styled.div`
  h1 {
    font-size: 30px;
    font-weight: 600;
  }
  h2 {
    font-size: 36px;
    font-weight: 900;
    color: #006ed3;
  }
  padding: 20px 0 0 50px;
`;
const AlternativeLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 20px;
  padding: 20px;
`;
const GoogleLoginButton = styled.div`
  display: flex;
  align-items: center;
`;
const FacebookLoginButton = styled(GoogleLoginButton)``;
const ConventionalLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #006ed3;
  padding: 10px 50px 10px 50px;
`;
const GButton = mstyled(Button)({
  fontSize: 16,
  fontWeight: 400,
  borderRadius: "25px",
  backgroundColor: "#fff",
  border: "1px solid rgba(0,0,0, 0.05)",
  boxShadow: "0px 6px 25px -10px rgba(0,0,0,0.75)",
  color: "black",
  padding: "5px 20px",
  "&:hover": {
    backgroundColor: "rgba(0,0,0, 0.05",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
});
const FbButton = mstyled(GButton)({});
