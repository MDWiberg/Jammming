import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

export class TrackList extends React.Component {

  render(){

    // Saves an array filled with Track components made from using the passed props array tracks
    let tracksList = this.props.tracks.map(currentTrack => {
      return <Track track={currentTrack} key={currentTrack.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} /> 
    });
    
    return (
      <div className="TrackList">
          {tracksList}
      </div>
    );
  }

};




