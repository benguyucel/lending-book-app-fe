import './App.css';
import React from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import Authors from './components/Author/Authors';
import Books from './components/Book/Books';
import EditBook from './components/Book/EditBook';
import BookDetail from './components/Book/BookDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddBook from './components/Book/AddBook';
import Navbar from './components/Navbar';
import AddAuthor from './components/Author/AddAuthor';
import EditAuthor from './components/Author/EditAuthor';
import Publishers from './components/Publishers/Publishers';
import AddPublisher from './components/Publishers/AddPublisher';
import EditPublisher from './components/Publishers/EditPublisher';
import AddPerson from './components/Person/AddPerson';
import Persons from './components/Person/Persons';
import EditPerson from './components/Person/editPerson';
import LendBook from './components/Lend/LendBook';
import Lending from './components/Lend/Lending';
function App() {
    return (
        <div className='container'>
            <Navbar/>
            <div className='row'>
                <div className='col-md-3'>
                    <ul className="list-group">
                        <li className="list-group-item active" aria-current="true">An active item</li>
                        <li className="list-group-item">
                            <Link to="books">Books</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="authors">Authors</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="publishers">Publishers</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="lendings">Lendings</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="person">People</Link>
                        </li>
                    </ul>
                </div>
                <div className='col-md-9'>
                    <Routes>
                        <Route path="/">
                            {/* Author */}
                            <Route path="authors" element={< Authors />}/>
                            <Route path="addauthor" element={< AddAuthor />}/>
                            <Route path="author/edit/:id" element={< EditAuthor />}/> {/* Publisher */}
                            <Route path="publishers" element={< Publishers />}/>
                            <Route path="addpublisher" element={< AddPublisher />}/>
                            <Route path="publisher/edit/:id" element={< EditPublisher />}/> {/* Book */}
                            <Route path="addbook" element={< AddBook />}/>
                            <Route path="books" element={< Books />}/>
                            <Route path="book/edit/:id" element={< EditBook />}/>
                            <Route path="books/:id" element={< BookDetail />}/> {/* Person */}
                            <Route path="person" element={< Persons />}/>
                            <Route path="books/:id" element={< BookDetail />}/> {/* Person */}
                            <Route path="addperson" element={< AddPerson />}/>
                            <Route path="person/edit/:id" element={< EditPerson />}/>                        
                            <Route path="/lend" element={< LendBook />}/>                        
                            <Route path="/lendings" element={< Lending />}/>                        
                        </Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;