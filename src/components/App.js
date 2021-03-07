/* eslint-disable no-unused-vars */
import '../css/App.css';
import React, {useState, useEffect} from 'react'
import ListAppts from './ListAppts';
import { findIndex, without } from 'lodash';
import AddAppts from './AddAppts';
import SearchAppts from './SearchAppts';

function App() {

  const [state, setState] = useState({
    lastIndex:0,
    orderBy:'projectName',
    ordering:'asc',
    query:'',
  });

  const [formDisplay, setFormDisplay] = useState(false);
  const [list, setList] = useState([]);

  const deleteItem = item => {
    let tempList = list;
    // without is a lodash function that saves lines of code.
    tempList = without(tempList, item);
    // simplified erasing of an element without .filter() method
    setList(tempList);
  }

  const deleteById = id => {
    let tempList = list;
    tempList.filter(item => {
      // an element is included in result if the returned val is true
      return item.id !== id;
    });
    setList(tempList);
  }

  const toggleForm = () => {
    let display = !formDisplay;
    //setFormDisplay(display);
    setFormDisplay(display);
  }

  const addItem = (item) => {
    let newList = list;
    let currentIndex = state.lastIndex;
    item.id = ++currentIndex;
    newList.unshift(item);    // adds to the beginning of array
    //setList(newList);
    //setLastIndex(currentIndex);
    setList(newList);
    setState({
      ...state,
      lastIndex: currentIndex,
    });
  }

  const handleOrder = (_orderBy, _ordering) => {
    setState({
      ...state,
      orderBy: _orderBy,
      ordering: _ordering,
    });
  }

  const handleSearch = (_query) => {
    setState({
      ...state,
      query: _query,
    })
  }

  const updateItem = (id, key, value) => {
    let tempList = list;
    let item_index = findIndex(list, {id: id}); // returns the index of the element with a given filter
    let item = tempList[item_index]
    item[key] = value;
    setList(tempList);
  }

  // Effect to fetch data
  useEffect(() => {
    console.log("Fetching json data...");
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
      // Assign numeric id to every item in data
      let currIndex = state.lastIndex;
      data.forEach(item=> {
        item.id = ++currIndex;
      })
      setList(data);
      setState({
        ...state,
        lastIndex: currIndex,
      });
    })
    .catch(err => console.log(err));
  }, []);


  // Effect to sort and filter the list
  useEffect(()=> {
    console.log("List filters changed");
  }, [state])

  let order;
  let filteredList = list;
  if (state.ordering==='asc') {
    order = 1;
  } else {
    order = -1;
  }   // variable to reverse our comparing result

  filteredList = filteredList
  .sort( (objA, objB) => {    
    // sort needs a comparing function. result 1 means arg B goes first.
    // the field on which we compare is a variable so we can use different sortings.
    if (objA[state.orderBy].toLowerCase() < objB[state.orderBy].toLowerCase()) {
      return -1 * order;
    }
    return 1 * order;
  })
  .filter( item => {
    return (         // compare the query with the value in every field
      item['projectName'].toLowerCase().includes(state.query.toLowerCase()) ||
      item['candidateName'].toLowerCase().includes(state.query.toLowerCase()) ||
      item['aptDate'].toLowerCase().includes(state.query.toLowerCase())
    )
  });

  return (
    <main className="page bg-white" id="candidateApps">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
              <AddAppts formDisplay={formDisplay} toggleForm={toggleForm} addItem={addItem}/>
              <SearchAppts orderBy={state.orderBy} ordering={state.ordering} 
                          handleOrder={handleOrder} handleSearch={handleSearch}/>
              <ListAppts appointments={filteredList} delete={deleteItem} update={updateItem}/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
