import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchList extends Component {
	state = {
		query : "",
		showingBooks : []
	}


	checkLibrary = (shelf,shelfName,book) => {
		const filter=shelf.filter((mybook) => (mybook.id===book.id))
		if (filter.length>0) 
			book.shelf=this.props.libraryName[shelfName]
	}

	updateQuery = (query) => {
		this.setState({query: query})
		BooksAPI.search(this.state.query, 20).then( (books) => {
			if ((books!==undefined)) {
				books.map((book) => {
					this.props.library.map((lib,libName) => {
						this.checkLibrary(lib,libName,book)
						return lib
					})
					return book
				})	
				this.setState({showingBooks:books})	
			}
		})

	}

	render() {
		return (
	 		<div className="search-books">
	            <div className="search-books-bar">
	              <Link  className="close-search" to="/">Close</Link>
	              	<div className="search-books-input-wrapper">
	                	<input type="text" 
							value={this.state.query}
							onChange={(event)=> this.updateQuery(event.target.value)}
	                		placeholder="Search by title or author"/>
                  	</div>
	            </div>
	            <div className="search-books-results">
	              	<ol className="books-grid">
						{this.state.showingBooks.map((book) => (<li key={book.id}><Book book={book} moveToShelf={this.props.moveToShelf} /></li>))}	   
	              	</ol>
	            </div>
	        </div>
        )
	}
}

export default SearchList