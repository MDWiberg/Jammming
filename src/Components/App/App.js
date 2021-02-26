import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../newPlaylist/newPlaylist';
import { UserPlaylist } from '../UserPlaylist/UserPlaylist';
import { Spotify } from '../../util/Spotify.js';
// Call to get token for later use 
Spotify.getAccessToken();

export class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      searchResults: [],
      playlistName:  '',
      playlistTracks: [],
      userPlaylists: [],
      renderButton: true
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.getUserPlaylists = this.getUserPlaylists.bind(this);
    this.displayPlaylistTracks = this.displayPlaylistTracks.bind(this);
    this.updateRenderButton = this.updateRenderButton.bind(this);
    this.resetRenderButton = this.resetRenderButton.bind(this);
  }

  // Method adds a track to a playlist
  addTrack(track){
    // Checks if the track is already in the playlist and returns if it is
    if(this.state.playlistTracks.find(tracksInList => tracksInList.id === track.id)){
      return;
    }

    // Declare playlist variable to hold the playlistTracks state and then push the new track into the state array
    let playlist = this.state.playlistTracks;
    playlist.push(track);

    // Sets the new state to update the new array with the added track
    this.setState({
      playlistTracks: playlist
    });
  }

  // Method removes a track from a playlist
  removeTrack(track){
    // Declare variable playlist to hold an array full of all the tracks except the one you want to remove
    let playlist = this.state.playlistTracks.filter(tracksInList => tracksInList.id !== track.id);

    // Sets the new state to update the new array with the track removed
    this.setState({
      playlistTracks: playlist
    });
  }

  // Method resets the state of the playlistName back to 'New Playlist'
  updatePlaylistName(newName){

    // Sets the new state to update the playlistName 
    this.setState({
      playlistName: newName
    });
  }

  // Method saves playlist on your spotify account
  savePlaylist(){

    // Declare new variable that holds an array of each tracks uri to use as a parameter in the Spotify.savePlaylist call
    let trackURIs = [];
    this.state.playlistTracks.forEach(track => trackURIs.push(track.uri));

    // Calls the savePlaylist method from the module Spotify
    Spotify.savePlaylist(this.state.playlistName, trackURIs);

    // Resets the state of playlistName and playlistTracks
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    });

  }

  // Method returns tracks based on the seach term you entered
  search(searchTerm){
    let thisApp = this;
    // console.log(Spotify.search(searchTerm));
    // Calls the search method from the module Spotify
    Spotify.search(searchTerm)
    // Consume returned promise and update state to the returned search results array
    .then(searchResultsArr => {
      console.log(searchTerm);
      console.log(searchResultsArr);
      thisApp.setState({
        searchResults: searchResultsArr
      });
    });

  }

  // Method returns a list of the user's current playlists and displays them 
  getUserPlaylists(){
    let thisApp = this;

    // Calls the getUserPlaylists method from the module Spotify
    Spotify.getUserPlaylists()
    // Consume returned promise and update state to the returned user playlists array
    .then(userPlaylistsArr => {
      console.log(userPlaylistsArr);
      thisApp.setState({
        userPlaylists: userPlaylistsArr
      });
    });
  }

  // Method displays the selected playlist's tracks
  displayPlaylistTracks(playlistID){
    let thisApp = this;

    // Calls the getUserPlaylists method from the module Spotify
    Spotify.displayPlaylistTracks(playlistID)
    // Consume returned promise and update state to the returned tracks array
    .then(userPlaylistTracks => {
      console.log(userPlaylistTracks);
      thisApp.setState({
        userPlaylists: userPlaylistTracks
      });
    });
  }

  // Method will be passed down to update the renderButton state so the view button will not be visible on displayed tracks
  updateRenderButton(){
      this.setState({
        renderButton: false
      });
  }

  // Method will be passed down to update the renderButton state so the view button will be visible on displayed playlists
  resetRenderButton(){
    this.setState({
      renderButton: true
    });
  }


  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar 
          onSearch={this.search} 
        />
          <div className="App-playlist">

            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack} 
            />
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName} 
              onSave={this.savePlaylist} 
            />

            <UserPlaylist 
              onGetUserPlaylists={this.getUserPlaylists} 
              onDisplayPlaylistTracks={this.displayPlaylistTracks}
              userPlaylists={this.state.userPlaylists}
              renderButton={this.state.renderButton}
              onUpdateRenderButton={this.updateRenderButton}
              onResetRenderButton={this.resetRenderButton}
            />

          </div>
        </div>
      </div>
    );
  }

}



