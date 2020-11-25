import React from "react";

// class - based
// uses lifecycle as componentDidMount and componentWillUnmount
// OLD METHOD

// class SidebarNavButton extends React.Component {
//     render() {
//       return (
//         <li className="nav-item">
//         <a className="nav-link" href={this.props.redirectionLink}>
//           <i className={this.props.faviconClass} />
//           <span>{this.props.title}</span>
//         </a>
//       </li>
//       )
//     }
//   }

// function - based
// uses hooks
// example
// const [abc, setAbc] = useState("INITIAL VALUE")
// if you wanna change value -> setAbc("New Value") *****this.value

function SidebarNavButton(values) {
  return (
    <li className="nav-item">
      <a className="nav-link" href={values.redirectionLink}>
        <i className={values.faviconClass} />
        <span>{values.title}</span>
      </a>
    </li>
  );
}

export default SidebarNavButton;
