import React, { Component } from "react";
import Newsitem from "./Newsitem";
import SPINER from "./SPINER";
import images from "./assets";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country : "in",
    pageSize : 2,
  }
  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    categoty : PropTypes.string,
  }

  constructor(props) {
    super(props);
    // console.log("Hello I am a constructor from news component");
    this.state = {
      articles: [],
      loding : true,
      page : 1
    };
    console.log("page------------------>", this.state.page);
    // console.log("PROPS----------->",JSON.stringify(this.props));    
  }

  async updateNews() {
    if (!this.props.category) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=d2e4a19327c64e4992b56bff699af093&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loding : true});
      let data = await fetch(url);
      let parseData = await data.json ();
      this.setState({
        articles : parseData.articles, 
        totalResults : parseData.totalResults,
        loding : false
      });
      console.log("totalResults-------------------------------->", this.state.totalResults);
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d2e4a19327c64e4992b56bff699af093&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loding : true});
      let data = await fetch(url);
      let parseData = await data.json ();
      this.setState({
        articles : parseData.articles, 
        totalResults : parseData.totalResults,
        loding : false
      });
      console.log("totalResults-------------------------------->", this.state.totalResults);
    }
  }
  
  async componentDidMount(){ 
    this.setState({totalResults : this.state.totalResults});
    this.updateNews();
    console.log("Page-------------------------------->", this.state.page);
  }

  handlerPreviousClick = () => {
    this.setState(
      () => ({ page: this.state.page - 1 }),
      () => this.updateNews()
    );
  }
  
  handlerNextClick = () => {
    this.setState(
      () => ({ page: this.state.page + 1 }),
      () => this.updateNews()
    );
  }
  

  render() {
    return (
      <div className="container">
        <h1 className="text-center" style={{margin : "25px"}}>This is a news Component</h1>
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
                  newsUrl={element.url} 
                  author={element.author}
                  date={element.publishedAt} />
              </div>
            })}
          </div>
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} className="btn btn-primary" type="button" onClick={this.handlerPreviousClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-primary" type="button" onClick={this.handlerNextClick}>Next &rarr;</button>
          </div>
        </div>
      </div>
    );
  }
}