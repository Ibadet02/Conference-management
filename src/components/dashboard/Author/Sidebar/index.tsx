import { Link, NavLink } from "react-router-dom";
import { StyledAuthorSidebar } from "../../../../styles/components/dashboard/Author/Sidebar/index.styled";
import student4 from "../../../../assets/images/dummyUser.png";
import { authorSidebarLinks } from "../../../../data/components/dashboard/Author/Sidebar/AuthorSidebarLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ProjectsContext } from "../../../../context/ProjectsContext";
import { useLocation, useNavigate } from "react-router-dom";

const AuthorSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { userDetails } = useContext(ProjectsContext);

  return (
    <StyledAuthorSidebar
      style={{
        zIndex: 99,
        boxShadow: "0px 5px 50px rgba(0,0,0,0.4)",
        background: "#1e1e1e",
        minWidth: '250px'
      }}
    >
      <div className="author-sidebar__top-wrapper">
        <div
          className="author-sidebar__top"
          style={{
            color: "#fff",
            flex: 1,
            padding: "10px 5px",
            background: "rgba(255,255,255,0.2)",
            textAlign: "center",
            boxShadow: "0px 5px 10px rgba(0,0,0,0.3)",
            borderRadius: "10px",
          }}
        >
          <Link
            to="/"
            className="author-profile-link"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              flexDirection: "column",
            }}
          >
            <img
              className="author-profile-picture"
              src={student4}
              alt="author"
              style={{
                width: "50px",
                height: "auto",
                borderRadius: "50%",
                background: "#fff",
              }}
            />
            <span
              className="author-name"
              style={{ color: "#fff", fontWeight: "bold" }}
            >
              {userDetails?.firstName} {userDetails?.lastName}
            </span>
          </Link>
        </div>
        <div className="author-sidebar__middle">
          {authorSidebarLinks.map((linkBox) => {
            return (
              <div key={linkBox.id} className={linkBox.className}>
                {linkBox.heading && (
                  <h4
                    style={{
                      color: "#fff",
                      flex: 1,
                      padding: "10px 5px",
                      background: "rgba(255,255,255,0.1)",
                      textAlign: "center",
                      boxShadow: "0px 5px 10px rgba(0,0,0,0.1)",
                      borderRadius: "10px",
                    }}
                  >
                    {linkBox.heading}
                  </h4>
                )}
                <div className="links">
                  {linkBox.links.map((link) => {
                    return (
                      <NavLink
                        key={link.id}
                        className="auhtor-sidebar-link"
                        to={`/author-dashboard${link.path}`}
                      >
                        <div className="link-img-wrapper">{link.image}</div>
                        <span className="link-title">{link.title}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="author-sidebar__bottom" style={{ flex: 1 }}>
        <div
          className="auhtor-sidebar-link"
          onClick={() => {
            navigate("/", {replace: true});
          }}
          style={{
            flex: 1,
            background: "rgba(255,0,0,0.5)",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "5px",
            padding: "10px 5px",
            marginTop: "10px",
            color: "#fff",
            borderRadius: "10px",
            boxShadow: "5px 5px 10px rgba(0,0,0,0.1)",
            cursor: 'pointer'
          }}
        >
          <FontAwesomeIcon icon={faPowerOff} />
          <span className="link-title">Log Out</span>
        </div>
      </div>
    </StyledAuthorSidebar>
  );
};

export default AuthorSidebar;
