import React, { Component } from "react";
import Newsitem from "./Newsitem";
import SPINER from "./SPINER";
import images from "./assets";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

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
      page : 1,
      totalResults : 0
    };
    console.log("page------------------>", this.state.page);
    // console.log("PROPS----------->",JSON.stringify(this.props)); 
  }

  async updateNews() {
    this.props.setProgress(10);
    let url = !this.props.category
      ? `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=d2e4a19327c64e4992b56bff699af093&page=${this.state.page}&pageSize=${this.props.pageSize}`
      : `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d2e4a19327c64e4992b56bff699af093&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles : parseData.articles, 
      totalResults : parseData.totalResults,
      loding : false,
    });
    this.props.setProgress(100);
    console.log("totalResults-------------------------------->", this.state.totalResults);
  }
  
  async componentDidMount(){
    this.updateNews();
  }

  handlerPreviousClick = () => {
    this.setState(
      () => ({page : this.state.page - 1}),
      () => {this.updateNews()}
    );
  }
  
  handlerNextClick = () => {
    this.setState(
      () => ({page : this.state.page + 1}),
      () => {this.updateNews()}
    );
  }
  
  fetchMoreData = () => {
    this.setState(
      () => ({page : this.state.page + 1}),
      async () => {
        let url = !this.props.category
        ? `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=d2e4a19327c64e4992b56bff699af093&page=${this.state.page}&pageSize=${this.props.pageSize}`
        : `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d2e4a19327c64e4992b56bff699af093&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
          articles : this.state.articles.concat(parseData.articles), 
          totalResults : parseData.totalResults,
          loding : false,
        });
        console.log("totalResults-------------------------------->", this.state.totalResults);
        console.log("page------------------>", this.state.page);
      }
    );     
  };

  render() {
    return (
      <div>
        <h1 className="text-center" style={{margin : "25px"}}>This is a news Component</h1>
        <div className="container my-4">
          <h2>newsMoney - top headlines</h2>
          {this.state.loding && <SPINER/>}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<SPINER/>}
          >
            <div className="container">
              <div className="row">
                {this.state.articles.map((element) => {
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
            </div>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}