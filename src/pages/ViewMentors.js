import React, { useState, useEffect } from "react";
import Base from "../components/Base";
import ImportExportButton from "../components/custom/ImportExportButton";
import axios from "axios";

export default function ViewMentors({ match }) {

  const [mentorState, setMentorState] = useState({
    name: ""
  });

  const [mentorListState, setMentorListState] = useState({
    mentorList: []
  });


  useEffect(() => {
    const loadMentorData = async () => {
      axios.get('http://localhost:5000/mentor')
        .then(response => {

          if (response.data.length > 0) {
            setMentorListState({ mentorList: response.data.map(mentor => mentor) })
          }
        })

    }
    loadMentorData();
  }, []);


  const createMentorSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/mentor/add', mentorState)
      .then(res => console.log(res.data));

    window.location = "/mentors"
  };

  const deleteMentor = (e) => {
    axios.delete('http://localhost:5000/mentor/' + e)
      .then(response => {
        console.log(response);
      })
    window.location = "/mentors"
  }


  return (
    <Base>
      <div className="container-fluid">
        <div className="row py-4 py-md-2">
          <div className="card-header py-2">
            <div className="m-0 font-weight-bold text-primary d-flex align-items-center">
              <span className="flex-grow-1 font-m">
                <b>Add Mentors</b>
              </span>
            </div>
          </div>
          <div className="card-body">
            <form >
              <div className="form-body">

                <div className="row">
                  <div className="col-md-6 ">
                    <div className="form-group">
                      <label className="control-label text-primary"><b>Mentor Name</b></label>
                      <input type="text" className="form-control" name="name" onChange={e => setMentorState({ name: e.target.value })} />
                    </div>
                  </div>
                  <div className="col-md-6 ">

                    <div className="form-group">
                    </div>
                  </div>
                </div>


              </div>
              <ImportExportButton
                buttonClass="btn-primary"
                handlePress={createMentorSubmit}
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
        <div className="card shadow mb-4">
          <div className="card-header py-2">
            <div className="m-0 font-weight-bold text-primary d-flex align-items-center">
              <span className="flex-grow-1 font-m">
                <b>View Mentors</b>
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
                  <tr className=" text-primary primary-10">
                    <th className="w-20">Name Of Task</th>
                    <th className="w-10">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mentorListState.mentorList.map((mentor, index) => {
                    return (
                      <tr key={index}>
                        <td>{mentor.name}</td>
                        <td>
                          <a value={mentor._id} onClick={() => deleteMentor(mentor._id)}><i className="fa fa-trash" ></i></a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </Base>
  );
}