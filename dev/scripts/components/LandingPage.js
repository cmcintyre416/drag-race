import React from 'react';
import axios from 'axios';
import SongInfo from './SongInfo';
import SpotifyPopUp from './SpotifyPopUp'
import { Scrollbars } from 'react-custom-scrollbars';
import tokens from '../tokens';
import qs from 'qs';
import AnchorLink from 'react-anchor-link-smooth-scroll'


class LandingPage extends React.Component {

    constructor() {
        super();
        this.state = {
            songsFilteredBySeason: [],
            lyrics: "",
            songTrackPlayer: "",
            songImage: "",
            songName: "",
            visible: false,
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
        const songName = e1;
        const songArtist = e2;
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
            let lyricsData;

            if (data.data.message.body.lyrics.lyrics_body.length === 0) {
                lyricsData = `Im sorry to inform you but ${e1} by ${e2} is not currently available. We're working on it and will have things up and running soon. For now, enjoy the sweet voice of Rick Astley.`
            } else {
                lyricsData = data.data.message.body.lyrics.lyrics_body;
            }

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
                    let spotifyTrackPlay;
                    if (res.data.tracks.items[0] === undefined) {
                        spotifyTrackPlay = 'spotify:track:4uLU6hMCjMI75M1A2tKUQC';
                    } 
                    else {
                        spotifyTrackPlay = res.data.tracks.items[0].uri;
                    }

                    let spotifyAlbumImage;
                    if (res.data.tracks.items[0] === undefined) {
                        spotifyAlbumImage = 'https://cnet1.cbsistatic.com/img/c9h3oM_lU2i63tgOQnmtHyoWhyU=/fit-in/x/2010/02/24/4bf2fb50-fdbe-11e2-8c7c-d4ae52e62bcc/album-rick-astley-greatest-hits.jpg';
                    } else {
                        spotifyAlbumImage = res.data.tracks.items[0].album.images[0].url;
                    }

                    console.log(spotifyTrackPlay);

                    console.log(res.data.tracks.items[0]);

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
                <div className="mainWrapper">
                    <div className="mainView">
                    <a href="https://drag-race.herokuapp.com/auth">Login in with spotify</a>
                    <div>
                        <h1 className="mainHeader" >Lip Sync</h1>
                    </div>
                    <div>
                        <h2 className="flicker-1 secondaryHeader">For You Life</h2>
                        <h3 className="catchPhrase">Good Luck and Don't Fuck It Up</h3>
                    </div>
                </div>
                <ul className="clearfix">
                    <div className="tileContainer clearfix">
                    <form action="">
                        <div className="tileGroup clearfix">
                            <input className="seasonInput"name="radioInputSeason" type="radio" value="1" id="season1" onClick={this.handleClick}></input>
                            <label className="seasonTile" htmlFor="season1">Season 1</label>
                            <input className="seasonInput"name="radioInputSeason" type="radio" value="2" id="season2" onClick={this.handleClick}></input>
                            <label className="seasonTile" htmlFor="season2">Season 2</label>
                            <input className="seasonInput"name="radioInputSeason" type="radio" value="3" id="season3" onClick={this.handleClick}></input>
                            <label className="seasonTile" htmlFor="season3">Season 3</label>
                        </div>
                        <div className="tileGroup clearfix">
                            <input className="seasonInput"name="radioInputSeason" type="radio" value="4" id="season4" onClick={this.handleClick}></input>
                            <label className="seasonTile" htmlFor="season4">Season 4</label>
                            <input className="seasonInput"name="radioInputSeason" type="radio" value="5" id="season5" onClick={this.handleClick}></input>
                            <label className="seasonTile" htmlFor="season5">Season 5</label>
                            <input className="seasonInput"name="radioInputSeason" type="radio" value="6" id="season6" onClick={this.handleClick}></input>
                            <label className="seasonTile" htmlFor="season6">Season 6</label>
                        </div>
                        <div className="tileGroup clearfix">
                            <input className="seasonInput"name="radioInputSeason" type="radio" value="7" id="season7" onClick={this.handleClick}></input>
                            <label className="seasonTile" htmlFor="season7">Season 7</label>
                            <input className="seasonInput"name="radioInputSeason" type="radio" value="8" id="season8" onClick={this.handleClick}></input>
                            <label className="seasonTile" htmlFor="season8">Season 8</label>
                            <input className="seasonInput"name="radioInputSeason" type="radio" value="9" id="season9" onClick={this.handleClick}></input>
                            <label className="seasonTile" htmlFor="season9">Season 9</label>
                        </div>
                    </form>
                        <AnchorLink href="#songCardWrapperID" className="seasonDownButton">Slay Songs</ AnchorLink>
                    </div>
                </ul>
                </div>
                <div className="songCardWrapper" id="songCardWrapperID">
                <Scrollbars renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}>
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
                </Scrollbars>
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
