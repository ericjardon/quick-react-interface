import React from 'react'
import {FaTimes} from 'react-icons/fa';
import Moment from 'react-moment';

export default function ListAppts(props) {

    const appointments = props.appointments;
    const deleteItem = props.delete;
    const updateItem = props.update;

    return (
        <div className="appointment-list item-list mb-3">
        {appointments.map(item => (
          <div key={item.id} className="pet-item col media py-3">
            <div className="mr-3">
              <button className="pet-delete btn btn-sm btn-danger" onClick={()=>deleteItem(item)}>
                  <FaTimes/>
              </button>
            </div>

            <div className="pet-info media-body">
              <div className="pet-head d-flex">
                <span className="pet-name"
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {updateItem(item.id, 'projectName', e.target.innerText)}}>
                  {item.projectName}
                </span>
                <span className="apt-date ml-auto">
                    <Moment 
                      date={item.aptDate}
                      parse="YYYY-MM-dd hh:mm"
                      format="D-MMM h:mma"
                    />
                </span>
              </div>

              <div className="owner-name">
                <span className="label-item">Candidate: </span>
                <span
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {updateItem(item.id, 'candidateName', e.target.innerText)}}>
                  {item.candidateName}
                </span>
              </div>
              <div className="apt-notes"
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {updateItem(item.id, 'motivation', e.target.innerText)}}>
                  {item.motivation}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
}
