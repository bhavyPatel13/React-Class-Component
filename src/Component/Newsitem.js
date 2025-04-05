import React, { Component } from 'react'

export default class Newsitem extends Component {
    render() {
        let {title, description, imageUrl, newsUrl, date, author} = this.props;
        return (
            <div className='my-3'>
                <div className="card" >
                    <img 
                        src={imageUrl}
                        className="card-img-top"
                        style={{
                            height : "253px"
                        }}
                        alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text" style={{opacity:0.8}}>{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} On {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )   
    }
}
    