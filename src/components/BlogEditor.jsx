import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats, tones, OPEN_AI_API_KEY } from "../config";
import axios from "axios";

const BlogEditor = () => {
  const [value, setValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(Object.keys(tones)[0]);
  const [tone, setTone] = useState(Object.values(tones)[0]);
  const { topicName } = useParams();
  const [apiKeyAvailable, setApikeyAvailable] = useState(true) 
  const URLStringToString = topicName.replace(new RegExp("-", "g"), " ");

  function handleOptionChange(event, temperature) {
    setSelectedOption(event.target.value);
    setTone(temperature);
  }

  function handleSubmit(e) {
    e.preventDefault();
    callOpenAPI();
  }

  const callOpenAPI = async () => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          model: "text-davinci-003",
          prompt: topicName,
          temperature: tone,
          max_tokens: 5,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPEN_AI_API_KEY}`,
          },
        }
      );
      setValue(response?.data?.choices[0]?.text);
      setApikeyAvailable(true)
    } catch (error) {
      setApikeyAvailable(false)
      console.error("OpenAI API request failed:", error);
    }
  };

  return (
    <div className="md:m-auto my-2 md:w-1/2 md:mt-4  md:px-4 px-2">
      <p className="font-bold text-3xl border-2 border-gray-200 p-2 rounded-sm">{URLStringToString}</p>
      {!apiKeyAvailable &&  <p className="text-red-600 text-center mt-2 text-sm"> OpenAI API request failed. Please check your OpenAI Api key.</p>}
      <div className="mt-4">
        <ReactQuill
          className="h-80"
          theme="snow"
          modules={modules}
          formats={formats}
          value={value}
          onChange={setValue}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 text-sm justify-between items-center md:mt-14 mt-20"
      >
        <div className="flex gap-2 items-center ">
          <span className="font-light">Select Tone:</span>
          {Object.entries(tones).map((tone) => {
            return (
              <div className="flex gap-2" key={tone[1]}>
                <label
                  className={
                    selectedOption === tone[0]
                      ? "bg-orange-500 px-2 py-1 text-white"
                      : "px-2 py-1"
                  }
                  htmlFor={tone[1]}
                >
                  {tone[0]}
                </label>
                <input
                  type="radio"
                  id={tone[1]}
                  className="hidden"
                  name="tones"
                  value={tone[0]}
                  checked={selectedOption === tone[0]}
                  onChange={(e) => handleOptionChange(e, tone[1])}
                />
              </div>
            );
          })}
        </div>
        <button type="submit" className="bg-orange-500 px-2 py-1 text-white">
          Generate
        </button>
      </form>
    </div>
  );
};

export default BlogEditor;
