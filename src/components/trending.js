import React, {Component} from 'react';
import TrendingItem from './trending-item.js';

//Component for determining what is 'trending' and displays a list.
//Will be based on genre

class Trending extends Component{
    constructor(props){
        super(props)

        this.state = {playlists: false, voteInfo: false}
    }

    componentWillMount(){
        this.getAndSortPlaylists()
        if(!this.props.user){
            return
        }
        this.getVoteInfo()
    }



    //-----
    //firebase Queries

    getAndSortPlaylists(){
        var trendingRef = this.props.database.ref().child('playlists').orderByChild('vote')
        trendingRef.once('value', (snapshot) => {
            var playlists = []
            snapshot.forEach((child) => {
                playlists.unshift({
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

    getVoteInfo(){
        var userInfoRef = this.props.database.ref().child(this.props.user.uid).child('voteInfo')
        userInfoRef.once('value', (snapshot) => {
            this.setState({voteInfo: snapshot.val()})
        })
    }

    upvotePlaylist(key, vote, isUp){
        if(!this.props.user){
            alert('Please Sign In!')
            return
        }

        if(this.state.voteInfo[key]){
            if(this.state.voteInfo[key].dir == 'up' && isUp){
                alert('You have already up voted this!')
                return
            }
            else if(this.state.voteInfo[key].dir == 'down' && !isUp){
                alert('You have already down voted this!')
                return
            }
            else if(this.state.voteInfo[key].dir == 'down' && isUp){
                vote++
            }
            else if(this.state.voteInfo[key].dir == 'up' && !isUp){
                vote--
            }
            else{

            }
        }

        var userInfoRef = this.props.database.ref().child(this.props.user.uid).child('voteInfo').child(key)
        if(isUp){
            userInfoRef.set({dir: 'up'})
        }
        else{
            userInfoRef.set({dir: 'down'})
        }

        var playlistRef = this.props.database.ref().child('playlists').child(key)
        playlistRef.update({vote: vote}, () => {
            this.getAndSortPlaylists()
            this.getVoteInfo()
        })
    }



    //-----
    //Render functions
    renderPlaylists(){
        if(!this.state.playlists){
            return
        }
        else{
            return(
                this.state.playlists.map((p) => {
                    var pkey = p._key
                    return(
                        <TrendingItem key={p._key} prevent={false} playlist={p} upvotePlaylist={(key, vote, dir) => this.upvotePlaylist(key, vote, dir)} />
                    )
                })
            )
        }
    }


    render(){
        return(
            <div className='container'>
                <h1 className='my-3'>Trending</h1>
                <div className='col-sm-8'>
                    {this.renderPlaylists()}
                </div>
            </div>
        )
    }
}

export default Trending;