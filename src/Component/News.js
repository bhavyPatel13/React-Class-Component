import React, { Component } from "react";
import Newsitem from "./Newsitem";
import SPINER from "./SPINER";
import images from "./assets";

export default class News extends Component {
  constructor() {
    super();
    // console.log("Hello I am a constructor from news component");
    this.state = {
      articles: [],
      loding : true,
      page : 1
    };
  }
  
  async componentDidMount(){ 
    // console.log("bhavy");
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=68476c07dc894b00a95fcc4af3fc5a8e&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json ();
    // console.log("parseData----------->",JSON.stringify(parseData))
    this.setState({
      articles : parseData.articles, 
      totalResults : parseData.totalResults,
      loding : false
    });
    // console.log("pageSize ----------->",this.props.pageSize);
  }

  handlerPreviousClick = async () => {
    console.log("previous");
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=68476c07dc894b00a95fcc4af3fc5a8e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loding : true})
    let data = await fetch(url);
    let parseData = await data.json();
    console.log("previous parseData----------->",JSON.stringify(parseData));
    this.setState({
      page : this.state.page - 1,
      articles: parseData.articles,
      loding : false
    })
  }

  handlerNextClick = async () => {
    console.log("next");
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){  
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=68476c07dc894b00a95fcc4af3fc5a8e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loding : true})
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({
        page : this.state.page + 1,
        articles: parseData.articles,
        loding : false
      })
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">This is a news Component</h1>
        <div className="container my-4">
          <h2>newsMoney - top headlines</h2>
          {this.state.loding && <SPINER/>}
          <div className="row container">
            {!this.state.loding && this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title ? element.title.slice(0,45) : "Bhavy"}
                  description={element.description ? element.description.slice(0,85) : "Kunj"}
                  imageUrl={!element.urlToImage ? images.dummy : element.urlToImage}
                  newsUrl={element.url}/>
              </div>
            })}
          </div>
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} className="btn btn-primary" type="button" onClick={this.handlerPreviousClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-primary" type="button" onClick={this.handlerNextClick}>Next &rarr;</button>
          </div>
        </div>
      </div>
    );
  }
}