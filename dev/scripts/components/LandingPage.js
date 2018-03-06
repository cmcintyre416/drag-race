import React from 'react';
import axios from 'axios';
import SongInfo from './SongInfo';
import SpotifyPopUp from './SpotifyPopUp'
import tokens from '../tokens';
import qs from 'qs';


class LandingPage extends React.Component {

    constructor() {
        super();
        this.state = {
            songsFilteredBySeason: [],
            lyrics: "",
            songTrackPlayer: "",
            songImage: "",
            songName: "",
            visible: false

        }
        this.handleClick = this.handleClick.bind(this);
        this.getSongArtistAPI = this.getSongArtistAPI.bind(this);
        this.getSpotifyTrack = this.getSpotifyTrack.bind(this);
        this.setVisible = this.setVisible.bind(this);
        this.removePopUp = this.removePopUp.bind(this);
    }
    componentDidMount() {
        const url = new URL(location.href);
        tokens.access_token = url.searchParams.get('access_token');
        tokens.refresh_token = url.searchParams.get('refresh_token');

    }
    handleClick(e) {
        const selectedSeason = e.target.value;
        axios.get(`http://www.nokeynoshade.party/api/seasons/${selectedSeason}/lipsyncs`, {
        })
        .then(({ data }) => {
            console.log(data);
            
            this.setState({
                songsFilteredBySeason: data,
            });
        });
    }
    
    getSongArtistAPI(e1, e2) {
        const songName = e1
        const songArtist = e2
        // console.log(songName, songArtist);

        axios({
            url: 'https://proxy.hackeryou.com',
            params: {
                reqUrl:`http://api.musixmatch.com/ws/1.1/matcher.lyrics.get`, 
                params: {
                    apikey: "453d7516366d76a60f74e279e14bf28a",
                    format: "json",
                    f_has_lyrics: true,
                    q_track: `${e1}`,
                    q_artist: `${e2}`,
                }
            },
            paramsSerializer: function (params) {
                return qs.stringify(params, { arrayFormat: 'brackets' })
            },
        })
        .then((data) => {
            const lyricsData = data.data.message.body.lyrics.lyrics_body
            console.log(data.data.message.body.lyrics.lyrics_body);
            this.setState({
                lyrics: lyricsData,
            });
        });
    }

    getSpotifyTrack(e1, e2) {

        const songName = e1;
        const songArtist = e2;
        console.log(songArtist);

        tokens.getToken()
            .then(token => {
                axios({
                    url: 'https://api.spotify.com/v1/search',
                    params: {
                        type: 'track', 
                        q: `${songName} + ${songArtist}`
                    },
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                })
                .then(res => {
                    const spotifyTrackPlay = res.data.tracks.items[0].uri;
                    const spotifyAlbumImage = res.data.tracks.items[0].album.images[0].url;
                    
                    console.log(spotifyAlbumImage, spotifyTrackPlay);
                    
                    const TrackLink = `https://open.spotify.com/embed?uri=${spotifyTrackPlay}`;
                    this.setState({
                        songTrackPlayer: TrackLink,
                        songImage: spotifyAlbumImage,
                        songName: songName
                    });
                })
            })
    }

    setVisible() {
        this.setState(prev => ({
            visible: !prev.visible
        }));
    }

    removePopUp() {
        this.setState(prev => ({
            visible: !prev.visible
        }));
    }
    
    render() {
        return (
            <div className="wrapper clearfix">
                <a href="https://drag-race.herokuapp.com/auth">Login in with spotify</a>
                <h1 className="flicker-1">Lip Sync <br/> <span className="headerSpan">For Your Life</span></h1>
                    <ul className="clearfix">
                        <li className="seasonTile" value="1" onClick={this.handleClick}>Season 1</li>
                        <li className="seasonTile" value="2" onClick={this.handleClick}>Season 2</li>
                        <li className="seasonTile" value="3" onClick={this.handleClick}>Season 3</li>
                        <li className="seasonTile" value="4" onClick={this.handleClick}>Season 4</li>
                        <li className="seasonTile" value="5" onClick={this.handleClick}>Season 5</li>
                        <li className="seasonTile" value="6" onClick={this.handleClick}>Season 6</li>
                        <li className="seasonTile" value="7" onClick={this.handleClick}>Season 7</li>
                        <li className="seasonTile" value="8" onClick={this.handleClick}>Season 8</li>
                        <li className="seasonTile" value="9" onClick={this.handleClick}>Season 9</li>
                    </ul>
                <div className="songCardWrapper">
                    {this.state.songsFilteredBySeason.map((song, i) => {
                        return (
                            <SongInfo 
                                getSongArtistAPI={this.getSongArtistAPI}
                                getSpotifyTrack={this.getSpotifyTrack}
                                setVisible={this.setVisible}
                                song={song}
                                key={`song-${i}`}
                                songIndex={i} 
                            />
                        )
                    })}
                </div>
                <div className="spotifyPopUpWrapper">
                    <SpotifyPopUp
                        visible={this.state.visible}
                        lyrics={this.state.lyrics}
                        songTrackPlayer={this.state.songTrackPlayer}
                        songImage={this.state.songImage}
                        removePopUp={this.removePopUp}
                        songName={this.state.songName}
                    />
                </div>
                {/* <div>
                    <p>{this.state.lyrics}</p>
                    <iframe src={this.state.songTrackPlayer}
                    frameBorder="0" allow="encrypted-media" allowtransparency="true"></iframe>
                    <img src={this.state.songImage} alt=""/>
                </div> */}
            </div>
        )
    }
}

export default LandingPage;
