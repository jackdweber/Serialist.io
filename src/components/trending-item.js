import React, {Component} from 'react';
import Playlist from './playlist.js';
import {Link} from 'react-router-dom';

//Component for rendering a playlist
//It will offer ways to edit a playlist if you are the owner.
//This will be used with react-router

class TrendingItem extends Component{
    constructor(props){
        super(props)

        this.state = {owner: false}
    }


    componentWillMount(){  
        
    }

    componentWillReceiveProps (nextProps) {
        for(var p in nextProps.playlist){
            this.setState({playlist: nextProps.playlist[p], playlistName: p})
        }
    }


    render(){
        return(
            <div>
                <div className='p-3 d-flex align-items-center'>
                    <h1 className='p-2'>{this.props.playlist.name}</h1>
                    <span className='p-2'>Genre: {this.props.playlist.genre}</span>
                    <span className='p-2 ml-2'>Votes: {this.props.playlist.vote}</span>
                    <a href="#" className='p-2 ml-2' onClick={(e) => {
                            e.preventDefault()
                            this.props.upvotePlaylist(this.props.playlist._key, this.props.playlist.vote - 1, false)
                        }}>Down</a>
                    <a href="#" className='p-2 ml-2' onClick={(e) => {
                            e.preventDefault()
                            this.props.upvotePlaylist(this.props.playlist._key, this.props.playlist.vote + 1, true)
                        }}>Up</a>
                    <Link className='p-2 ml-2' to={'playlist/' + this.props.playlist._key}>View</Link>
                </div>
            </div>
        )
    }
}

export default TrendingItem