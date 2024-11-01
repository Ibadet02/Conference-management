import { ReadOnlyUserDataProps } from "../../../../types/dashboard/Author/props";
import conferenceImage from "../../../../assets/images/conference.jpg";

const ReadOnlyUserData: React.FC<ReadOnlyUserDataProps> = ({
  userDataElements,
}) => {
  const { userData, userDataLoading } = userDataElements;
  const isUserDataAvailable = userData && Object.keys(userData).length > 0;

  return (
    <div style={{ flex: 1 }}>
      {userDataLoading ? (
        <div
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="whiteloader"></div>
        </div>
      ) : isUserDataAvailable ? (
        <div>
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
          }}
        >
          MY DETAILS
        </div>

            <div
              style={{
                padding: "10px",
                background: "rgba(255,255,255, 1)",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <div>First Name:</div>
                <div>{userData.firstName}</div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <div>Last Name:</div>
                <div>{userData.lastName}</div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <div>Phone:</div>
                <div>{userData.phone}</div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              >
                <div>Email:</div>
                <div>{userData.email}</div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.6)",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            No User Data Available
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadOnlyUserData;
