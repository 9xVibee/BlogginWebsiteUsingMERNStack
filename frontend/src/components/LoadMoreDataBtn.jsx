import React from "react";

const LoadMoreDataBtn = ({ state, fetchDataFun }) => {
  if (state.length !== 0 && state.totalDocs > state.results.length) {
    return (
      <>
        <button
          className="text-dark-grey py-2 px-3 hover:bg-grey/50 rounded-md flex items-center gap-2"
          onClick={() => fetchDataFun({ page: state.page + 1 })}
        >
          Load More
        </button>
      </>
    );
  }
};

export default LoadMoreDataBtn;
