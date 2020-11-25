import React from "react";

function CustomButton(values) {
  console.log(values);
  return (
    <button type={values.buttonType} className={"btn " + values.buttonClass}>
      {values.icon ? <i className={values.icon}></i> : null}
      {values.title}
    </button>
  );
}

export default CustomButton;
