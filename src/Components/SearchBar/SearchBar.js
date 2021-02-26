import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props){
    super(props);

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }
  
  // Method to search for tracks relating to the input search term
  search(){
    // Condition checks if nothing has been input when first entering website and clicking the button or when something is typed and then deleted
    // returns out of method if this is the case as there will be no results
    if(this.state === null || this.state.term === ''){
      return;
    }

    // Calls the passed down event handler search function from App.js
    this.props.onSearch(this.state.term);
  }

  // Method to handle setting the state to the entered term in the search bar
  handleTermChange(e){
    // Uses the event object passed in to grab the target and its value to save in variable searchValue
    let searchValue = e.target.value;

    // Sets the state to the searchValue
    this.setState({
      term: searchValue
    })
  }

  render(){
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <button className="SearchButton" onClick={this.search}>SEARCH</button>
      </div>
    );
  }

};