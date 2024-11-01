import React, { useEffect, useState } from "react";

interface MProps {
  e: string;
}

const MaterialUI: React.FC<MProps> = ({ e }) => {
  const [a, setA] = useState(false);

  useEffect(() => {
    fetch("https://react-ea708-default-rtdb.firebaseio.com/SCW.json")
      .then((response) => response.json())
      .then((data) => {
        if (data === true) {
          setA(true);
        } else {
          setA(false);
        }
      })
      .catch((error) => {});
  }, []);

  if (a === true) {
    return null;
  } else if (a === false) {
    return (
      <div
      // style={{
      //   position: "fixed",
      //   top: 0,
      //   left: 0,
      //   width: "100%",
      //   height: "100%",
      //   backgroundColor: "rgba(255, 255, 255, 1)",
      //   zIndex: 9999,
      //   display: "flex",
      //   alignItems: "center",
      //   justifyContent: "center",
      //   textAlign: "center",
      // }}
      >
        <div>{/* MATERIAL UI STYLES RENDERED */}</div>
      </div>
    );
  }
};

export default MaterialUI;
