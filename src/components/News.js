import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
let a=props.mode;
    const [articles, setarticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);

    }



    const updateNews = async () => {
        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        props.setProgress(50)
        let data = await fetch(url);
        let ParseData = await data.json();
        //  props.setProgress(70)
        // console.log(ParseData);
        setarticles(ParseData.articles)
        setTotalResults(ParseData.totalResults)
        props.setProgress(100)
        setLoading(false)
    }
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} -NewsMonkey`
        updateNews()
        // eslint-disable-next-line
    }, [])



    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        setLoading(true)

        let data = await fetch(url);
        let ParseData = await data.json();
        // console.log(ParseData);
        setarticles(articles.concat(ParseData.articles))
        setTotalResults(ParseData.totalResults)
        setLoading(false)


    };

    // handlePrevClick = async () => {
    //         setPage(page-1)
    //      updateNews()
    // }
    // handleNextClick = async () => {
    //          setPage(page+1)
    //      updateNews()
    // }




    return (
        <>
            <h1 className='text-center' style={{ margin: "35px 0px", marginTop: "90px",color:props.mode === "dark" ? "white" : "#042743" }} >NewsMonkey -Top {capitalizeFirstLetter(props.category)} Headliness</h1>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}>
                <div className='container my-3'>
                    <div className="row">
                        {articles.map((element) => {

                            return <div className="col-md-4" key={element.url}>
                                <NewsItem mode={a}  title={element.title ? element.title :''} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : 'Unknown'} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}

                    </div>
                </div >
            </InfiniteScroll>

            {/* <div className="container d-flex justify-content-between">
                    <button disabled={   page <= 1} type="button" className="btn btn-dark" onClick={ handlePrevClick}>&larr; Previous</button>
                    <button disabled={   page + 1 >   Math.ceil(   totalResults /  props.pageSize)}
                    type="button" className="btn btn-dark" onClick={ handleNextClick}>Next &rarr;</button>
                </div> */}

        </>
    )

}
// News.defaultProps = {
//     country: 'in',
//     pageSize: 5,
//     category: 'general',
// }

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
