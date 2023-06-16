import { Link } from "react-router-dom";
import Keywords from "./Keywords";

const Topics = ({ allTopics, onDelete, activeTab }) => {
  function handleDelete(topic) {
    onDelete(topic);
  }

  // Filter the topics based on the active tab
  const filteredTopics =
    activeTab === "All"
      ? allTopics
      : allTopics.filter(
          (topic) => topic.categories.toLowerCase() === activeTab.toLowerCase()
        );

  return (
    <div className="my-4">
      <p className="bg-gray-100 px-3 py-2 border-t-[1px] border-r-[1px] border-l-[1px] font-bold border-gray-200">
        Recommended Topics
      </p>
      <div>
        {filteredTopics.map((topic) => {
          const URLPathString = topic?.name.replace(/\s/g, "-");
          return (
            <div
              key={topic.id}
              className="cursor-pointer border-t-[1px] border-r-[1px] border-l-[1px] last:border-b-[1px] border-gray-200 flex flex-wrap justify-between items-center  px-3 py-2 gap-2"
            >
              <div>
                <p className="font-bold text-gray-700">{topic.name}</p>
                <Keywords keywords={topic?.keywords} />
              </div>
              <div className="flex gap-2">
                <button
                  className="text-sm text-red-500"
                  onClick={() => handleDelete(topic)}
                >
                  Delete
                </button>
                <Link
                  to={"topic/" + URLPathString}
                  className="bg-orange-500 text-white py-2 px-3 "
                >
                  Write &#8250;
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Topics;
