import React from 'react';
import './PlaylistList.css';
import { Playlists } from '../Playlists/Playlists';

export class PlaylistList extends React.Component {

  render(){

    // Saves an array filled with playlists components made from using the passed props array playlists
    let playlistList = this.props.playlists.map(currentPlaylist => {
      return (
        <Playlists 
          playlist={currentPlaylist} 
          key={currentPlaylist.id} 
          onDisplayPlaylistTracks={this.props.onDisplayPlaylistTracks} 
          renderButton={this.props.renderButton}
          onUpdateRenderButton={this.props.onUpdateRenderButton}
          
        />
      );
    });
    
    return (
      <div className="PlaylistList">
          {playlistList}
      </div>
    );
  }

};


