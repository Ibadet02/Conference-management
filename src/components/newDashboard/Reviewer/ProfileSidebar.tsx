import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import "./ProfileSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSignOutAlt,
  faUser,
  faPeopleGroup,
  faHome,
  faSquarePollVertical,
  faBoxArchive,
  faArchive,
  faFile
} from "@fortawesome/free-solid-svg-icons";
import { Button, IconButton } from "@mui/material";

// ___MUI___

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { auth } from "../../../firebase/index";

const ProfileSidebar = () => {
  const [logoutModal, setLogoutModal] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [currentPath, setCurrentPath] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  function toggleSidebar() {
    setIsSidebarExpanded(!isSidebarExpanded);
  }

  // ________________________________MATERIAL UI DRAWER________________

  const [open, setOpen] = useState(false);

  const toggleDrawer = (e) => () => {
    setOpen(e);
  };

  const DrawerList = (
    <Box  sx={{ width: 250, background: '#0f67fd', height: '100vh' }} role="presentation" onClick={() => {setOpen(false)}}>
      <List>
          <ListItem disablePadding>
            <ListItemButton 
            style={{
              background:
                        currentPath === "/reviewer-dashboard"
                          ? "rgba(255,255,255,0.2)"
                          : "transparent",
            }}
            onClick={() => {
              navigate("/reviewer-dashboard");
              setOpen(false);
            }}>
              <ListItemIcon>
              <FontAwesomeIcon
                    style={{
                      color:"#fff"
                    }}
                    icon={faHome}
                  />
              </ListItemIcon>
              <ListItemText style={{color: '#fff'}} primary={"Home"} />
            </ListItemButton>
          </ListItem>

          
          <ListItem disablePadding>
            <ListItemButton 
            
            style={{
              background:
                        currentPath === "/reviewer-dashboard/assess-papers"
                          ? "rgba(255,255,255,0.2)"
                          : "transparent",
            }}
            onClick={() => {
              navigate("/reviewer-dashboard/assess-papers");
              setOpen(false);
            }}>
              <ListItemIcon>
              <FontAwesomeIcon
                    style={{
                      color:"#fff"
                    }}
                    icon={faFile}
                  />
              </ListItemIcon>
              <ListItemText style={{color: '#fff'}} primary={"Assess Papers"} />
            </ListItemButton>
          </ListItem>


          {/* <ListItem disablePadding>
            <ListItemButton 
            style={{
              background:
                        currentPath === "/author-dashboard/all-conferences"
                          ? "rgba(255,255,255,0.2)"
                          : "transparent",
            }}
            onClick={() => {
              navigate("/reviewer-dashboard/all-conferences");
              setOpen(false);
            }}>
              <ListItemIcon>
              <FontAwesomeIcon
                    style={{
                      color:"#fff"
                    }}
                    icon={faPeopleGroup}
                  />
              </ListItemIcon>
              <ListItemText style={{color: '#fff'}} primary={"All Conferences"} />
            </ListItemButton>
          </ListItem> */}

          
          <ListItem disablePadding>
            <ListItemButton onClick={() => {
              auth.signOut();
              navigate("/");
              setOpen(false);
            }}>
              <ListItemIcon>
              <FontAwesomeIcon
                    style={{
                      color:"#fff"
                    }}
                    icon={faSignOutAlt}
                  />
              </ListItemIcon>
              <ListItemText style={{color: '#fff'}} primary={"Sign Out"} />
            </ListItemButton>
          </ListItem>

      </List>
    </Box>
  );



  return (
    <div className={isSidebarExpanded ? "sidebar expanded" : "sidebar"}>
      <div className="content">
        <ul>
          <li>
            <Link
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              to="#"
            >
              <IconButton id={"icon"} onClick={() => {setOpen(true)}}>
                <FontAwesomeIcon icon={faBars} style={{ color: "#5e5e5e" }} />
              </IconButton>
            </Link>
          </li>

          <li>
            <Link
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: isSidebarExpanded ? "center" : "flex-start",
              }}
              className={currentPath === "/reviewer-dashboard" ? "selected" : ""}
              to="/reviewer-dashboard"
            >
                <IconButton id={"icon"}>
                  <FontAwesomeIcon
                    style={{
                      color:
                        currentPath !== "/reviewer-dashboard"
                          ? "#5e5e5e"
                          : "#0f67fd",
                    }}
                    icon={faHome}
                  />
                </IconButton>
              {!isSidebarExpanded && <span >Home</span>}
            </Link>
          </li>

          
          <li>
            <Link
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: isSidebarExpanded ? "center" : "flex-start",
              }}
              className={
                currentPath === "/reviewer-dashboard/assess-papers" ? "selected" : ""
              }
              to="/reviewer-dashboard/assess-papers"
            >
              <IconButton>
                <FontAwesomeIcon
                  style={{
                    color:
                      currentPath !== "/reviewer-dashboard/assess-papers"
                        ? "#5e5e5e"
                        : "#0f67fd",
                  }}
                  icon={faFile}
                />
              </IconButton>
              {!isSidebarExpanded && <span>Assess Papers</span>}
            </Link>
          </li>



          {/* <li>
            <Link
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: isSidebarExpanded ? "center" : "flex-start"
              }}
              className={
                currentPath === "/reviewer-dashboard/all-conferences"
                  ? "selected"
                  : ""
              }
              to="/reviewer-dashboard/all-conferences"
            >
                <IconButton id={"icon"}>
                  <FontAwesomeIcon
                    style={{
                      color:
                        currentPath !== "/reviewer-dashboard/all-conferences"
                          ? "#5e5e5e"
                          : "#0f67fd",
                    }}
                    icon={faPeopleGroup}
                  />
                </IconButton>
              {!isSidebarExpanded && (
                <span >All Conferences</span>
              )}
            </Link>
          </li> */}

          {/* Add more menu items here */}
          <li>
            <Link
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: isSidebarExpanded ? "center" : "flex-start",
              }}
              to="/"
              onClick={() => {
                auth.signOut();
              }}
            >
              <IconButton>
                <FontAwesomeIcon
                  style={{ color: "#5e5e5e" }}
                  icon={faSignOutAlt}
                />
              </IconButton>
              {!isSidebarExpanded && <span>Sign Out</span>}
            </Link>
          </li>
        </ul>
      </div>

      <Drawer  open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default ProfileSidebar;
