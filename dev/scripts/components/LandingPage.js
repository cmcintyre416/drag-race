import React from 'react';
import axios from 'axios';
import UserSelectedSeason from './UserSelectedSeason';
import SongInfo from './SongInfo';

class LandingPage extends React.Component {

    constructor() {
        super();
        this.state = {
            songsFilteredBySeason: [],

        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        // const newSelection = this.state.songsFilteredBySeason;
        // newSelection = value;
        const selectedSeason = e.target.value;
        console.log(selectedSeason);
        axios.get(`http://www.nokeynoshade.party/api/seasons/${selectedSeason}/lipsyncs`, {

        })
        .then(({ data }) => {
            console.log(data);

            this.setState({
                songsFilteredBySeason: data
            });
        });
    }

    render() {
        return (
            <div>
                <ul>
                    <li value="1" onClick={this.handleClick}>Season 1</li>
                    <li value="2" onClick={this.handleClick}>Season 2</li>
                    <li value="3" onClick={this.handleClick}>Season 3</li>
                    <li value="4" onClick={this.handleClick}>Season 4</li>
                    <li value="5" onClick={this.handleClick}>Season 5</li>
                    <li value="6" onClick={this.handleClick}>Season 6</li>
                    <li value="7" onClick={this.handleClick}>Season 7</li>
                    <li value="8" onClick={this.handleClick}>Season 8</li>
                    <li value="9" onClick={this.handleClick}>Season 9</li>
                </ul>
                <div>
                    {this.state.songsFilteredBySeason.map((song, i) => {
                        return (
                            <div>
                            <SongInfo 
                                song={song}
                                key={`song-${i}`}
                                songIndex={i}
                            />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default LandingPage;