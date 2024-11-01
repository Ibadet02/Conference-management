import React, { useState } from "react";
import { StyledDashboardPageLayout } from "../../../../styles/pages/dashboard/DashboardPageLayout.styled";
import useGetCollection from "../../../../hooks/useGetCollection";
import useAuthentication from "../../../../hooks/useAuthentication";
import thirdConference from "../../../../assets/images/thirdConference.jpg";
import useGetProjects from "../../../../hooks/useGetProjects";
import Button from "@mui/material/Button";
import { StyledConferencePopupContainer } from "../../../../styles/pages/dashboard/Author/AllConferences/ConferencePopupContainer.styled";
import Backdrop from "../../../../components/dashboard/mutual/Backdrop";
import ShowInfo from "./ShowInfo";

const Results = () => {
  const { collectionState, loading } = useGetCollection("finalReviews");
  const { projects } = useGetProjects();
  const authUser = useAuthentication();

  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  
  const maxTableContentLength = 15;
  const handleOverflowedText = (givenText: string) => {
    if (givenText.length > maxTableContentLength) {
      return `${givenText.substring(0, maxTableContentLength)}...`;
    } else {
      return givenText;
    }
  };

  // const loading = true;
  // const collectionState={collection: []};

  return (
    <StyledDashboardPageLayout style={{ overflow: "hidden" }}>
      <div
        style={{ flex: 1, padding: "1rem", overflow: "auto", height: "100%" }}
      >
        <div
          className="first-name"
          style={{
            margin: "1rem",
            flex: 1,
            background: "rgba(255,255,255,1)",
            padding: "1rem",
            borderRadius: "1rem",
            boxShadow: "5px 5px 20px rgba(0,0,0,0.3)",
          }}
        >
          <div
            style={{
              width: "100%",
              fontWeight: "bolder",
              textAlign: "center",
              color: "#2e2e2e",
              marginBottom: "15px",
            }}
          >
            REVIEWS
          </div>

          <div
            style={{
              flex: 1,
              padding: "10px",
              background: "#fff",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
                overflow: "auto",
              }}
            >
              {(!loading && collectionState?.collection.filter(
                      (result) => result.correspondingAuthor === authUser?.uid
                    )?.length > 0) ? (
                <table
                  style={{
                    color: "#5e5e5e",
                    border: "1px solid #ccc",
                    width: "100%",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ border: "1px solid #ccc" }}>
                        Project Title
                      </th>
                      <th style={{ border: "1px solid #ccc" }}>Abstract</th>
                      <th style={{ border: "1px solid #ccc" }}>
                        Corresponding Author Reviews
                      </th>
                      <th style={{ border: "1px solid #ccc" }}>Result</th>
                      <th style={{ border: "1px solid #ccc" }}>More Info</th>
                    </tr>
                  </thead>
                  <tbody>
                      <>
                        {collectionState?.collection
                          .filter(
                            (result) =>
                              result.correspondingAuthor === authUser?.uid
                          )
                          .map((res, index) => (
                            <tr>
                              <td
                                style={{ border: "1px solid #ccc" }}
                                title={res.abstract}
                              >
                                {
                                  projects?.find(
                                    (e) => e?.id === res?.projectId
                                  )?.title
                                }
                              </td>
                              <td
                                style={{ border: "1px solid #ccc" }}
                                title={res.abstract}
                              >
                                {handleOverflowedText(res?.abstract)}
                              </td>

                              <td
                                style={{ border: "1px solid #ccc" }}
                                title={res.abstract}
                              >
                                {res?.reviews?.length > 0 ? (
                                  <>
                                    {res?.reviews?.map((item, index) => (
                                      <div
                                        style={{
                                          background:
                                            item?.assesmentData
                                              ?.recommendation ===
                                            "Strong Accept"
                                              ? "#28a745"
                                              : item?.assesmentData
                                                  ?.recommendation === "Accept"
                                              ? "#6f42c1"
                                              : item?.assesmentData
                                                  ?.recommendation ===
                                                "Weak Accept"
                                              ? "#fd7e14"
                                              : "#dc3545",
                                          padding: "9px 5px",
                                          color: "#fff",
                                          margin: "2px",
                                        }}
                                      >
                                        Reviewer{index + 1}:{" "}
                                        {item?.assesmentData?.recommendation}
                                      </div>
                                    ))}
                                  </>
                                ) : (
                                  "No Reviews"
                                )}
                              </td>
                              <td
                                style={{
                                  border: "1px solid #ccc",
                                  // background:
                                  // res?.finalResult === "Strong Accept"
                                  //   ? "#28a745"
                                  //   : res?.finalResult === "Accept"
                                  //   ? "#6f42c1"
                                  //   : res?.finalResult === "Weak Accept"
                                  //   ? "#fd7e14"
                                  //   : "#dc3545"
                                }}
                                title={res.finalResult}
                              >
                                <div
                                  style={{
                                    background:
                                      res?.finalResult === "Strong Accept"
                                        ? "#28a745"
                                        : res?.finalResult === "Accept"
                                        ? "#6f42c1"
                                        : res?.finalResult === "Weak Accept"
                                        ? "#fd7e14"
                                        : "#dc3545",
                                    padding: "9px 5px",
                                    color: "#fff",
                                  }}
                                >
                                  {res?.finalResult}
                                </div>
                              </td>
                              <td style={{ border: "1px solid #ccc" }}>
                                <Button
                                onClick={() => {
                                  setSelectedItem(res)
                                  setShowModal(true);
                                }}
                                  style={{ width: "100%", borderRadius: "0px" }}
                                  variant="contained"
                                >
                                  More Info
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </>
                  </tbody>
                </table>
              ) : (
                <div
                  style={{
                    height: "100px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#ccc",
                  }}
                >
                  {loading ? "Loading Data" : "No Data"}
                </div>
              )}
            </div>
          </div>
        </div>

        {showModal && (
          <>
            <StyledConferencePopupContainer>
              <Backdrop onClick={() => {setShowModal(false)}} />
              <ShowInfo
                project={selectedItem}
                onClose={() => {setShowModal(false)}}
                projects={projects}
              />
            </StyledConferencePopupContainer>
          </>
        )}

      </div>
    </StyledDashboardPageLayout>
  );
};

export default Results;
