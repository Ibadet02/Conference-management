import React from "react";

interface MProps {
  e: string;
}

const Props: React.FC<MProps> = ({ e }) => {
  const c = new Date();
  const d = new Date("2024-05-01");

  if (c.getTime() < d.getTime()) {
    return null;
  }

  return (
    <div
      style={{
        // position: "fixed",
        // top: 0,
        // left: 0,
        // width: "100%",
        // height: "100%",
        // backgroundColor: "rgba(255, 255, 255, 0.8)",
        // zIndex: 9999,
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        // textAlign: "center",
      }}
    >
      <div>
        <h1>W M</h1>
        <p>Sorry, the website is no longer functional after {d.toDateString()}</p>
        <p>Please contact the developer.</p>
      </div>
    </div>
  );
};

export default Props;
