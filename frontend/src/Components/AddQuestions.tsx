// Import necessary Firebase modules
import { useState } from "react";

import axios from "axios";

export default function AddQuestions() {
  const [customId, setCustomid] = useState("");
  const [questionTxt, setQuestion] = useState("");
  const [hint, setHint] = useState("");

  const [difficulty, setDifficulty] = useState("select");
  const options = [
    { value: "easy", label: "Easy 😎" },
    { value: "medium", label: "Medium 😬" },
    { value: "hard", label: "HARD 🔥" },
  ];
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      questions: [
        {
          customId: customId.trim(),
          hint: hint.trim(),
          questionText: questionTxt.trim(),
          difficulty: difficulty,
        },
      ],
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    axios.defaults.withCredentials = true;

    axios
      .post("/api/admin/questions/add", data, config)
      .then((response) => {
        //    reset form for new values
        setCustomid("")
        setDifficulty("")
        setHint("")
        setQuestion("")
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Id</label>
        <input
          required={true}
          type="text"
          value={customId}
          onChange={(e) => setCustomid(e.target.value)}
        />
        <br />
        <label>Question</label>
        <input
          required={true}
          type="text"
          value={questionTxt}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <br />
        <label>Hint</label>
        <input
          required={true}
          type="text"
          value={hint}
          onChange={(e) => setHint(e.target.value)}
        />
        <br />
        <div>
          <select
            required={true}
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Login!!</button>
      </form>
    </div>
  );
}
