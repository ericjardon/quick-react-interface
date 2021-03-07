import React, {useState} from 'react';
import {FaPlus} from 'react-icons/fa';

export default function AddAppts(props) {
    const formDisplay = props.formDisplay;
    const toggleForm = props.toggleForm;
    const addItem = props.addItem;

    const [formData, setFormData] = useState({
        projectName:'',
        candidateName:'',
        aptDate: '',
        aptTime: '',
        motivation: '',
    })

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmit = e => {
        e.preventDefault();     // form use only, to avoid reloading.
        let Submission = {
            projectName: formData.projectName,
            candidateName: formData.candidateName,
            aptDate: formData.aptDate,
            aptTime: formData.aptTime,
            motivation: formData.motivation,
        };

        addItem(Submission);

        setFormData({
            projectName:'',
            candidateName:'',
            aptDate: '',
            aptTime: '',
            motivation: '',
        })

        toggleForm();       // hide the form on finish
    }

    return (
      <div className={"card textcenter mt-3 " 
      + (formDisplay ? "":"add-appointment")}>
        <div className="apt-addheading card-header bkg-primary text-white"
            onClick={toggleForm}>
          <FaPlus/>  New Application
        </div>
        <div className="card-body">

          <form id="aptForm" noValidate>
            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="projectName"
                readOnly
              >
                Project
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="projectName"
                  placeholder="Project's Name"
                  value={formData.projectName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="candidateName"
              >
                Candidate
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="candidateName"
                  placeholder="Candidate's Name"
                  value={formData.candidateName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="aptDate"
              >
                Date
              </label>
              <div className="col-md-4">
                <input
                  type="date"
                  className="form-control"
                  name="aptDate"
                  id="aptDate"
                  value={formData.aptDate}
                  onChange={handleChange}
                />
              </div>
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="aptTime"
              >
                Time
              </label>
              <div className="col-md-4">
                <input
                  type="time"
                  className="form-control"
                  name="aptTime"
                  id="aptTime"
                  value={formData.aptTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label className="col-md-2 text-md-right" htmlFor="motivation">
                Motivation
              </label>
              <div className="col-md-10">
                <textarea
                  className="form-control"
                  rows="4"
                  cols="50"
                  name="motivation"
                  id="motivation"
                  placeholder="Appointment Notes"
                  value={formData.motivation}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row mb-0">
              <div className="offset-md-2 col-md-10">
                <button
                  type="submit"
                  className="btn btn-primary d-block ml-auto"
                  onClick={onSubmit}
                >
                  Add Applicant
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>
    );
}
