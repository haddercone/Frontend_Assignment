import React from "react";
import { useEffect, useState } from "react";
import { topics } from "../topics";
import Categories from "./Categories";
import Topics from "./Topics";
import TopicForm from "./TopicForm";

const Body = () => {
  const [allTopics, setAllTopics] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    setAllTopics(topics);
    setActiveTab("All");
  }, []);

  function switchTab(tabName) {
    setActiveTab(tabName);
  }

  function deleteTopic(topicEle) {
    const filteredTopics = allTopics.filter(
      (topic) => topic.id !== topicEle.id
    );
    setAllTopics(filteredTopics);
  }

  function addFormData(formData) {
    setAllTopics((allTopics) => [formData, ...allTopics]);
  }

  function toggleFormVisibility() {
    setIsFormVisible(!isFormVisible);
  }

  return (
    <div className="relative md:m-auto my-2 md:w-1/2 border-2 border-gray-200 md:mt-4  md:px-4">
      {activeTab && (
        <Categories
          onTabSwich={switchTab}
          activeTab={activeTab}
          toggleFormVisibility={toggleFormVisibility}
        />
      )}
      {isFormVisible && (
        <TopicForm
          addFormData={addFormData}
          toggleFormVisibility={toggleFormVisibility}
        />
      )}
      {allTopics && (
        <Topics
          allTopics={allTopics}
          onDelete={deleteTopic}
          activeTab={activeTab}
        />
      )}
    </div>
  );
};

export default Body;
