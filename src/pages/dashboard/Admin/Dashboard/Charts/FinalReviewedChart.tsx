import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import useAuthentication from "../../../../../hooks/useAuthentication";
import useGetFinalReviews from "../../../../../hooks/useGetFinalReviews";

const FinalReviewedChart: React.FC = () => {
  const authUser = useAuthentication();
  const {finalReviews, finalReviewsLoading} = useGetFinalReviews();

  const [chartData, setChartData] = useState<any[]>([]);
  const [thisPlottingData, setThisPlottingData] = useState<any[]>([]);

  useEffect(() => {
    if (finalReviews && finalReviews.length > 0) {
      setThisPlottingData(finalReviews);
      const counts = {
        "Strong Accept": 0,
        Accept: 0,
        "Weak Accept": 0,
        Reject: 0,
      };
  
      finalReviews.forEach((paper) => {
        counts[paper.finalResult]++;
      });
  
      const dataForChart = Object.entries(counts).map(([result, count]) => [
        result,
        count,
      ]);
  
      setChartData([["Final Result", "Count"], ...dataForChart]);
    }
  }, [finalReviews]);
  

  const options = {
    title: "",
    pieHole: 0,
    enableInteractivity: false,
    animation: {
      startup: true,
      easing: "out",
      duration: 1000,
    },
    
  slices: {
    0: { color: "#008000" }, // Strong Accept (green)
    1: { color: "#800080" }, // Accept (purple)
    2: { color: "#ffa500" }, // Weak Accept (orange)
    3: { color: "#ff0000" }, // Reject (red)
  },
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
      <div
        style={{
          width: "100%",
          fontWeight: "bolder",
          textAlign: "center",
          color: "#2e2e2e",
        }}
      >
        REVIEWED PAPERS
      </div>
      {thisPlottingData?.length > 0 ? (
        <Chart
          chartType="PieChart"
          data={chartData}
          options={options}
          width="100%"
          height="200px"
        />
      ) : (
        <div
          // className={finalReviewsLoading ? "loadingAnimator" : ""}
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
          {finalReviewsLoading ? "Loading Data" : "No Data"}
        </div>
      )}
    </div>
  );
};

export default FinalReviewedChart;
