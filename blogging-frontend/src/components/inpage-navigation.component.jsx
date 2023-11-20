import React, { useEffect, useRef, useState } from "react";

export let activeTabLineRef;
export let defaultTabLine;

const InPageNavigation = ({ routes, children, defaultHidden = [] }) => {
  let [inPageNavIndex, setInPageNavIndex] = useState(0);
  activeTabLineRef = useRef(null);
  defaultTabLine = useRef(null);

  const changePageState = (btn, i) => {
    let { offsetWidth, offsetLeft } = btn;

    activeTabLineRef.current.style.width = offsetWidth + "px";
    activeTabLineRef.current.style.left = offsetLeft + "px";
    setInPageNavIndex(i);
  };

  useEffect(() => {
    changePageState(defaultTabLine.current, 0);
  }, []);
  return (
    <>
      <div className="relative mb-8 bg-white border-grey border-b flex flex-nowrap overflow-x-auto">
        {routes.map((route, i) => {
          return (
            <button
              ref={i == 0 ? defaultTabLine : null}
              key={i}
              className={
                "p-4 px-5 capitalize " +
                (inPageNavIndex === i ? "text-black " : "text-dark-grey ") +
                (defaultHidden.includes(route) ? "md:hidden" : " ")
              }
              onClick={(e) => {
                changePageState(e.target, i);
              }}
            >
              {}
              {route}
            </button>
          );
        })}
        <hr
          ref={activeTabLineRef}
          className="absolute bottom-0 duration-3000"
        />
      </div>
      {Array.isArray(children) ? children[inPageNavIndex] : children}
    </>
  );
};

export default InPageNavigation;
