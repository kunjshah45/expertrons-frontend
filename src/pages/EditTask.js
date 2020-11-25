import React, { useState, useEffect } from "react";
import Base from "../components/Base";
import EarningsCard from "../components/custom/EarningsCard";
import ImportExportButton from "../components/custom/ImportExportButton";
import axios from 'axios';

export default function EditTask({ match }) {

  const [taskState, setTaskState] = useState({
    _id: "",
    assigned_date: new Date(),
    name: "",
    description: "",
    assigned_to: "",
    deadline: new Date()
  });


  useEffect(() => {
    const loadEachTaskData = async () => {

      let id = match.params.id;

      axios.get('http://localhost:5000/task/' + id)
        .then(response => {
          console.log(response.data)

          setTaskState({ ...taskState, _id: response.data._id, assigned_date: response.data.assigned_date, name: response.data.name, description: response.data.description, assigned_to: response.data.assigned_to, deadline: response.data.deadline });


          console.log("taskState");
          console.log(response.data.description, taskState);
        })

    }
    loadEachTaskData();
  }, []);

  const editTaskSubmit = (e) => {
    e.preventDefault();
    let id = match.params.id;
    console.log(taskState);

    axios.post('http://localhost:5000/task/update/' + id, taskState)
      .then(res => console.log(res.data));

    window.location = "/tasks"
  };


  return (
    <Base>
      <div className="container-fluid">
        <div className="row py-4 py-md-2">
          <EarningsCard
            href="MentorAddTask"
            name="Add Task"
            className="border-primary"
            color="text-primary"
          />
          <EarningsCard
            href="MentorViewTasks"
            name="View Tasks"
            className="border-left-success"
            color="text-success"
          />
          <EarningsCard
            href="SomeOperation1"
            name="Some Operation 1"
            className="border-left-info"
            color="text-info"
          />
          <EarningsCard
            href="SomeOperation2"
            name="Some Operation 2"
            className="border-left-warning"
            color="text-warning"
          />
        </div>
        <div className="card shadow mb-4">
          <div className="card-header py-2">
            <div className="m-0 font-weight-bold text-primary d-flex align-items-center">
              <span className="flex-grow-1 font-m">
                <b>Add Task</b>
              </span>

            </div>
          </div>
          <div className="card-body">
            <form >
              <div className="form-body">

                <div className="row">
                  <div className="col-md-6 ">
                    <div className="form-group">
                      <label className="control-label text-primary"><b>Assigned Date</b></label>
                      <input type="date" className="form-control" name="assigned_date" value={taskState.assigned_date} onChange={e => setTaskState({ ...taskState, assigned_date: e.target.value })} />
                    </div>
                  </div>
                  <div className="col-md-6 ">

                    <div className="form-group">
                    </div>
                  </div>
                </div>

                <div className="row p-t-20">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="control-label text-primary"><b>Name of Task</b></label>
                      <input type="text" id="name" name="name" className="form-control" value={taskState.name} onChange={e => setTaskState({ ...taskState, name: e.target.value })} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="control-label text-primary"><b>Task Description</b></label>
                      <input type="textarea" id="description" name="description" className="form-control" value={taskState.description} onChange={e => setTaskState({ ...taskState, description: e.target.value })} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="control-label text-primary"><b>Assigned To</b></label>
                      <input type="text" id="assigned_to" name="assigned_to" className="form-control" value={taskState.assigned_to} onChange={e => setTaskState({ ...taskState, assigned_to: e.target.value })} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="control-label text-primary"><b>Deadline</b></label>
                      <input type="date" className="form-control" id="deadline" name="deadline" value={taskState.deadline} onChange={e => setTaskState({ ...taskState, deadline: e.target.value })} />
                    </div>
                  </div>
                </div>

              </div>
              <ImportExportButton
                buttonClass="btn-primary"
                handlePress={editTaskSubmit}
                title="Save"
                className="fa-check"
              />
              <ImportExportButton
                buttonClass="btn-primary"
                title="Cancel"
                className="fa-times"
              />

            </form>


          </div>
        </div>
      </div>
    </Base>
  );
}
