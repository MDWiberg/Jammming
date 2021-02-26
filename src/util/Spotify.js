let clientID = "dfa82bf929464e3e85570dde101150db";
let redirectURI = "http://spotify-playlist-creator.surge.sh";
// For use with localhosting
let redirectURI2 = "http://localhost:3000/";

let userAccessToken;

export const Spotify = {

  // Method return a access token from spotify
  getAccessToken(){

    if(userAccessToken){

      return userAccessToken;

    } 
    // If an access token and expiration are given in the returned URL then the token and time are retrieved with the help of regex
    else if(window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)){

      userAccessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      console.log(userAccessToken);
      let expirationTime = window.location.href.match(/expires_in=([^&]*)/)[1];
      console.log(expirationTime);
  
      // Resets the access token after a certain time (1 hour)
      window.setTimeout(() => userAccessToken = '', expirationTime*1000);
      window.history.pushState('Access Token', null, '/');

    } 
    // If there is no access token retrieved yet, redirects user to the given location
    else if(userAccessToken === "" || !userAccessToken){
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
    }


  },

  // Method to return tracks based on the input search term
  search(searchTerm){
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, 
      { headers: {Authorization: `Bearer ${userAccessToken}`}}
    )
    .then((response) => {  
      return response.json();
    })
    .then((jsonResponse) => {
      // If the response does not have any tracks, returns an empty array
      if(jsonResponse.tracks.items.length === 0){
        return [];
      }
      // Declare newTracksArr variable to hold an array of objects with the following properties
      let newTracksArr = jsonResponse.tracks.items.map(track => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        };
      });
      return newTracksArr;
    })
    .catch(err => console.log(err.message));
  },

  // Method to save a playlist to your spotify account
  savePlaylist(playlistName, trackURIsArr){

    if(playlistName && trackURIsArr){
      let accessToken = userAccessToken;
      let header = {'Authorization': 'Bearer ' + accessToken};
      let userID;
      let playlistID;

      // Request to obtain the user ID
      fetch('https://api.spotify.com/v1/me', {headers: header})
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        userID = jsonResponse.id;

        // --------
        // Request to create a playlist with the user ID
        fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
        {
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({name: playlistName})
        }
        )
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          playlistID = jsonResponse.id;

          // -------
          // Request to add tracks to a playlist with the user ID and playlist ID
          fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
          {
            headers: {
              'Authorization': 'Bearer ' + accessToken,
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({uris: trackURIsArr})
          }
          )
          .then((response) => {
            return response.json();
          })
          .then((jsonResponse) => {
            playlistID = jsonResponse.id;
          }) // End to .then for third fetch

        }) // End to .then for second fetch

      }) // End to .then for first fetch

      .catch((err) => { console.log(err.message)});

    } else {
      return;
    }

  },

  // Method to return current user's playlists
  getUserPlaylists(){
    let accessToken = userAccessToken;
    let header = {'Authorization': 'Bearer ' + accessToken};

    // Request to fetch the user's current playlists
    return fetch('https://api.spotify.com/v1/me/playlists', {headers: header})
    .then((response) =>{
      return response.json();
    })
    .then((jsonResponse) => {
      // If the response does not have any playlists, returns an empty array
      if(jsonResponse.items.length === 0){
        return [];
      }
      // Declare userPlaylistsArr variable to hold an array of objects with the following properties
      let userPlaylistsArr = jsonResponse.items.map(playlist => {
        return {
          id: playlist.id,
          name: playlist.name,
          uri: playlist.uri
        };
      });
      return userPlaylistsArr;
    })
    .catch(err => console.log(err.message));

  },

  // Method returns the selected playlist's tracks
  displayPlaylistTracks(playlistID){
    let accessToken = userAccessToken;
    let header = {'Authorization': 'Bearer ' + accessToken};

    // Request returns the playlist correlated with the input playlist_id
    return fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {headers: header})
    .then((response) =>{
      return response.json();
    })
    .then((jsonResponse) => {
      // If the response does not have any playlists, returns an empty array
      if(jsonResponse.tracks.items.length === 0){
        return [];
      }
      // Declare tracks variable to hold an array of objects with the following properties
      let tracks = jsonResponse.tracks.items.map(object => {
        return {
          id: object.track.id,
          name: object.track.name,
          artist: object.track.artists[0].name,
          album: object.track.album.name,
          uri: object.track.uri
        };
      });
      return tracks;
    })
    .catch(err => console.log(err.message));

  }

};

// Spotify.getAccessToken();
