import React from "react";

const Loader = () => {
  return (
    <>
      <div className="loader-container">
        <svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          fill="#bb0000"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#bb0000"
            strokeWidth="8"
            fill="none"
            strokeDasharray="251"
            strokeDashoffset="0"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="1s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dashoffset"
              values="0;251"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    </>
  );
};

export default Loader;
