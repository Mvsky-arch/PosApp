import React from "react";

const SetErrorList = ({ errorArray = [] }) => {
  return (
    <div>
      {errorArray.map((err) => (
        <ul key={err}>{err}</ul>
      ))}
    </div>
  );
};

export { SetErrorList };
