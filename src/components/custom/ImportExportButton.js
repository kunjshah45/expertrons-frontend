import React from "react";

function ImportExportButton(values) {
  console.log(values);
  return (
    <button
      className={"btn " + values.buttonClass + " btn-icon-split ml-2"}
      onClick={values.handlePress}
    >
      <span className="icon text-white-80">
        <i className={"fas " + values.className}></i>
      </span>
      <span className="text">{values.title}</span>
    </button>
  );
}

export default ImportExportButton;
