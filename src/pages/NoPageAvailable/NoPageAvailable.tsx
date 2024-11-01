import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoPageAvailable: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "0 20px",
        textAlign: "center",
        width: '100%'
      }}
    >
      <div>
        <h2>Oops! This page isn't available or you don't have access to it.</h2>
        <p style={{marginTop: '10px'}}>Please re-check the URL or go back to the homepage.</p>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/", { replace: true });
          }}
          style={{ marginTop: "10px", background: '#1e1e1e' }}
        >
          Go Back to Homepage
        </Button>
      </div>
    </div>
  );
};

export default NoPageAvailable;
