import React from "react";
import Sidebar from "./sidebar/BaseSidebar";
import Footer from "./Footer";
import Header from "./Header";

export default class Base extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />
            {this.props.children}
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

