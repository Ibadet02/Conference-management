import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import { StyledNavbar } from "../../../styles/components/default/Navbar/index.styled";
import { Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <StyledNavbar>
        {
          true ? <NavbarDesktop /> : <NavbarMobile />
        }
      </StyledNavbar>
      <Outlet />
    </>
  )
}

export default Navbar;