import LoginTextInputWithLabel from "../../../components/Form/LoginTextInputWithLabel";
import { LoginBoxProps } from "../../../types/Form/login/props";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import loginScreenSecondImage from "../../../assets/images/loginscreen2.jpg";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginBox: React.FC<LoginBoxProps> = ({
  email,
  password,
  updateLoginFields,
  loading,
}) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      style={{
        flex: 1,
        background: "rgba(255,255,255,0.6)",
        margin: "2rem",
        maxWidth: "800px",
        borderRadius: "1rem",
        boxShadow:
          "rgba(50, 50, 93, 0.3) 0px 10px 40px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        backdropFilter: "blur(10px)",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        overflow: "hidden",
      }}
    >
      <div style={{ flex: 1, padding: "5rem 2rem" }}>
        <div
          style={{ fontSize: "3rem", color: "#1e1e1e", fontWeight: "bolder" }}
        >
          Login
        </div>
        <div
          style={{ fontSize: "1.2rem", color: "#1e1e1e", marginTop: "10px" }}
        >
          Please enter your credentials below to login.
        </div>

        <TextField
          id="loginEmail"
          name="email"
          type="email"
          value={email}
          label="Email"
          required={true}
          placeholder="example@gmail.com"
          onChange={(e) => updateLoginFields(e)}
          style={{ width: "100%", marginTop: "20px" }}
        />
        <TextField
          id="loginPassword"
          name="password"
          type={showPassword ? "text" : "password"}
          value={password}
          label="Password"
          required={true}
          placeholder="Enter password"
          onChange={(e) => updateLoginFields(e)}
          style={{ width: "100%", marginTop: "10px" }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={showPassword}
              onChange={() => {
                setShowPassword((prev) => !prev);
              }}
            />
          }
          label="Show Password"
        />

        {loading ? (
          <LoadingButton
            color="secondary"
            loading={true}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            style={{ width: "100%", marginTop: "10px" }}
          >
            <span>Signing in</span>
          </LoadingButton>
        ) : (
          <Button
            style={{ width: "100%", marginTop: "10px" }}
            variant="contained"
            type="submit"
          >
            Sign In
          </Button>
        )}

        <div
          style={{
            padding: "20px 10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            color: "#2e2e2e",
            paddingBottom: "0px",
          }}
        >
          <div>Don't have an account?</div>
          <div onClick={() => {
            navigate('/signup')
          }} style={{ fontWeight: "bold", color: "#0f67fd", cursor: 'pointer' }}>Register</div>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
