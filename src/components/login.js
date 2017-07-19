import React from 'react';

//Component that shows a box with different auth options.
//(Currently only google.)

const LogIn = ({login}) => {
    return(
        <div className="card col-6 mx-auto loginBox">
            <div className="card-block">
                <p className='p-lead'>Pleas sign in with an option below</p>
                <p>You will be signed out automatically when you leave the site</p>
                <button className='btn btn-warning' onClick={() => login()}>Sign In with Google</button>
            </div>
        </div>
    )
}

export default LogIn