import React, { Component } from "react";
import Newsitem from "./Newsitem";

export default class News extends Component {

    constructor() {
      super();
      // console.log("Hello I am a constructor from news component");
      this.state = {  
        articles: [],
        loding : false,
        page : 1
      };
    }
  async componentDidMount(){ 
    // console.log("bhavy");
    let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=68476c07dc894b00a95fcc4af3fc5a8e&page=1&pageSize=5";
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({articles : parseData.articles, totalResults : parseData.totalResults});
  }

  handlerPreviousClick = async () => {
    // console.log("previous");
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=68476c07dc894b00a95fcc4af3fc5a8e&page=${this.state.page - 1}&pageSize=5`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      page : this.state.page - 1,
      articles: parseData.articles
    })
  }

  handlerNextClick = async () => {
    // console.log("next");
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){  
    }else{
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=68476c07dc894b00a95fcc4af3fc5a8e&page=${this.state.page + 1}s`;
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({
        page : this.state.page + 1,
        articles: parseData.articles
      })
    }
  }

  render() {
    return (
      <div className="container">
        <h1>This is a news Component</h1>
        <div className="container my-4">
          <h2>newsMoney - top headlines</h2>
          <div className="row container">
            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title ? element.title.slice(0,45) : "Bhavy"}
                  description={element.description ? element.description.slice(0,85) : "Kunj"}
                  imageUrl={!element.urlToImage ? "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg" : element.urlToImage}
                  newsUrl={element.url}/>
              </div>
            })}
          </div>
          <div className="container d-flex justify-content-between">
            <div disabled={this.state.page<=1} className="btn btn-primary" type="button" onClick={this.handlerPreviousClick}>&larr; Previous</div>
            <div className="btn btn-primary" type="button" onClick={this.handlerNextClick}>Next &rarr;</div>
          </div>
        </div>
      </div>
    );
  }
}