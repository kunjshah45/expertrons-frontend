import React from "react";

function EarningsCard(values) {
  return (
    <div className="col-xl-3 col-md-6">
      <div className={"card " + values.className + " h-100 py-2"}>
        <a href={values.href} className="font-underline-none">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div
                className={
                  "col mr-2 text-l font-weight-bold " +
                  values.color +
                  " text-uppercase mb-1 "
                }
              >
                {values.name}
              </div>
              <div className="col-auto"></div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default EarningsCard;
