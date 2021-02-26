import React from 'react';
import './UserPlaylist.css';
import { PlaylistList } from '../PlaylistLists/PlaylistList';

export class UserPlaylist extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isReady: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  // Method to retrieve the user's current playlists and display it as well as a button to view the playlists tracks
  handleClick(){
    // Calls the passed down event handler getUserPlaylists function from App.js
    this.props.onGetUserPlaylists();

    // Calls the passed down resetRenderButton function from App.js
    this.props.onResetRenderButton();

    // Updates state prop isReady to true so the jsx element with the playlists information will render
    this.setState({
      isReady: true
    });
  }

    // Method to render the a title for current playlists or playlist tracks based on the boolean value of the passed in renderButton prop
    renderButton(){
      // Returns the view button if prop is true and does not if prop is false
      if(this.props.renderButton){
        return <h2>Current Playlists</h2>;
      } 
      else {
        return <h2>Playlist Tracks</h2>;
      }
    }

  render(){

    console.log(this.props.userPlaylists);

    // Holds the jsx with the PlaylistList component to display the user's current playlists
    let jsxToRender = (
      <div className="userPlaylistList">
        {this.renderButton()}
        <PlaylistList 
          playlists={this.props.userPlaylists} 
          isRemoval={true} 
          onDisplayPlaylistTracks={this.props.onDisplayPlaylistTracks} 
          renderButton={this.props.renderButton} 
          onUpdateRenderButton={this.props.onUpdateRenderButton}
        />
      </div>
    );

    return (
      <div className="userPlaylists">
        <button className="userPlaylists-View" onClick={this.handleClick}>View Current Playlists</button>
        {this.state.isReady ? jsxToRender : <div></div>}
      </div>
    );
  }

};



