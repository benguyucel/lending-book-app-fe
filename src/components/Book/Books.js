import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {deleteBook, getBooks} from '../../features/book/bookSlice';
import defaultImage from '../../img/say-no.png'
import './book.css';
export default function Books() {
    const dispatch = useDispatch();
    const books = useSelector(state => state.book)
    useEffect(() => {
        dispatch(getBooks())
    }, [dispatch])
    const [show,
        setShow] = useState(false);
    const [bookId,
        setBookId] = useState("");
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleDelete = () => {
        dispatch(deleteBook(bookId))
        handleClose()
    }
    return (
        <div className='row'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                        handleDelete();
                    }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            {books
                .data
                .map(book => {
                    return (

                        <div className='mb-2 col-md-4' key={book.bookId}>
                            <div className="card">
                                <img
                                    src={!book.image_url
                                    ? defaultImage
                                    : book.image_url}
                                    className="card-img-top"
                                    style={{
                                    height: 266,
                                    objectFit: 'cover'
                                }}
                                    alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">{book.book}</h5>
                                    <p className="card-text">
                                        Author : {book.author}
                                    </p>
                                    <p className="card-text">
                                        Publisher : {book.publisher}
                                    </p>

                                    <div className='lending'>
                                        <Link to="/book/lend" className="badge bg-secondary">Lend this book</Link>
                                        <span className="badge bg-primary">{book.status
                                                ? 'Avaiable'
                                                : "No Avaible"}</span>
                                    </div>

                                </div>
                                <div className='card-footer d-flex justify-content-between'>
                                    <button
                                        onClick={() => {
                                        handleShow();
                                        setBookId(book.bookId)
                                    }}
                                        className='btn btn-danger'>Delete This</button>
                                    <Link to={`/book/edit/${book.bookId}`} className='btn btn-primary'>Edit</Link>
                                </div>
                            </div>
                        </div>

                    )
                })}

        </div>

    )
}