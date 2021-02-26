import React from 'react';
import './Playlists.css';

export class Playlists extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      renderButton: true
    }

    this.addPlaylist = this.addTrack.bind(this);
    this.removePlaylist = this.removeTrack.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  // Method to add a track to the playlist
  addTrack(){
    // Saves the passed down event handler addTrack function from App.js to the add variable
    let add = this.props.onAdd;
    add(this.props.playlist);
  }

  // Method to remove a track from the playlist
  removeTrack(){
    // Saves the passed down event handler removeTrack function from App.js to the remove variable
    let remove = this.props.onRemove;
    remove(this.props.playlist);
  }

  // Method to display the tracks from the selected playlist
  handleOnClick(){
    console.log(this.state.renderButton);

    // Calls passed down method to update the state held in App.js of renderButton property
    this.props.onUpdateRenderButton();
    console.log(this.state.renderButton);

    // Call passed down method to display the tracks of a playlist
    this.props.onDisplayPlaylistTracks(this.props.playlist.id);
  }

  // Method to render the view button based on the boolean value of the passed in renderButton prop
  renderButton(){
    // Returns the view button if prop is true and does not if prop is false
    if(this.props.renderButton){
      return <button className="Playlists-action" onClick={this.handleOnClick}>View</button>
    } 
    else {
      return;
    }
  }

  renderTrackInfo(){
    // Returns the view button if prop is true and does not if prop is false
    if(!this.props.renderButton){
      return <p>{this.props.playlist.artist} | {this.props.playlist.album}</p>;
    } 
    else {
      return;
    }
  }

  render(){
    return (
      <div className="Playlists">
        <div className="Playlists-information">
          <h3>{this.props.playlist.name}</h3>
          {/* <p>{this.props.playlist.artist}</p> */}
          {this.renderTrackInfo()}
        </div>
        {this.renderButton()}
      </div>
    );
  }

};




