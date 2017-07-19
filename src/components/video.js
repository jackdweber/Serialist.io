import React from 'react';

//The component for showing a video.

const Video = ({video, isPlaylistItem, addToQueue, deleteFromQueue, isPublic}) => {
    return(
        <div className="card my-3">
            
            <div className="card-block">

                <img className='float-left mr-3' src={video.snippet.thumbnails.default.url} />
                
                <h4 className="card-title">{video.snippet.title}</h4>
                <p className="card-text">{video.snippet.description}</p>
                
            </div>

            <div className='card-block text-center'>

                <a href={'https://www.youtube.com/watch?v=' + video.id.videoId} target="_blank" className='card-link'>Watch</a>
                
                    {!isPlaylistItem && !isPublic &&
                    <a href="" className='card-link' onClick={(e) => {
                        
                            e.preventDefault()
                            addToQueue(video)

                        }}>Add</a>
                    }

                    {isPlaylistItem && !isPublic &&
                    <a href="" className='card-link' onClick={(e) => {
                        
                            e.preventDefault()
                            deleteFromQueue(video)

                        }}>Delete</a>
                    }

            </div>
        </div>
    )
}

export default Video