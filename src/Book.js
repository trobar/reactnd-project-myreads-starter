import React, {Component} from 'react'

class Book extends Component {
	
	change = (event) => {
    	if (event.target.value!==this.props.book.shelf)  {
     		this.props.moveToShelf(this.props.book,this.props.book.shelf,event.target.value)
    	}
    }
    
    getShelf = (book) => {
    	if (this.props.book.shelf)
    		return this.props.book.shelf
    	else 
    		return 'none'
    }

    getAuthors = (book) => {
    	if (book.authors) 
    		return book.authors.reduce((previous, current)=> (previous.concat(current,', ')),'').slice(0,-2)
    	else 
    		return 'No author'
    }

	render() {
		return (
			<div className="book">
	             <div className="book-top">
	             	<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
		                <div className="book-shelf-changer">
		                  <select onChange={this.change} value={this.getShelf(this.props.book)}>
		                    <option value="disabled" disabled>Move to...</option>
		                    <option value="currentlyReading">Currently Reading</option>
		                    <option value="wantToRead">Want to Read</option>
		                    <option value="read">Read</option>
		                    <option value="none">None</option>
		                  </select>
		                </div>
	            </div>
	            <div className="book-title">{this.props.book.title}</div>
	            <div className="book-authors"> {this.getAuthors(this.props.book)}</div>
	        </div>
	    )
	}
}

export default Book