import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import { Link, Route } from 'react-router-dom'
import SearchList from './SearchList'

class BooksApp extends React.Component {
    state = {
        booksCurrentlyReading: [],
        booksWantToRead: [],
        booksRead: [],
    }

    componentDidMount(){

        BooksAPI.getAll().then((books) => {
            this.setState({booksCurrentlyReading:books.filter((books) => books.shelf === 'currentlyReading')})
        })
        BooksAPI.getAll().then((books) => {
            this.setState({booksWantToRead:books.filter((books) => books.shelf === 'wantToRead')})
        })
        BooksAPI.getAll().then((books) => {
            this.setState({booksRead:books.filter((books) => books.shelf === 'read')})
        })
    }

    moveToShelf = (theBook,oldShelf,newShelf) => {

         //Remove book from old shelf. None means remove from list
        if (oldShelf==='currentlyReading') {
            this.setState({booksCurrentlyReading:this.state.booksCurrentlyReading.filter((book) => book.id !==theBook.id)})
        }
        if (oldShelf==='wantToRead') {
            this.setState({booksWantToRead:this.state.booksWantToRead.filter((book) => book.id !==theBook.id)})
        }
        if (oldShelf==='read') {
            this.setState({booksRead:this.state.booksRead.filter((book) => book.id !==theBook.id)})
        }

        //Add book to new shelf
        if (newShelf==='currentlyReading') {
            BooksAPI.update(theBook,newShelf).then((book) => {
                theBook.shelf=newShelf
                this.setState({booksCurrentlyReading:this.state.booksCurrentlyReading.concat(theBook)})})
        }
        if (newShelf==='wantToRead') {
            BooksAPI.update(theBook,newShelf).then((book) => {
                theBook.shelf=newShelf
                this.setState({booksWantToRead:this.state.booksWantToRead.concat(theBook)})})
        }
        if (newShelf==='read') {
            BooksAPI.update(theBook,newShelf).then((book) => {
                theBook.shelf=newShelf
                this.setState({booksRead:this.state.booksRead.concat(theBook)})})
        }
        if (newShelf==='none') {
            BooksAPI.update(theBook,newShelf).then((book) => {
                theBook.shelf=newShelf})
        }
    }

    render() {
        return (
            <div className="app">
                <Route path="/search" render={({history}) => (
                    <SearchList moveToShelf={this.moveToShelf} 
                        library={[this.state.booksRead,this.state.booksWantToRead,this.state.booksCurrentlyReading]}
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
                                <Bookshelf books={this.state.booksCurrentlyReading} shelfTitle="Currently Reading" moveToShelf={this.moveToShelf}/>
                                <Bookshelf books={this.state.booksWantToRead} shelfTitle="Want to read" moveToShelf={this.moveToShelf}/>
                                <Bookshelf books={this.state.booksRead} shelfTitle="Read" moveToShelf={this.moveToShelf}/>
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
