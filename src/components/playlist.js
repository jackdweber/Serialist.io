import React, {Component} from 'react';
import Video from './video.js';

class Playlist extends Component{
    constructor(props){
        super(props)
        
        this.state = {playlist: false}
    }

    componentWillMount(){
        var videosRef = this.props.database.ref().child('playlists').child(this.props.match.params.key)
        videosRef.once('value', (playlist) => {
            this.setState({playlist: playlist.val()})
        })     
    }

    mapVideos(){
        if(!this.state.playlist){
            return
        }
        return(
            this.state.playlist.videos.map((v) => {
                return(
                    <Video video={v} isPlaylistItem={false} isPublic={true}  />
                )
            })
        )
    }

    render(){
        return(
            <div className='container'  >
                <h1 className='my-3' >{this.state.playlist.name}</h1>
                {this.mapVideos()}
            </div>
        )
    }
}

export default Playlist