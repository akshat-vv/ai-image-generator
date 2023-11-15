import React from 'react'

const ErrorPage = ({error}) => {
    let errorMessage = 'Something went wrong !! Please try again later.';
    if(error.type === "invalid_request_error"){
        errorMessage = 'Something went wrong !!'
    }
  return (
    <div>
       {errorMessage}
    </div>
  )
}

export default ErrorPage