import React from 'react';

const SongInfo = (props) => {
        return (
            <div className="songCard clearfix">
                <ul className="clearfix songlist">
                    <li
                        className="songArtist">{props.song.artist}
                    </li>
                    <div className="songNameWrapper">
                        <li 
                            className="songName">{props.song.name}
                        </li>
                    </div>
                    {props.song.queens.map((queen, i ) => {
                        return (
                            <li className="songQueen" key={`-${i}`}>
                                {queen.name}
                            </li>
                        )
                    })}
                </ul>
                <div className="buttonContainer clearfix">
                    <button 
                        onClick={() => {props.getSongArtistAPI(props.song.name, props.song.artist); props.getSpotifyTrack(props.song.name, props.song.artist);
                        props.setVisible();}}
                        className="slayButton"
                        >
                        Slay
                    </button>
                </div>

            </div>
        );
}


export default SongInfo;