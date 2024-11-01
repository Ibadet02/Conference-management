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
  faFile,
  faBook,
  faCheckToSlot
} from "@fortawesome/free-solid-svg-icons";
import { Button, IconButton } from "@mui/material";

// ___MUI___

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
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
    <Box
      sx={{ width: 250, background: "#0f67fd", height: "100vh" }}
      role="presentation"
      onClick={() => {
        setOpen(false);
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            style={{
              background:
                currentPath === "/admin-dashboard"
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
            }}
            onClick={() => {
              navigate("/admin-dashboard");
              setOpen(false);
            }}
          >
            <ListItemIcon>
              <FontAwesomeIcon
                style={{
                  color: "#fff",
                }}
                icon={faHome}
              />
            </ListItemIcon>
            <ListItemText style={{ color: "#fff" }} primary={"Home"} />
          </ListItemButton>
        </ListItem>

        
        <ListItem disablePadding>
          <ListItemButton
            style={{
              background:
                currentPath === "/admin-dashboard/create-conference"
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
            }}
            onClick={() => {
              navigate("/admin-dashboard/create-conference");
              setOpen(false);
            }}
          >
            <ListItemIcon>
              <FontAwesomeIcon
                style={{
                  color: "#fff",
                }}
                icon={faArchive}
              />
            </ListItemIcon>
            <ListItemText
              style={{ color: "#fff" }}
              primary={"Create Conference"}
            />
          </ListItemButton>
        </ListItem>

        
        <ListItem disablePadding>
          <ListItemButton
            style={{
              background:
                currentPath === "/admin-dashboard/all-conferences"
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
            }}
            onClick={() => {
              navigate("/admin-dashboard/all-conferences");
              setOpen(false);
            }}
          >
            <ListItemIcon>
              <FontAwesomeIcon
                style={{
                  color: "#fff",
                }}
                icon={faPeopleGroup}
              />
            </ListItemIcon>
            <ListItemText
              style={{ color: "#fff" }}
              primary={"All Conferences"}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            style={{
              background:
                currentPath === "/admin-dashboard/abstracts"
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
            }}
            onClick={() => {
              navigate("/admin-dashboard/abstracts");
              setOpen(false);
            }}
          >
            <ListItemIcon>
              <FontAwesomeIcon
                style={{
                  color: "#fff",
                }}
                icon={faCheckToSlot}
              />
            </ListItemIcon>
            <ListItemText style={{ color: "#fff" }} primary={"Abstracts"} />
          </ListItemButton>
        </ListItem>


        <ListItem disablePadding>
          <ListItemButton
            style={{
              background:
                currentPath === "/admin-dashboard/papers"
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
            }}
            onClick={() => {
              navigate("/admin-dashboard/papers");
              setOpen(false);
            }}
          >
            <ListItemIcon>
              <FontAwesomeIcon
                style={{
                  color: "#fff",
                }}
                icon={faFile}
              />
            </ListItemIcon>
            <ListItemText style={{ color: "#fff" }} primary={"Papers"} />
          </ListItemButton>
        </ListItem>


        <ListItem disablePadding>
          <ListItemButton
            style={{
              background:
                currentPath === "/admin-dashboard/confirm-review"
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
            }}
            onClick={() => {
              navigate("/admin-dashboard/confirm-review");
              setOpen(false);
            }}
          >
            <ListItemIcon>
              <FontAwesomeIcon
                style={{
                  color: "#fff",
                }}
                icon={faSquarePollVertical}
              />
            </ListItemIcon>
            <ListItemText
              style={{ color: "#fff" }}
              primary={"Confirm Review"}
            />
          </ListItemButton>
        </ListItem>

        

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              auth.signOut();
              navigate("/");
              setOpen(false);
            }}
          >
            <ListItemIcon>
              <FontAwesomeIcon
                style={{
                  color: "#fff",
                }}
                icon={faSignOutAlt}
              />
            </ListItemIcon>
            <ListItemText style={{ color: "#fff" }} primary={"Sign Out"} />
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
              <IconButton
                id={"icon"}
                onClick={() => {
                  setOpen(true);
                }}
              >
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
              className={currentPath === "/admin-dashboard" ? "selected" : ""}
              to="/admin-dashboard"
            >
              <IconButton id={"icon"}>
                <FontAwesomeIcon
                  style={{
                    color:
                      currentPath !== "/admin-dashboard"
                        ? "#5e5e5e"
                        : "#0f67fd",
                  }}
                  icon={faHome}
                />
              </IconButton>
              {!isSidebarExpanded && <span>Home</span>}
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
                currentPath === "/admin-dashboard/create-conference"
                  ? "selected"
                  : ""
              }
              to="/admin-dashboard/create-conference"
            >
              <IconButton>
                <FontAwesomeIcon
                  style={{
                    color:
                      currentPath !== "/admin-dashboard/create-conference"
                        ? "#5e5e5e"
                        : "#0f67fd",
                  }}
                  icon={faArchive}
                />
              </IconButton>
              {!isSidebarExpanded && <span>Create Conference</span>}
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
                currentPath === "/admin-dashboard/all-conferences"
                  ? "selected"
                  : ""
              }
              to="/admin-dashboard/all-conferences"
            >
              <IconButton>
                <FontAwesomeIcon
                  style={{
                    color:
                      currentPath !== "/admin-dashboard/all-conferences"
                        ? "#5e5e5e"
                        : "#0f67fd",
                  }}
                  icon={faPeopleGroup}
                />
              </IconButton>
              {!isSidebarExpanded && <span>All Conferences</span>}
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
                currentPath === "/admin-dashboard/abstracts" ? "selected" : ""
              }
              to="/admin-dashboard/abstracts"
            >
              <IconButton>
                <FontAwesomeIcon
                  style={{
                    color:
                      currentPath !== "/admin-dashboard/abstracts"
                        ? "#5e5e5e"
                        : "#0f67fd",
                  }}
                  icon={faCheckToSlot}
                />
              </IconButton>
              {!isSidebarExpanded && <span>Abstracts</span>}
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
                currentPath === "/admin-dashboard/papers" ? "selected" : ""
              }
              to="/admin-dashboard/papers"
            >
              <IconButton>
                <FontAwesomeIcon
                  style={{
                    color:
                      currentPath !== "/admin-dashboard/papers"
                        ? "#5e5e5e"
                        : "#0f67fd",
                  }}
                  icon={faFile}
                />
              </IconButton>
              {!isSidebarExpanded && <span>Papers</span>}
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
                currentPath === "/admin-dashboard/confirm-review"
                  ? "selected"
                  : ""
              }
              to="/admin-dashboard/confirm-review"
            >
              <IconButton>
                <FontAwesomeIcon
                  style={{
                    color:
                      currentPath !== "/admin-dashboard/confirm-review"
                        ? "#5e5e5e"
                        : "#0f67fd",
                  }}
                  icon={faSquarePollVertical}
                />
              </IconButton>
              {!isSidebarExpanded && <span>Confirm Review</span>}
            </Link>
          </li>


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
                console.log("SIGNING OUT");
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

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default ProfileSidebar;
