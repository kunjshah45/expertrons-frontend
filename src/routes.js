import React from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import ViewMentors from "./pages/ViewMentors";
import ViewTasks from "./pages/ViewTasks";

function RouterNav() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/tasks" component={ViewTasks} />
        <Route path="/editTask/:id" component={EditTask} />
        <Route path="/createTask" component={CreateTask} />
        <Route path="/mentors" component={ViewMentors} />

      </Router>
    </div>
  );
}
export default RouterNav;
