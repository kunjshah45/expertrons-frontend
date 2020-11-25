import React, {useEffect, useState} from "react";
import Base from "../components/Base";
import EarningsCard from "../components/custom/EarningsCard";
import axios from 'axios';
import {Link} from "react-router-dom";

function MentorViewTasks() {

  const [taskListState, setTaskListState] = useState({
    taskList: []
  });
  
  const loadTaskData = () => {
    axios.get('http://localhost:5000/task')
      .then(response => {
        
        if (response.data.length > 0) {
          setTaskListState({ taskList: response.data.map(task => task) })
        }
        
      })
  
  }
  
  useEffect(() => {
    loadTaskData();
  }, []);
  
  const deleteTask = (e) => {
    axios.delete('http://localhost:5000/task/'+ e )
    .then(response => {
      console.log(response);
    })
    window.location = "/tasks"
  }


  return (
    <Base>
      <div className="container-fluid">
        <div className="row py-4 py-md-2">
          <EarningsCard
            href="createTask"
            name="Add Task"
            className="border-left-primary"
            color="text-primary"
          />
          <EarningsCard
            href="tasks"
            name="View Tasks"
            className="border-success"
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
                <div className="m-0 font-weight-bold text-success d-flex align-items-center">
                  <span className="flex-grow-1 font-m">
                    <b>View Task</b>
                  </span>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered table-hover"
                id=""
                width="100%"
                cellspacing="0"
              >
                <thead className="font-xs">
                  <tr className=" text-success success-10">
                    <th className="w-10">Date</th>
                    <th className="w-20">Name Of Task</th>
                    <th className="w-20">Assigned To</th>
                    <th className="w-10">Deadline</th>
                    <th className="w-10">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {taskListState.taskList.map((task, index) => {return (
                    
                      <tr key={index} id={index}>
                        <td>{task.assigned_date}</td>
                        <td>{task.name}</td>
                        <td>{task.assigned_to}</td>
                        <td>{task.deadline}</td>
                        <td>
                          <Link to={"/editTask/" + task._id}><i className="fa fa-edit"></i></Link>
                          <a value={task._id} onClick={() => deleteTask(task._id)}><i className="fa fa-trash" ></i></a>
                        </td>
                      </tr>
                    
                )})}
                  
                  
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </Base>
  );
}
export default MentorViewTasks;