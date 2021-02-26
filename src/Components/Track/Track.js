import React from 'react';
import './Track.css';

export class Track extends React.Component {
  constructor(props){
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  // Method to add a track to the playlist
  addTrack(){
    // Calls the passed down event handler addTrack function from App.js
    this.props.onAdd(this.props.track)
  }

  // Method to remove a track from the playlist
  removeTrack(){
    // Calls the passed down event handler removeTrack function from App.js
    this.props.onRemove(this.props.track)
  }

  // Method to add a JSX element with the add or remove function as well as + or - respectively depending on the props isRemoval that is passed in
  renderAction(){
    if(this.props.isRemoval){
      return <button className="Track-action" onClick={this.removeTrack}>-</button>
    } 
    else {
      return <button className="Track-action" onClick={this.addTrack}>+</button>
    }
  }

  render(){
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }

};




