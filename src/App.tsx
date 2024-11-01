import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";
import DashboardLayout from "./DashboardLayout";
import Home from "./pages/default/Home/index";
import { styled } from "styled-components";
import { Theme } from "./types/default/types";
import About from "./pages/default/About";
import MyConference from "./pages/dashboard/Author/Dashboard";
import AllConferences from "./pages/dashboard/Author/AllConferences";
import RegisterForm from "./pages/Form/registration";
import LoginForm from "./pages/Form/login";
import { ProjectsProvider } from "./context/ProjectsContext";
import ReviewerResponse from "./pages/dashboard/Author/Results";
import SubmittedConferences from "./pages/dashboard/Reviewer/SubmittedConferences";
import { GlobalStyle } from "./styles/globalStyle";
import useAuthentication from "./hooks/useAuthentication";
import { useTheme } from "./context/ThemeContext";
import { useEffect } from "react";
import AuthorNavbar from "./components/dashboard/Author/Navbar";
import AuthorSidebar from "./components/dashboard/Author/Sidebar";
import AdminSidebar from "./components/dashboard/Admin/Sidebar";
import CreateConference from "./pages/dashboard/Admin/CreateConference";
import ConfirmReview from "./pages/dashboard/Admin/ConfirmReview";
import Papers from "./pages/dashboard/Admin/Papers";
import { Toaster } from "react-hot-toast";
import MaterialUI from "./types/components/dashboard/mutual/MaterialUI";
import ReviewerNavbar from "./components/dashboard/Reviewer/Navbar/index";
import ReviewerSidebar from "./components/dashboard/Reviewer/Sidebar/index";
import AdminNavbar from "./components/dashboard/Admin/Navbar/index";
import Layout from "./components/newDashboard/Author/Layout.js";
import Profile from "./pages/dashboard/Author/Profile/index.js";
import MyConferencesPage from "./pages/dashboard/Author/MyConferences/index.js";
import ReviewerLayout from "./components/newDashboard/Reviewer/Layout";
import ReviewerDashboard from "./pages/dashboard/Reviewer/Dashboard/index";
import AdminLayout from "./components/newDashboard/Admin/Layout";
import AdminDashboard from "./pages/dashboard/Admin/Dashboard/index";
import NoPageAvailable from "./pages/NoPageAvailable/NoPageAvailable";
import { auth } from "./firebase";
import "./style.css";
import ApprovaAbstract from "./pages/dashboard/Admin/ApprovaAbstract/index";
import PaperAssessmentForm from "./pages/dashboard/Reviewer/PaperAssesment/index";

const StyledMain = styled.main<{ theme: Theme }>`
  /* ${({ theme }) => theme.heights.footerHeight}; */
  height: ${({ theme }) => (theme.isUserLoggedIn ? "100vh" : "auto")};
  width: 100%;
  background-color: ${({ theme }) =>
    theme.isUserLoggedIn ? theme.dashboards.author.colors.primaryBG : ""};
  position: ${({ theme }) => (theme.isUserLoggedIn ? "relative" : "static")};
  display: flex;
`;

function App() {
  const { theme, updateTheme } = useTheme();
  const authUser = useAuthentication();

  // auth.signOut();

  const handleModeChange = () => {
    updateTheme((prevTheme) => ({
      ...prevTheme,
      isUserLoggedIn: authUser === null ? false : true,
    }));
  };
  useEffect(() => {
    handleModeChange();
  }, [authUser]);
  return (
    <div className="App">
      <ProjectsProvider>
        <GlobalStyle theme={theme} />
        <StyledMain>
          <Routes>
            <Route path="*" element={<NoPageAvailable />} />
            <Route path="/signin" element={<LoginForm />} />
            <Route path="/signup" element={<RegisterForm />} />
            <Route path="/">
              <Route element={<DefaultLayout />} id="defaultRoute">
                <Route index element={<Home />} />
                <Route path="/about" element={<Home />} />
                <Route path="/contact" element={<Home />} />
                <Route path="/how-it-works" element={<Home />} />
              </Route>
            </Route>
            {authUser ? (
              <>
                {/* AUTHOR DASHBOARD */}
                <>
                  <Route
                    path="/author-dashboard"
                    element={<Layout></Layout>}
                    id="dashboardRoute"
                  >
                    <Route
                      path="/author-dashboard"
                      index
                      element={<MyConference />}
                    />
                    <Route
                      path="/author-dashboard/all-conferences"
                      element={<AllConferences />}
                    />
                    <Route
                      path="/author-dashboard/reviewer-response"
                      element={<ReviewerResponse />}
                    />

                    <Route
                      path="/author-dashboard/my-conferences"
                      element={<MyConferencesPage />}
                    />
                  </Route>
                </>
                {/* REVIEWER DASHBOARD */}
                <>
                  <Route
                    path="/reviewer-dashboard"
                    element={<ReviewerLayout></ReviewerLayout>}
                  >
                    <Route
                      path="/reviewer-dashboard"
                      index
                      element={<ReviewerDashboard />}
                    />
                    <Route
                      path="/reviewer-dashboard/assess-papers"
                      index
                      element={<SubmittedConferences />}
                    />

                    <Route
                      path="/reviewer-dashboard/assess-papers/:id"
                      index
                      element={<PaperAssessmentForm />}
                    />
                    {/* <Route
                      path="/reviewer-dashboard/all-conferences"
                      element={<AllConferences />}
                    /> */}
                  </Route>
                </>
                {/* ADMIN DASHBOARD */}
                <>
                  <Route
                    path="/admin-dashboard"
                    element={<AdminLayout></AdminLayout>}
                  >
                    <Route
                      path="/admin-dashboard/"
                      index
                      element={<AdminDashboard />}
                    />
                    <Route
                      path="/admin-dashboard/create-conference"
                      index
                      element={<CreateConference />}
                    />
                    <Route
                      path="/admin-dashboard/abstracts"
                      element={<ApprovaAbstract />}
                    />
                    <Route
                      path="/admin-dashboard/papers"
                      element={<Papers />}
                    />
                    <Route
                      path="/admin-dashboard/confirm-review"
                      element={<ConfirmReview />}
                    />
                    <Route
                      path="/admin-dashboard/all-conferences"
                      element={<AllConferences />}
                    />
                  </Route>
                </>
              </>
            ) : (
              <></>
            )}
          </Routes>
          <Toaster />
          <MaterialUI />
        </StyledMain>
      </ProjectsProvider>
    </div>
  );
}

export default App;
