import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 5,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);

    }

    constructor(props) {
        super(props);
        // console.log("This is a constructor from News Component")
        this.state = {
            // articles: this.articles,
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} -NewsMonkey`
    }
    async updateNews() {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c65477903a694bd49d05f241733b1705&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        this.props.setProgress(50) 
        let data = await fetch(url);
        let ParseData = await data.json();
        this.props.setProgress(70)
        // console.log(ParseData);
        this.setState({
            articles: ParseData.articles,
            totalResults: ParseData.totalResults,
            loading: false

        })
        this.props.setProgress(100)
    }
    async componentDidMount() {
        this.updateNews()
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c65477903a694bd49d05f241733b1705&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let ParseData = await data.json();
        // console.log(ParseData);
        this.setState({
            articles: this.state.articles.concat(ParseData.articles),
            totalResults: ParseData.totalResults,
            loading: false

        })

    };

    // handlePrevClick = async () => {
    //     this.setState({ page: this.state.page - 1 })
    //     this.updateNews()
    // }
    // handleNextClick = async () => {
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews()
    // }



    render() {
        return (
            <>
                <h1 className='text-center' style={{ margin: "35px 0px" }}>NewsMonkey -Top {this.capitalizeFirstLetter(this.props.category)} Headliness</h1>
                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}>
                    <div className='container my-3'>
                        <div className="row">
                            {this.state.articles.map((element) => {

                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.tite : ''} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : 'Unknown'} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}

                        </div>
                    </div >
                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > 3}
                    //  Math.ceil(this.state.totalResults / this.props.pageSize)}
                    type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}

            </>
        )
    }
}

export default News
