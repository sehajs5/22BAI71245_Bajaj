import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";

const options = [
  { value: "numbers", label: "Numbers" },
  { value: "alphabets", label: "Alphabets" },
  { value: "highest_alphabet", label: "Highest Alphabet" },
];

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error("Invalid JSON format: 'data' should be an array");
      }

      setError("");
      const response = await axios.post("http://localhost:7777/bfhl", parsedInput);
      setResponseData(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center"}}>
      <h1>JSON Filter App</h1>
      <textarea
        rows={4}
        cols={50}
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON (e.g. {"data": ["A", "1", "B"]})'
      ></textarea>
      <br />
      <button onClick={handleSubmit} style={{ marginTop: "10px" }}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {responseData && (
        <div>
          <h2>Multi Filter</h2>
          <Select
            options={options}
            isMulti
            onChange={setSelectedOptions}
            placeholder="Select Filters"
            styles={{
              control: (base) => ({
                ...base,
                color: "black",
              }),
              singleValue: (base) => ({
                ...base,
                color: "black",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "white",
              }),
              option: (base, { isFocused, isSelected }) => ({
                ...base,
                backgroundColor: isSelected ? "#ddd" : isFocused ? "#eee" : "white",
                color: "black",
              }),
            }}
          />
          <h3 >Filtered Response</h3>
          {selectedOptions.some((opt) => opt.value === "numbers") && (
            <p style={{color: "white"}}>Numbers: {responseData.numbers.join(", ")}</p>
          )}
          {selectedOptions.some((opt) => opt.value === "alphabets") && (
            <p style={{color: "white"}}>Alphabets: {responseData.alphabets.join(", ")}</p>
          )}
          {selectedOptions.some((opt) => opt.value === "highest_alphabet") && (
            <p style={{color: "white"}}>Highest Alphabet: {responseData.highest_alphabet[0]}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;