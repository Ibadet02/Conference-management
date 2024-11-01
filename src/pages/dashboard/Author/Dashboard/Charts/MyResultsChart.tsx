import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import useUserData from "../../../../../hooks/useUserData";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import IconButton from "@mui/material/IconButton";
import { StyledConferencePopupContainer } from "../../../../../styles/pages/dashboard/Author/AllConferences/ConferencePopupContainer.styled";
import Backdrop from "../../../../../components/dashboard/mutual/Backdrop";
import ReasonModal from "./ReasonModal";

const MyResultsChart: React.FC = () => {
  const userDataElements = useUserData();
  const [chartData, setChartData] = useState([]);
  const maxTableContentLength = 50;
  const [openAbstract, setOpenAbstract] = useState(false);


  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
  
    // Cleanup function to clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  const handleOverflowedText = (givenText: string) => {
    if (givenText.length > maxTableContentLength) {
      return `${givenText.substring(0, maxTableContentLength)}...`;
    } else {
      return givenText;
    }
  };

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 6,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      backgroundColor:
        userDataElements?.userData?.myStatus === "abstract rejected"
          ? "red"
          : userDataElements?.userData?.blocked
          ? "red"
          : "green",
    },
  }));

  return (
    <div
      style={{
        flex: 1,
        background: "rgba(255,255,255,1)",
        padding: "1rem",
        borderRadius: "1rem",
        boxShadow: "5px 5px 20px rgba(0,0,0,0.2)",
        minWidth: "300px",
      }}
    >
      <>
        <div
          style={{
            width: "100%",
            fontWeight: "bolder",
            textAlign: "center",
            color: "#2e2e2e",
          }}
        >
          ACTUAL STATE
        </div>

        {
          !loading ?

          <>

        {(userDataElements?.userData?.note && (userDataElements?.userData?.myStatus === "abstract rejected" || userDataElements?.userData?.actualState === 2)) && (
          <div
            style={{
              flex: 1,
              textAlign: "right",
              fontSize: "small",
              color: "#fff",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                padding: "10px",
                background: userDataElements?.userData?.myStatus === "abstract rejected" ? "red" : "green",
                fontWeight: "bold",
                borderRadius: "5px",
                boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
                textAlign: "center",
                fontSize: "1rem",
              }}
            >
              {
                userDataElements?.userData?.myStatus === "abstract rejected" ? "Recommendation" : "Remarks"
              }
              <div
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.2)",
                  padding: "5px",
                  fontSize: "small",
                  fontWeight: "normal",
                  marginTop: "10px",
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {
                  handleOverflowedText(`Reason: ${userDataElements?.userData?.note}`)
                }
                <IconButton
                               onClick={() => {
                                setOpenAbstract(true)
                                }}
                  aria-label="delete"
                  size="small"
                  color="primary"
                  style={{color: '#fff'}}
                >
                  <RemoveRedEyeIcon />
                </IconButton>
              </div>
            </div>
          </div>
        )}

        {/* {userDataElements?.userData?.actualState ? ( */}

        <div
          style={{
            flex: 1,
            opacity: userDataElements?.userData?.blocked ? 0.5 : 1,
            marginTop: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 1,
            }}
          >
            {/* ABSTRACT SENT */}
            <div style={{ flex: 1 }}>
              {userDataElements?.userData?.myStatus === "abstract rejected" && (
                <div
                  style={{
                    flex: 1,
                    textAlign: "right",
                    fontSize: "small",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <div
                    style={{
                      padding: "5px",
                      background: "red",
                      fontWeight: "bold",
                      borderRadius: "5px",
                      boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
                      width: "140px",
                      textAlign: "center",
                    }}
                  >
                    {
                      userDataElements?.userData?.blocked ? "Abstract Blocked" : "Abstract Rejected"
                    }
                    
                  </div>
                </div>
              )}
            </div>

            {/* ABSTRACT APPROVED */}
            <div style={{ flex: 1 }}></div>

            {/* PAPER SENT */}
            <div style={{ flex: 1 }}></div>

            {/* REVIEWER ASSIGNED */}
            <div style={{ flex: 1 }}></div>

            {/* RESULTS RECEIVED */}
            <div style={{ flex: 1 }}>
              {userDataElements?.userData?.reviewResult && (
                <div
                  style={{
                    flex: 1,
                    textAlign: "right",
                    fontSize: "small",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <div
                    style={{
                      padding: "5px",
                      background:
                        userDataElements?.userData?.reviewResult ===
                        "Strong Accept"
                          ? "#28a745"
                          : userDataElements?.userData?.reviewResult ===
                            "Accept"
                          ? "#6f42c1"
                          : userDataElements?.userData?.reviewResult ===
                            "Weak Accept"
                          ? "#fd7e14"
                          : "#dc3545",
                      fontWeight: "bold",
                      borderRadius: "5px",
                      boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
                      width: "140px",
                      textAlign: "center",
                    }}
                  >
                    {userDataElements?.userData?.reviewResult}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Box sx={{ width: "100%", marginBottom: "15px", marginTop: "15px" }}>
            <BorderLinearProgress
              variant="determinate"
              value={
                userDataElements?.userData?.actualState
                  ? userDataElements?.userData?.actualState !== 5
                    ? userDataElements?.userData?.actualState * 20 - 6
                    : userDataElements?.userData?.actualState * 20
                  : 0
              }
              style={{ color: "yellow" }}
            />
          </Box>

          <div
            style={{
              display: "flex",
              flex: 1,
              marginBottom: "40px",
            }}
          >
            {/* ABSTRACT SENT */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  flex: 1,
                  textAlign: "right",
                  fontSize: "small",
                  color:
                    userDataElements?.userData?.actualState >= 1
                      ? "green"
                      : "#4e4e4e",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    padding: "5px",
                    background:
                      userDataElements?.userData?.actualState >= 1
                        ? "rgba(144, 238, 144, 0.6)"
                        : "#eee",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
                    width: "140px",
                    textAlign: "center",
                  }}
                >
                  Abstract Sent
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    padding: "5px",
                    marginTop: "10px",
                    background: "#eee",
                    maxWidth: "120px",
                    textAlign: "center",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    transform: "translateX(-10px)",
                    color: "#6e6e6e",
                  }}
                >
                  Once approved, you can submit paper
                </div>
              </div>
            </div>

            {/* ABSTRACT APPROVED */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  flex: 1,
                  textAlign: "right",
                  fontSize: "small",
                  color:
                    userDataElements?.userData?.actualState >= 2
                      ? "green"
                      : "#4e4e4e",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    padding: "5px",
                    background:
                      userDataElements?.userData?.actualState >= 2
                        ? "rgba(144, 238, 144, 0.6)"
                        : "#eee",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
                    width: "140px",
                    textAlign: "center",
                  }}
                >
                  Abstract Approved
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    padding: "5px",
                    marginTop: "10px",
                    background: "#eee",
                    maxWidth: "120px",
                    textAlign: "center",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    transform: "translateX(-10px)",
                    color: "#6e6e6e",
                  }}
                >
                  You can submit your paper for review
                </div>
              </div>
            </div>

            {/* PAPER SENT */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  flex: 1,
                  textAlign: "right",
                  fontSize: "small",
                  color:
                    userDataElements?.userData?.actualState >= 3
                      ? "green"
                      : "#4e4e4e",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    padding: "5px",
                    background:
                      userDataElements?.userData?.actualState >= 3
                        ? "rgba(144, 238, 144, 0.6)"
                        : "#eee",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
                    width: "140px",
                    textAlign: "center",
                  }}
                >
                  Paper Sent
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    padding: "5px",
                    marginTop: "10px",
                    background: "#eee",
                    maxWidth: "120px",
                    textAlign: "center",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    transform: "translateX(-10px)",
                    color: "#6e6e6e",
                  }}
                >
                  Your paper will be forwarded to a reviewer
                </div>
              </div>
            </div>

            {/* REVIEWER ASSIGNED */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  flex: 1,
                  textAlign: "right",
                  fontSize: "small",
                  color:
                    userDataElements?.userData?.actualState >= 4
                      ? "green"
                      : "#4e4e4e",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    padding: "5px",
                    background:
                      userDataElements?.userData?.actualState >= 4
                        ? "rgba(144, 238, 144, 0.6)"
                        : "#eee",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
                    width: "145px",
                    textAlign: "center",
                  }}
                >
                  Reviewer(s) Assigned
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    padding: "5px",
                    marginTop: "10px",
                    background: "#eee",
                    maxWidth: "127px",
                    textAlign: "center",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    transform: "translateX(-10px)",
                    color: "#6e6e6e",
                  }}
                >
                  Reviewer(s) will review and make results accordingly
                </div>
              </div>
            </div>

            {/* RESULTS RECEIVED */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  flex: 1,
                  textAlign: "right",
                  fontSize: "small",
                  color:
                    userDataElements?.userData?.actualState >= 5
                      ? "green"
                      : "#4e4e4e",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    padding: "5px",
                    background:
                      userDataElements?.userData?.actualState >= 5
                        ? "rgba(144, 238, 144, 0.6)"
                        : "#eee",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
                    width: "140px",
                    textAlign: "center",
                  }}
                >
                  Review(s) Received
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    padding: "5px",
                    marginTop: "10px",
                    background: "#eee",
                    maxWidth: "120px",
                    textAlign: "center",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    transform: "translateX(-10px)",
                    color: "#6e6e6e",
                  }}
                >
                  You can view your results in the results page
                </div>
              </div>
            </div>
          </div>
        </div>

      {openAbstract && (
            <>
              <StyledConferencePopupContainer>
                <Backdrop onClick={() => setOpenAbstract(false)} />
                <ReasonModal
                  title={userDataElements?.userData?.myStatus === "abstract rejected" ? "Recommendation" : "Remarks"}
                  reason={userDataElements?.userData?.note}
                  onClose={() => setOpenAbstract(false)}
                />
              </StyledConferencePopupContainer>
            </>
          )}

</>
          :
          <div
          // className={loading ? "loadingAnimator" : ""}
          style={{
            height: "200px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#ccc",
          }}
        >
         Loading Data
        </div>
        }
          
      </>

    </div>
  );
};

export default MyResultsChart;
