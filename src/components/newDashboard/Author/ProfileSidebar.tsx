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
                        currentPath === "/author-dashboard"
                          ? "rgba(255,255,255,0.2)"
                          : "transparent",
            }}
            onClick={() => {
              navigate("/author-dashboard");
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
              <ListItemText style={{color: '#fff'}} primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>

          
          <ListItem disablePadding>
            <ListItemButton 
            
            style={{
              background:
                        currentPath === "/author-dashboard/my-conferences"
                          ? "rgba(255,255,255,0.2)"
                          : "transparent",
            }}
            onClick={() => {
              navigate("/author-dashboard/my-conferences");
              setOpen(false);
            }}>
              <ListItemIcon>
              <FontAwesomeIcon
                    style={{
                      color:"#fff"
                    }}
                    icon={faArchive}
                  />
              </ListItemIcon>
              <ListItemText style={{color: '#fff'}} primary={"My Conferences"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton 
            style={{
              background:
                        currentPath === "/author-dashboard/all-conferences"
                          ? "rgba(255,255,255,0.2)"
                          : "transparent",
            }}
            onClick={() => {
              navigate("/author-dashboard/all-conferences");
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
          </ListItem>

          
          <ListItem disablePadding>
            <ListItemButton 
            style={{
              background:
                        currentPath === "/author-dashboard/reviewer-response"
                          ? "rgba(255,255,255,0.2)"
                          : "transparent",
            }}onClick={() => {

              navigate("/author-dashboard/reviewer-response");
              setOpen(false);
            }}>
              <ListItemIcon>
              <FontAwesomeIcon
                    style={{
                      color:"#fff"
                    }}
                    icon={faSquarePollVertical}
                  />
              </ListItemIcon>
              <ListItemText style={{color: '#fff'}} primary={"Results"} />
            </ListItemButton>
          </ListItem>
          

          {/* <ListItem disablePadding>
            <ListItemButton onClick={() => {
              navigate("/author-dashboard/profile");
              setOpen(false);
            }}>
              <ListItemIcon>
              <FontAwesomeIcon
                    style={{
                      color:"#fff"
                    }}
                    icon={faUser}
                  />
              </ListItemIcon>
              <ListItemText style={{color: '#fff'}} primary={"Profile"} />
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
              className={currentPath === "/author-dashboard" ? "selected" : ""}
              to="/author-dashboard"
            >
                <IconButton id={"icon"}>
                  <FontAwesomeIcon
                    style={{
                      color:
                        currentPath !== "/author-dashboard"
                          ? "#5e5e5e"
                          : "#0f67fd",
                    }}
                    icon={faHome}
                  />
                </IconButton>
              {!isSidebarExpanded && <span >Dashboard</span>}
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
                currentPath === "/author-dashboard/my-conferences" ? "selected" : ""
              }
              to="/author-dashboard/my-conferences"
            >
              <IconButton>
                <FontAwesomeIcon
                  style={{
                    color:
                      currentPath !== "/author-dashboard/my-conferences"
                        ? "#5e5e5e"
                        : "#0f67fd",
                  }}
                  icon={faArchive}
                />
              </IconButton>
              {!isSidebarExpanded && <span>My Conferences</span>}
            </Link>
          </li>

          <li>
            <Link
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: isSidebarExpanded ? "center" : "flex-start"
              }}
              className={
                currentPath === "/author-dashboard/all-conferences"
                  ? "selected"
                  : ""
              }
              to="/author-dashboard/all-conferences"
            >
                <IconButton id={"icon"}>
                  <FontAwesomeIcon
                    style={{
                      color:
                        currentPath !== "/author-dashboard/all-conferences"
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
                currentPath === "/author-dashboard/reviewer-response"
                  ? "selected"
                  : ""
              }
              to="/author-dashboard/reviewer-response"
            >
              <IconButton id={"icon"}>
                <FontAwesomeIcon
                  style={{
                    color:
                      currentPath !== "/author-dashboard/reviewer-response"
                        ? "#5e5e5e"
                        : "#0f67fd",
                  }}
                  icon={faSquarePollVertical}
                />
              </IconButton>
              {!isSidebarExpanded && <span>Results</span>}
            </Link>
          </li>


          {/* <li>
            <Link
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: isSidebarExpanded ? "center" : "flex-start",
              }}
              className={
                currentPath === "/author-dashboard/profile" ? "selected" : ""
              }
              to="/author-dashboard/profile"
            >
              <IconButton>
                <FontAwesomeIcon
                  style={{
                    color:
                      currentPath !== "/author-dashboard/profile"
                        ? "#5e5e5e"
                        : "#0f67fd",
                  }}
                  icon={faUser}
                />
              </IconButton>
              {!isSidebarExpanded && <span>Profile</span>}
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
