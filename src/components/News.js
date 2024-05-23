import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {


    constructor() {
        super();
        // console.log("This is a constructor from News Component")
        this.state = {
            // articles: this.articles,
            articles: [],
            loading: false,
            page: 1,

        }
    }
    async componentDidMount() {
        let url = " https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=c65477903a694bd49d05f241733b1705&page=1&pageSize=20";
        let data = await fetch(url);
        let ParseData = await data.json();
        // console.log(ParseData);
        this.setState({
            articles: ParseData.articles,
            totalResults: ParseData.totalResults

        })
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=c65477903a694bd49d05f241733b1705&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let ParseData = await data.json();
        // console.log(ParseData);
        this.setState({
            page: this.state.page - 1,
            articles: ParseData.articles,
        })
    }
    handleNextClick = async () => {
        if (this.state.page +1 > Math.ceil(this.state.totalResults /20)) { }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=c65477903a694bd49d05f241733b1705&page=${this.state.page + 1}&pageSize=20`;
            let data = await fetch(url);
            let ParseData = await data.json();
            // console.log(ParseData);
            this.setState({
                page: this.state.page + 1,
                articles: ParseData.articles,
            })
        }
    }



    render() {
        return (
            <div className='container my-3'>
                <h1>NewsMonkey -Top Headliness</h1>
                <div className="row">
                    {this.state.articles.map((element) => {

                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.tite : ''} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}

                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults / 20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
