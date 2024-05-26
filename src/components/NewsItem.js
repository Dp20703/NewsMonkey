import React from 'react'

const NewsItem = (props) => {


    let { title, description, imgUrl, newsUrl, author, date, source } = props;
    return (
        <div className='my-3'>
            <div className="card">
                <div>
                    <span className="d-flex justify-content-end  position-absolute   badge rounded-pill bg-danger" style={{ right: '0' }}>  {source}</span>

                </div>
                <img src={imgUrl ? imgUrl : "https://images.moneycontrol.com/static-mcnews/2024/05/20240520181216_Feat-sec.jpg"} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                    <p className="card-text">{description}</p>
                    <a rel="noreferrer" href={newsUrl} target='_blank' className="btn  btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )

}

export default NewsItem
