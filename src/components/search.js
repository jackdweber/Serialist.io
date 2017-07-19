import React, {Component} from 'react';
import YTSearch from 'youtube-api-search';
import Video from './video.js';

//This is the component used for creating a new playlist.

const YT_API_KEY = 'AIzaSyBNHg4ChmXpLBvv_tQd5zEmTlvILN5lasc'

class Search extends Component{
    constructor(props){
        super(props)

        this.state = {term: '', database: props.database, playlistQueue: [], playlistGenre: 'Random'}
    }

    uploadQueue(userId, database, playlistName){
        if (!playlistName || playlistName === '' || playlistName === ' '){
            alert('Playlist name empty!')
            return
        }
        var videos = this.state.playlistQueue
        var newPlaylistKey = database.ref().child('playlists').push({
            videos: videos,
            name: playlistName,
            user: userId,
            vote: 0,
            genre: this.state.playlistGenre
        }).then(() => {
            this.setState({playlistQueue: [], playlistName: '', playlistGenre: 'Random'})
            alert('Success!')
        })
    }

    addToQueue(v){
        var tempArray = this.state.playlistQueue
        tempArray.push(v)
        this.setState({playlistQueue: tempArray})
    }

    deleteFromQueue(v){
        var tempArray = this.state.playlistQueue
        var index = tempArray.indexOf(v)
        tempArray.splice(index, 1)
        this.setState({playlistQueue: tempArray})
    }

    displayQueue(){
        return(
            this.state.playlistQueue.map((v) => {
                return(
                    <div key={v.etag}>
                        <Video video={v} isPlaylistItem={true} isPublic={false} deleteFromQueue={(v) => this.deleteFromQueue(v)} />
                        <br />
                    </div>
                )
            })
        )
    }

    displayVideos(){
        if (this.state.videos && this.state.term !== ''){
            //console.log(this.state.videos)
            return(
                this.state.videos.map((v) => {
                    return(
                        <div key={v.etag}>
                            <Video video={v} isPlaylistItem={false} isPublic={false} addToQueue={(v) => this.addToQueue(v)} />
                            <br />
                        </div>
                    )
                })
            )
        }
    }

    render(){
        return(
            <div className='container'>
                <h1 className='my-3'>New Playlist</h1>
                {this.props.user &&
                <div>
                    <input type='text' placeholder='Enter Search Here' className='form-control' onInput={(e) => {

                        this.setState({term: e.target.value})
                        YTSearch({key: YT_API_KEY, term: this.state.term}, (data) => this.setState({videos: data}))

                    }} value={this.state.term} />
                    
                    <div className='row'>
                        <div className='col-7 offset-sm-1 mt-3'>
                            <h1 className='mt-3'>Results for {this.state.term}<span className='blink'>|</span></h1>
                            <br />
                        
                            {this.displayVideos()}
                        
                        </div>
                        <div className='col-sm-4 col-5 mt-3'>
                            <h1 className='mt-3'>Videos to add</h1>
                            <br />

                            {this.displayQueue()}

                            <form className='form-inline'>
                                <input type='text' className='form-control' onInput={(e) => {

                                        this.setState({playlistName: e.target.value})

                                }}/>
                                <select value={this.state.playlistGenre} onChange={(e) => this.setState({playlistGenre: e.target.value})}>
                                    <option value="Random">Random</option>
                                    <option value="Rap">Rap</option>
                                    <option value="Country">Country</option>
                                    <option value="Rock">Rock</option>
                                    <option value="EDM">EDM</option>
                                </select>
                                <button type='submit' className='btn btn-primary ml-1' onClick={(e) => {
                                    
                                        e.preventDefault()
                                        this.uploadQueue(this.props.user.uid, this.state.database, this.state.playlistName)

                                    }}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default Search