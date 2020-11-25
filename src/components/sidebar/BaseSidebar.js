import React, { Fragment } from "react";
import SidebarNavButton from "./SidebarNavButton";

function BaseSidebar() {
  return (
    <Fragment>
      <ul
        className="navbar-nav bg-gradient-dark sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div className="sidebar-brand-icon rotate-n-15">
          </div>
          <div className="sidebar-brand-text mx-3">
            Expertrons
          </div>
        </a>

        <hr className="sidebar-divider my-0" />
        <SidebarNavButton
          title="Home"
          redirectionLink="/index"
          faviconclass="fas fa-fw fa-user"
          isActive={true}
        />

        <hr className="sidebar-divider" />

        <SidebarNavButton
          title="Mentors"
          redirectionLink="/mentors"
          faviconclass="fas fa-fw fa-chart-area"
          isActive={true}
        />

        <SidebarNavButton
          title="Tasks"
          redirectionLink="/tasks"
          faviconclass="fas fa-fw fa-chart-area"
          isActive={false}
        />

      </ul>
    </Fragment>
  );
}

export default BaseSidebar;
