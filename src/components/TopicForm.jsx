import { useState } from "react"

const TopicForm = ({addFormData, toggleFormVisibility}) => {

    const [topic, setTopic] = useState("")
    const [keyword, setKeyword] = useState("")

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(topic === "" || keyword === "") return;
    
        const formData = {
          id: Date.now(),
          name: topic,
          keywords: keyword.split(','),
          categories: "Custom",
        }
    
        addFormData(formData)
        setTopic("")
        setKeyword("")
        toggleFormVisibility()
      }

  return (
    <form onSubmit={handleFormSubmit} className="transition duration-500 delay-200 absolute w-full md:h-auto h-full left-0 p-4 bg-white md:shadow-xl">
        <div className="py-2">
          <label htmlFor="topic ">Topic Name: </label> <br />
          <input id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} type="text" className="w-full border-2 border-gray-200"/>
        </div>
        <div className="py-2">
          <label htmlFor="keywords">Keywords (comma seperated)</label> <br />
          <input id="keywords" value={keyword} onChange={(e) => setKeyword(e.target.value)} type="text"  className="w-full border-2 border-gray-200"/>
        </div>
        <div className="flex gap-4 justify-start py-2">
        <button className="text-red-500 text-sm" onClick={() => toggleFormVisibility()}>Cancel</button> 
        <button className="bg-orange-500 text-white py-2 px-3">Save</button>
        </div>
      </form>
  )
}

export default TopicForm