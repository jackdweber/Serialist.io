import React, {Component} from 'react';
import Video from './video.js';
import Player from './player.js';
import Youtube from 'react-youtube';
import $ from 'jquery';

const videoOpts = {
      height: '300',
      width: '400',
      playerVars: { // https://developers.google.com/youtube/player_parameters 
        autoplay: 1,
        controls: 0
      }
}

class Playlist extends Component{
    constructor(props){
        super(props)
        
        this.state = {playlist: false, playerIndex: 0}
    }

    componentWillMount(){
        var videosRef = this.props.database.ref().child('playlists').child(this.props.match.params.key)
        videosRef.once('value', (playlist) => {
            this.setState({playlist: playlist.val()})
        })     
    }

    renderPlayer(){
        if(!this.state.playlist){
            return
        }
        if(this.state.playerIndex >= this.state.playlist.videos.length){
            return
        }
        return(
            <div>
                <h3>Now Playing: {this.state.playlist.videos[this.state.playerIndex].snippet.title}</h3>
                <Youtube videoId={this.state.playlist.videos[this.state.playerIndex].id.videoId} id='videoplayer' className="mx-auto" opts={videoOpts} onEnd={() => {
                        var i = this.state.playerIndex + 1;
                        this.setState({playerIndex: i})
                    }} />
            </div>
        )
    }

    mapVideos(){
        if(!this.state.playlist){
            return
        }
        var count = -1
        return(
            this.state.playlist.videos.map((v) => {
                count++
                return(
                    <Video key={count} index={count} video={v} isPlaylistItem={false} isPublic={true} playSpecific={(k) => {this.setState({playerIndex: k})}} />
                )
            })
        )
    }

    render(){
        return(
            <div className='container'  >
                <h1 className='my-3' id='hi'>{this.state.playlist.name}</h1>
                <button className='btn btn-primary' onClick={(e) => {
                        e.preventDefault()
                        $('#videoplayer').toggle()
                    }} >Toggle Video</button>
                <br />
                <br />
                {this.renderPlayer()}
                {this.mapVideos()}
            </div>
        )
    }
}

export default Playlist