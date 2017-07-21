import React from 'react';
import youtubeVideo from 'youtube-video'
//const youtubeVideo = require('youtube-video')

const Player = (props) => {
    return(
        <div className='card mx-auto' id='playerId'>
            {
                youtubeVideo(props.videoKey, {
                    elementId: 'playerId',
                    width: 400,
                    height: 300,
                    autoplay: true,
                    controls: false,
                    onEnd: props.nextVideo
                })
            }
        </div>
    )
}

export default Player;