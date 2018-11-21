import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ActionButton extends Component { 
  render() { 
    return (
      <button class="ActionButton" onClick={this.props.onAction}>
        <span>{this.props.text}</span>
      </button>
    );
  }
}

class Book extends Component { 
  deleteSelf() {
    fetch("http://API/books/" + this.props.id + "/delete");
  }
  render() { 
    return (
      <div class="book">
    <h3>Title: {this.props.title}</h3>
    <span>BookID: {this.props.id}</span>
    <span>Author: {this.props.author}</span>
      <ActionButton text="DeleteMe" onAction={this.deleteSelf.bind(this)}/>
      </div>
    )
  }
}

class BookList extends Component { 
  constructor(props) { 
    super(props)
    this.state  = { books: [] }
    fetch("http://localhost:3000/" + props.filename + ".json")
          .then(response => response.json())
          .then(data => this.setState({ books: data }));
  }

  render() {
    var books = [];
    for (var i = 0; i < this.state.books.length; i++) {
      var book = this.state.books[i];
      books.push(<Book title={book.title} id={book.id} author={book.author} />);
    }
    return (
      <div class="booklist">{books}</div>
    )
  }
}

class Counter extends Component { 
  constructor(props) {
    super(props);
    this.state = { count: 5 }
  }

  updateSelf() {
     fetch("http://localhost:3000/data.json")
          .then(response => response.json())
          .then(data => this.setState(data));
  
  }
  addToCount(delta) {
    this.setState({count: this.state.count + delta })

  }

  render() { 
    return(
      <div>
      <h1>COUNTER: {this.state.count}</h1>
      <h2>AGE: {this.state.age}</h2>
      <ActionButton text={"+" + this.props.step} onAction={this.addToCount.bind(this, this.props.step)}/>
      <ActionButton text={"-" + this.props.step} onAction={this.addToCount.bind(this, -1 * this.props.step)}/>
      <ActionButton text="UPDATE!!" onAction={this.updateSelf.bind(this)}/>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
      <BookList filename="data"/>
      <BookList filename="two"/>
      </div>
    );
  }
}

export default App;
