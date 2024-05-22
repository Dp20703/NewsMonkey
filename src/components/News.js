import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
   

    constructor() {
        super();
        // console.log("This is a constructor from News Component")
        this.state = {
            // articles: this.articles,
            articles: [],
            loading: false
        }
    }
     async componentDidMount(){
        let url="https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=c65477903a694bd49d05f241733b1705";
        let data= await fetch(url);
        let ParseData=await data.json();
        console.log(ParseData);
        this.setState({
            articles:ParseData.articles,
        })
    }
    
    
    render() {
        return (
            <div className='container my-3'>
                <h1>NewsMonkey -Top Headliness</h1>
                <div className="row">
                    {this.state.articles.map((element) => {

                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title?element.tite:''} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}

                </div>
            </div>
        )
    }
}

export default News
