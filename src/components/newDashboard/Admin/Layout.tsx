import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import classes from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import useGetAdminData from "../../../hooks/useGetAdminData";
// import useGetReviewerData from "../../../hooks/useGetReviewerData";
import useAuthentication from "../../../hooks/useAuthentication";
import { db } from "../../../firebase/index";
import { doc, onSnapshot } from "firebase/firestore";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const authUser = useAuthentication();

  const [currentPathName, setCurrentPathName] = useState("")


  useEffect(() => {
    if(location.pathname === "/admin-dashboard"){
      setCurrentPathName("Home")
    }
    else if(location.pathname === "/admin-dashboard/papers"){
      setCurrentPathName("Papers")
    }
    else if(location.pathname === "/admin-dashboard/all-conferences"){
      setCurrentPathName("All Conferences")
    }
    else if(location.pathname === "/admin-dashboard/abstracts"){
      setCurrentPathName("Abstracts")
    }
    else if(location.pathname === "/admin-dashboard/create-conference"){
      setCurrentPathName("Create Conference")
    }
    
    else if(location.pathname === "/admin-dashboard/confirm-review"){
      setCurrentPathName("Confirm Review")
    }

  }, [location])

  
  const navigate=useNavigate();

  useEffect(() => {
    const userRole=localStorage.getItem("userRole")
    if(userRole!=="admin"){
      navigate('/')
    }
  }, [])

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const authUid = authUser?.uid;
  //       const authorUserDocRef = doc(db, "adminUsers", authUid);
  //       const unsubscribe = onSnapshot(authorUserDocRef, (snapshot) => {
  //         if (!snapshot.exists()) {
  //           console.log("DOC NOT FOUND")
  //           navigate("/");
  //           return;
  //         }
  //       });
  
  //       return () => {
  //         unsubscribe();
  //       };
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };
  
  //   if (authUser?.uid) {
  //     // Delay execution by 1 second
  //     const timer = setTimeout(() => {
  //       fetchUserData();
  //     }, 1000);
  
  //     return () => clearTimeout(timer); // Clean up the timer
  //   }
  // }, [authUser?.uid]);
  

  
  // const userDataElements = useGetReviewerData();

  const containerRef = useRef<HTMLDivElement>(null);

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 900);
  };

  useEffect(() => {
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  return (
    <div className={classes.secondContainer}>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "stretch",
          width: "100vw",
          bottom: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            boxShadow: "0px 10px 10px rgba(0,0,0,0.3)",
            flex: 1,
            overflow: "hidden",
            display: "flex",
            margin: isMobile ? "10px" : "2rem",
            background: "#bccdea",
            borderRadius: "20px",
          }}
        >
          <ProfileSidebar />
          <div
            style={{
              flex: 1,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                flex: 1,
                width: "100%",
                padding: "10px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#0f67fd",
                color: "#fff",
                fontWeight: "bolder",
                height: '10%',
                boxShadow: "0px 5px 20px rgba(0,0,0,0.2)"
              }}
            >
              <div>Admin Dashboard / {currentPathName}</div>
              {/* {userDataElements?.userData?.firstName && 
              <div
                style={{
                  margin: "5px 10px",
                  padding: "5px 10px",
                  background: "#fff",
                  boxShadow: "0px 5px 10px rgba(0,0,0,0.1)",
                  borderRadius: '5px',
                  color: '#0f67fd'
                }}
              >
                {userDataElements?.userData?.firstName} {userDataElements?.userData?.lastName}
              </div>
              } */}
            </div>
            <div
              className={classes.scrollContainer}
              style={{
                flex: 1,
                overflow: "auto",
                height: "90%",
                width: "100%",
              }}
              ref={containerRef}
            >
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
