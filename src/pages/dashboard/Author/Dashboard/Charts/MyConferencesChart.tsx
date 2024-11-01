import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import useAuthentication from "../../../../../hooks/useAuthentication";
import useUserAppliedProjects from "../../../../../hooks/useUserAppliedProjects"; // Adjust the path

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../../../firebase/index";
import useUserData from "../../../../../hooks/useUserData";
import classes from "./MyConferencesChart.module.css";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"

const MyConferencesChart: React.FC = () => {
  const { userData } = useUserData();

  


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
  
    // Cleanup function to clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);


  const navigate = useNavigate();

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
          MY CONFERENCE ACTION
        </div>
        {
          !loading ?

          
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            height: "90%",
          }}
        >

      { userData?.blocked ?
                      <div
              
            onClick={() => {
              navigate("/author-dashboard/my-conferences");
            }}
                        className={classes.actionContainer}
                      >
                        Abstract Blocked
                      </div>
                      :
                      <>
          {!userData?.actualState && (
            <div
              onClick={() => {
                navigate("/author-dashboard/my-conferences");
              }}
              className={classes.actionContainer}
            >
              Send Abstract
            </div>
          )}
          {userData?.actualState === 1 &&
            (userData?.myStatus === "abstract rejected" ? (
              <div
            onClick={() => {
              navigate("/author-dashboard/my-conferences");
            }}
            className={classes.actionContainer}
          >
            Update Abstract
          </div>
            ) : (
              userData?.myStatus === "abstract updated" ? 
              <div
              onClick={() => {
                navigate("/author-dashboard/my-conferences");
              }}
              className={classes.actionContainer}
            >
              Abstract Updated
            </div>
            :
              <div
              onClick={() => {
                navigate("/author-dashboard/my-conferences");
              }}
                className={classes.actionContainer}
              >
                Abstract Sent
              </div>
            ))}

          {userData?.actualState === 2 &&
            <div
            onClick={() => {
              navigate("/author-dashboard/my-conferences");
            }}
            className={classes.actionContainer}
          >
            Send Paper
          </div>
          }

          
{userData?.actualState === 3 &&
              <div
              onClick={() => {
                navigate("/author-dashboard/my-conferences");
              }}
                className={classes.actionContainer}
              >
                Paper Sent
              </div>
          }

{userData?.actualState === 4 &&
              <div
              onClick={() => {
                navigate("/author-dashboard/my-conferences");
              }}
                className={classes.actionContainer}
              >
                Reviewer Assigned
              </div>
          }

          
{userData?.actualState === 5 &&
      <>
      {
        userData?.reviewResult === "Weak Accept" ?
        
        <div
        onClick={() => {
          navigate("/author-dashboard/my-conferences");
        }}
        className={classes.actionContainer}
      >
        Improve Paper
      </div>
      :
      
      <div
      onClick={() => {
        navigate("/author-dashboard/reviewer-response");
      }}
      className={classes.actionContainer}
    >
      Results Received
    </div>
      }
      </>
          }
            </>
}
        </div>
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

export default MyConferencesChart;

// const MyConferencesChart: React.FC = () => {
//   const [userAppliedProjectsData, setUserAppliedProjectsData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const authUser = useAuthentication();
//   const vibrantColors = [
//     "#FF5733",
//     "#FFC300",
//     "#DAF7A6",
//     "#FFC0CB",
//     "#7FFFD4",
//     "#FF6347",
//   ]; // Vibrant bright colors for the bars
//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       setLoading(true);
//       const paperSubmissionsRef = collection(db, "paperSubmissions");
//       const querySnapshot = await getDocs(
//         query(
//           paperSubmissionsRef,
//           where("userId", "==", authUser?.uid)
//         )
//       );

//       const submissionData = querySnapshot.docs.map((doc) => doc.data());
//       setUserAppliedProjectsData(submissionData);

//       setLoading(false);
//     };

//     if (authUser?.uid) {
//       fetchSubmissions();
//     }
//   }, [authUser]);

//   const chartData = userAppliedProjectsData.map((project) => {
//     return [
//       project.abstract, // Assuming projectId is the title of the conference
//       project.authors.length, // Number of authors
//     ];
//   });

//   const options = {
//     title: "",
//     enableInteractivity: false,
//     animation: {
//       startup: true,
//       easing: "linear",
//       duration: 1500,
//     },
//     hAxis: {
//       title: "Conferences",
//       textPosition: 'none',
//     },
//     vAxis: {
//       title: "Number of Authors",
//       minValue: 0,
//     },
//     colors: vibrantColors,
//   };

//   return (
//     <div
//       style={{
//         flex: 1,
//         background: "rgba(255,255,255,1)",
//         padding: "1rem",
//         borderRadius: "1rem",
//         boxShadow: "5px 5px 20px rgba(0,0,0,0.2)",
//         minWidth: '300px'
//       }}
//     >

//         <>
//           <div
//             style={{
//               width: "100%",
//               fontWeight: "bolder",
//               textAlign: "center",
//               color: "#2e2e2e",
//             }}
//           >
//             MY CONFERENCES
//           </div>
//           {userAppliedProjectsData?.length > 0 ? (
//             <Chart
//               chartType="ColumnChart"
//               data={[["Conferences", "Number of Authors"], ...chartData]}
//               options={options}
//               width="100%"
//               height="200px"
//               legendToggle
//             />
//           ) : (
//             <div
//             className={loading ? "loadingAnimator" : ""}
//               style={{
//                 height: "200px",
//                 width: "100%",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 fontSize: "1.5rem",
//                 fontWeight: "bold",
//                 color: "#ccc",
//               }}
//             >
//               {loading ? "Loading Data" : "No Data"}
//             </div>
//           )}
//         </>
//     </div>
//   );
// };
