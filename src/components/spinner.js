import React from 'react'
// import loading from './loading.gif'

const spinner = () => {
    return (
        <div className="text-center my-3">
            {/* <img src={loading} alt="loading"  style={{backgroundColor:"black"}}/> */}

            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>

        </div>
    )

}
export default spinner
