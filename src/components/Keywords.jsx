const Keywords = ({ keywords }) => {
  return (
    <p className="flex gap-3 flex-wrap my-2">
      {keywords &&
        keywords.map((keyword, i) => {
          return (
            <span
              className={
                i % 3 == 0
                  ? "text-yellow-700 bg-yellow-100 border-[1px] border-yellow-700 text-sm py-[0.2rem] px-2 rounded-lg"
                  : i % 3 == 1
                  ? "text-green-700 bg-green-100 border-[1px] border-green-700  text-sm py-[0.2rem] px-2 rounded-lg"
                  : "text-red-700 bg-red-100 border-[1px] border-red-700 text-sm py-[0.2rem] px-2 rounded-lg"
              }
              // style={{ padding: "0.2rem 0.7rem", borderRadius: "1rem" }}
              key={i}
            >
              {keyword}
            </span>
          );
        })}
    </p>
  );
};

export default Keywords;
