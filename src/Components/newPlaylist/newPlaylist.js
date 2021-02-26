import React from 'react';
import './newPlaylist.css';
import { TrackList } from '../TrackList/TrackList';

export class Playlist extends React.Component {
  constructor(props){
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.save = this.save.bind(this);
  }

  handleNameChange(e){
    let value = e.target.value;
    // Calls the passed down event handler updatePlaylistName function from App.js
    this.props.onNameChange(value);
  }

  // Method to save the current selected tracks to a new playlist on your spotify account and clear the playlist name input
  save(e){
    // Calls the passed down event handler savePlaylist function from App.js
    this.props.onSave();

    // Selects the <input> element and resets the value to 'New Playlist'
    e.target.previousElementSibling.previousElementSibling.value  = 'New Playlist';
  }

  render(){
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
        <button className="Playlist-save" onClick={this.save}>SAVE TO SPOTIFY</button>
      </div>
    );
  }

};


