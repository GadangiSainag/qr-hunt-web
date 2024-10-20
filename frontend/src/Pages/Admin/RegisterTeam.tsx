import axios from "axios";
import React, { useState } from "react";
import styles from "./register.module.css";
import Qr from "../../Components/Qr";
// import style from './login.module.css'
const RegisterTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [players, setPlayers] = useState("");
  const [huntId, setHuntId] = useState("");
  const [questions, setQuestions] = useState("");
  const [qrData, setQrData] = useState(""); // State for QR code data
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      players,
      teamName,
      huntId,
      questions,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    axios.defaults.withCredentials = true;

    axios
      .post("/api/admin/team", data, config)
      .then((response) => {
        console.log(response.data);

        // Update QR code data only if the response is successful (e.g., status code 200)
        if (response.status === 200) {
          const qrString = JSON.stringify(response.data); // Consider including relevant data from response
          setQrData(qrString);
          
        } else {
          console.error("Error registering team:", response.data);
          // Handle errors gracefully (e.g., display error message to user)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // useEffect hook to update QR code data on successful response (optional)

  return (
    <div>
      <h1>Register Team Here (Only for admin)</h1>
      This is testing font - ignore me
      <form onSubmit={handleSubmit}>
        <label>Team Name</label>
        <input
          required={true}
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <br />
        <label>PLayers</label>
        <input
          required={true}
          type="text"
          value={players}
          onChange={(e) => setPlayers(e.target.value)}
        />
        <br />
        <label>Hunt Id</label>
        <input
          required={true}
          type="text"
          value={huntId}
          onChange={(e) => setHuntId(e.target.value)}
        />
        <br />
        <label>Questions{"(seperated with spaces)"} </label>
        <input
          required={true}
          type="text"
          value={questions}
          onChange={(e) => setQuestions(e.target.value)}
        />
        <br />
        <button type="submit">Register Team</button>
      </form>
      <div className={styles.qrContainer}>
        {qrData && <Qr qrData={qrData} qrSize={200} />}
      </div>
    </div>
  );
};

export default RegisterTeam;
