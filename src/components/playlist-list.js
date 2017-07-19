import React, {Component} from 'react';

//Component for showing a list of the user's playlists.

class PlaylistList extends Component{

    constructor(props){
        super(props)

        this.state = {playlists: false}
    }

    componentWillMount(){
        if(this.props.userId) this.updateList();
    }

    //-----
    //Database functions
    updateList(){
        var userPlaylistsRef = this.props.database.ref().child('playlists').orderByChild('user').equalTo(this.props.userId)
        userPlaylistsRef.once('value', (snapshot) => {
            var playlists = []
            snapshot.forEach((child) => {
                playlists.push({
                    name: child.val().name,
                    genre: child.val().genre,
                    vote: child.val().vote,
                    user: child.val().user,
                    _key: child.key
                })
            })
            this.setState({playlists: playlists})
        },(error) => {
            console.log(error)
        })
    }

    deletePlaylist(key){
        var playlistToDeleteRef = this.props.database.ref().child('playlists').child(key)
        playlistToDeleteRef.remove().then(() => {
            this.updateList()
        })
    }




    //-----
    //Rendering

    renderPlaylists(){
        if (this.state.playlists != false){
            var count = -1
            return(
                this.state.playlists.map((p) => {
                    count++

                    return(
                        <div key={p._key} className='p-3 d-flex align-items-center'>
                            <h1 className='p-2'>{p.name}</h1>
                            {/*{this.iterate(p.videos)}*/}
                            <span className='p-2'>Votes: {p.vote}</span>
                            <a href="/" className='p-2 ml-2'>edit</a>
                            <a href="/" className='p-2 ml-2'>view</a>
                            <a href="/" className='p-2' onClick={(e) => {
                                    //onClick
                                    e.preventDefault()
                                    this.deletePlaylist(p._key)
                                }}>delete</a>
                        </div>
                    )
                })
            )
        }
    }

    render(){
        return(
            <div className='container'>
                <h1 className='my-3'>Your Playlists</h1>
                <div className='row'>
                    <div className='col-7 offset-sm-1 mt-3'>
                            <br />
                        
                            {this.props.userId && this.renderPlaylists()}
                        
                        </div>
                </div>
            </div>
        )
    }

}

export default PlaylistList