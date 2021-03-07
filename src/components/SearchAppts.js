import React, {useState} from 'react'

export default function SearchAppts(props) {
    /* Component for a Search bar with various sorting options for the results */
    const orderBy = props.orderBy;
    const ordering = props.ordering;
    const handleOrder = props.handleOrder;  // function
    const handleSearch = props.handleSearch;

    const [searchInput, setSearchInput] = useState('');
/*
    const handleChange = e => {
        setSearchInput
    }*/
    
    return (
      <div className="search-appointments row justify-content-center my-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              id="SearchApts"
              type="text"
              className="form-control"
              aria-label="Search Applications"
              onChange={e => {
                  console.log(e.target.value);
                  handleSearch(e.target.value);
                }}
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sort by: <span className="caret" />
              </button>

              <div className="sort-menu dropdown-menu dropdown-menu-right">
                <button className={"sort-by dropdown-item" 
                        + (orderBy==='projectName' ? 'active' : '')} href="#"
                        onClick={()=>handleOrder('projectName', ordering)}>
                  Project Name
                </button>
                <button className={"sort-by dropdown-item" 
                        + (orderBy==='aptDate' ? 'active' : '')} href="#"
                        onClick={()=>handleOrder('aptDate', ordering)}>
                  Date
                </button>
                <button className={"sort-by dropdown-item" 
                        + (orderBy==='candidateName' ? 'active' : '')} href="#"
                        onClick={()=>handleOrder('candidateName', ordering)}>
                  Candidate
                </button>
                <div role="separator" className="dropdown-divider" />
                <button className={"sort-by dropdown-item" 
                        + (ordering==='asc' ? 'active' : '')} href="#"
                        onClick={()=>handleOrder(orderBy, 'asc')}>
                  Asc
                </button>
                <button className={"sort-by dropdown-item" 
                        + (ordering==='asc' ? '' : 'active')} href="#"
                        onClick={()=>handleOrder(orderBy, 'desc')}>
                  Desc
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
}
