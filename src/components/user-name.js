import React from 'react';

const UserName = ({database, user}) => {
    return(
        <div>
            <h1>Attention!</h1>
            <h3>Please create a username to continue</h3>
            <div className="card col-6 mx-auto loginBox">
                <div className="card-block">
                    <p className='p-lead'>Enter your username below</p>
                    <input type="text"   />
                    <button className='btn btn-warning' >Update username</button>
                </div>
            </div>
        </div>
    )
}

export default UserName