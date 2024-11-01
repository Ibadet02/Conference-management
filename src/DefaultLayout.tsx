import { Outlet } from "react-router-dom";
import Footer from "./components/default/Footer";
import Navbar from "./components/default/Navbar/index";
// import NavBar from "./components/Navbar";

const DefaultLayout = () => {
  return (
    <section style={{ width: "100%", flex: 1 }}>
      <Navbar />
      <Footer />
      {/* <Outlet /> */}
    </section>
  );
};

export default DefaultLayout;
