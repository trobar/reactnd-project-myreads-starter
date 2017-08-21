import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import { Link, Route } from 'react-router-dom'
import SearchList from './SearchList'

class BooksApp extends React.Component {
    state = {
        books: []
    }

    componentDidMount(){

        BooksAPI.getAll().then((books) => {
          console.log(books)
            this.setState({books:books})
        })
    }

    moveToShelf = (theBook,oldShelf,newShelf) => {
        const book = this.state.books.filter((filterBook) => (filterBook.id===theBook.id))
        const localBook = book.length>0 ? book[0] : theBook 
        BooksAPI.update(localBook,newShelf).then(localBook.shelf=newShelf)
        this.setState({books:this.state.books.filter((filterBook) => (filterBook.id!==theBook.id)).concat(localBook)})  
    }

    render() {
        return (
            <div className="app">
                <Route path="/search" render={({history}) => (
                    <SearchList moveToShelf={this.moveToShelf} 
                        library={this.state.books}
                        libraryName={['read','wantToRead','currentlyReading']}
                    />
                )}/>
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <Bookshelf books={this.state.books.filter((book) => (book.shelf==='currentlyReading'))} shelfTitle="Currently Reading" moveToShelf={this.moveToShelf}/>
                                <Bookshelf books={this.state.books.filter((book) => (book.shelf==='wantToRead'))} shelfTitle="Want to read" moveToShelf={this.moveToShelf}/>
                                <Bookshelf books={this.state.books.filter((book) => (book.shelf==='read'))} shelfTitle="Read" moveToShelf={this.moveToShelf}/>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )}/>  
            </div>
        )
    }
}

export default BooksApp
