import React from 'react'
import './SignOut.css';

export const SignOut = ({onSignOut}) => {
  return (
    <button className='sign-out' onClick={onSignOut}>Sign Out</button>
  )
}
