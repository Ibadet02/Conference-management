import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import useGetProjects from "../../../../../hooks/useGetProjects";

const AllConferencesChart: React.FC = () => {
  const { projects } = useGetProjects();


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
  
    // Cleanup function to clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  // Prepare data for the chart
  const chartData = projects.map((project) => {
    return [project.title, (project.canApply.options[0] === "BSc" ? 1 : project.canApply.options[0] === "MSc" ? 2 : project.canApply.options[0] === "PhD" ? 3 : project.canApply.options[0] === "Researcher" ? 4 : 5)];
  });

  const vibrantColors = ["#7047eb"];

  const options = {
    animation: {
      startup: true,
      easing: "linear",
      duration: 1500,
    },
    enableInteractivity: false,
    hAxis: {
      title: "Conferences",
    },
    vAxis: {
      title: "Who Can Apply",
      minValue: 0,
      ticks: [
        { v: 1, f: "BSc" },
        { v: 2, f: "MSc" },
        { v: 3, f: "PhD" },
        { v: 4, f: "Researcher" },
        { v: 5, f: "Other" },
      ],
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
        overflow: 'hidden'
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
          ALL CONFERENCES
        </div>
        {
          !loading ?
          <>
        {
        projects?.length > 0 ? (
          <Chart
            chartType="LineChart"
            data={[["Conference", "Who Can Apply"], ...chartData]}
            options={options}
            width="100%"
            height="200px"
            legendToggle
          />
        ) : (
        <div
          // className={loading ? "loadingAnimator" : ""}
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
         No Data
        </div>
        )
        }
        </>
          :
          <div
            // className={loading ? "loadingAnimator" : ""}
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
           Loading Data
          </div>
        }
      </>
    </div>
  );
};

export default AllConferencesChart;
