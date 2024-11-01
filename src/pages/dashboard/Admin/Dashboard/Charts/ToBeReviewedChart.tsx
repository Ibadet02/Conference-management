import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import useGetPapersToBeReviewed from "../../../../../hooks/useGetPapersToBeReviewed";
import useGetProjects from "../../../../../hooks/useGetProjects";
import useGetAuthorsData from "../../../../../hooks/useGetAuthorsData";

const ToBeReviewedChart: React.FC = () => {
  const {toBeReviewed, toBeReviewedLoading} = useGetPapersToBeReviewed();


  // Count the number of papers for each corresponding author or project ID
  const data = [["Category", "Number of Papers"]];
  const counts = {};

  
  const { projects, projectsloading } = useGetProjects();
  const { authorsData, authorsDataLoading } = useGetAuthorsData();

    toBeReviewed.forEach((paper) => {
    const key = paper.correspondingAuthor || paper.projectId;
    counts[key] = (counts[key] || 0) + 1;
  });

  Object.keys(counts).forEach((key) => {
    data.push([key, counts[key]]);
  });

  // useEffect(() => {

  //   if(!authorsDataLoading && !projectsloading){

  //   toBeReviewed.forEach((paper) => {
  //     const correspondingAuthor = authorsData?.find((e) => e?.id === paper.correspondingAuthor);
  //     const projectName = projects?.find((e) => e?.id === paper.projectId);
  
  //     const authorName = correspondingAuthor ? `${correspondingAuthor.firstName} ${correspondingAuthor.lastName}` : '';
  //     const key = authorName || projectName?.name;
  
  //     counts[key] = (counts[key] || 0) + 1;
  //   });
  
  //   Object.keys(counts).forEach((key) => {
  //     // setData(prev => prev.push([key, counts[key]]))
  //     data.push([key, counts[key]]);
  //   });

  // }
  // }, [authorsDataLoading, projectsloading]);

  // toBeReviewed.forEach((paper) => {
  //   const key = paper.correspondingAuthor || paper.projectId;
  //   counts[key] = (counts[key] || 0) + 1;
  // });

  // Object.keys(counts).forEach((key) => {
  //   data.push([key, counts[key]]);
  // });

  const vibrantColors = [
    "#FF5733",
    "#FFC300",
    "#DAF7A6",
    "#FFC0CB",
    "#7FFFD4",
    "#FF6347",
  ];

  const options = {
    title: "",
    enableInteractivity: false,
    animation: {
      startup: true,
      easing: "linear",
      duration: 1500,
    },
    hAxis: {
      title: "Authors/Projects",
      textPosition: 'none',
    },
    vAxis: {
      title: "Number of Papers",
      minValue: 0,
    },
    colors: vibrantColors,
  };

  return (
    <div
      style={{
        flex: 1,
        background: "rgba(255,255,255,1)",
        padding: "1rem",
        borderRadius: "1rem",
        boxShadow: "5px 5px 20px rgba(0,0,0,0.2)",
        minWidth: "300px",
      }}
    >
      <>
        <div
          style={{
            width: "100%",
            fontWeight: "bolder",
            textAlign: "center",
            color: "#2e2e2e",
          }}
        >
          TO BE REVIEWED
        </div>
        {toBeReviewed?.length > 0 ? (
          <Chart
            chartType="ColumnChart"
            data={data}
            options={options}
            width="100%"
            height="200px"
            legendToggle
          />
        ) : (
          <div
            // className={toBeReviewedLoading ? "loadingAnimator" : ""}
            style={{
              height: "200px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#ccc",
            }}
          >
            {toBeReviewedLoading ? "Loading Data" : "No Data"}
          </div>
        )}
      </>
    </div>
  );
};

export default ToBeReviewedChart;
