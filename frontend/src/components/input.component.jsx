import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiUser } from "react-icons/bi";

const InputBox = ({ iconName, name, type, id, value, placeholder }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-[100%] mb-4">
      <input
        name={name}
        type={type === "password" ? (show ? "text" : "password") : type}
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        className="input-box"
      />
      {iconName}

      {type === "password" &&
        (!show ? (
          <AiFillEyeInvisible
            className="input-icon left-[auto] right-4 cursor-pointer"
            onClick={() => setShow((cur) => !cur)}
          />
        ) : (
          <AiFillEye
            className="input-icon left-[auto] right-4 cursor-pointer"
            onClick={() => setShow((cur) => !cur)}
          />
        ))}
    </div>
  );
};

export default InputBox;
