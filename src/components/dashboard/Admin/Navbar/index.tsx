import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledAuthorNavbar } from "../../../../styles/components/dashboard/Author/Navbar/index.styled";
import {
  faBell,
  faMagnifyingGlass,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import SunSVG from "../../../../assets/images/SunSVG";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminNavbar = () => {
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState("Create Conference");

  useEffect(() => {
    if (location.pathname === "/admin-dashboard/") {
      setCurrentLocation("Create Conference");
    } else if (location.pathname === "/admin-dashboard/papers") {
      setCurrentLocation("Papers");
    } else if (location.pathname === "/admin-dashboard/confirm-review") {
      setCurrentLocation("Confirm Review");
    }
  }, [location.pathname]);

  return (
    <StyledAuthorNavbar style={{ boxShadow: "20px 5px 20px rgba(0,0,0,0.1)" }}>
      <div className="author-navbar__left">
        <span className="previous-page-name">Admin Dashboard</span>
        <span className="slash">/</span>
        <span className="current-page-name">{currentLocation}</span>
      </div>
      {/* <div className="author-navbar__right">
        <label className="search-input-box" htmlFor="author-navbar-search-input">
          <input type="text" placeholder="Search" id="author-navbar-search-input"/>
          <button className="search-input-button">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </label>
        <button className="author-navbar-button darkmode-button">
          <SunSVG />
        </button>
        <button className="author-navbar-button reload-button">
          <FontAwesomeIcon icon={faRotateRight} />
        </button>
        <button className="author-navbar-button notifications-button">
          <FontAwesomeIcon icon={faBell} />
        </button>
      </div> */}
    </StyledAuthorNavbar>
  );
};

export default AdminNavbar;
