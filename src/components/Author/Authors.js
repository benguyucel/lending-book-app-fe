import React, {useEffect, useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {deleteAuthor, getAuthors} from '../../features/author/authorSlice';
import defaultImage from '../../img/say-no.png'
import writerIcon from '../../img/writer.png'
import './author.css'

function Authors() {
    const dispatch = useDispatch();
    const author = useSelector(state => state.author)
    const [autorId,
        setAutorId] = useState(null);
    useEffect(() => {
        dispatch(getAuthors());
    }, [dispatch])
    const [show,
        setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleDelete = () => {
        dispatch(deleteAuthor(autorId))
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
            {author
                .data
                .map(author => {
                    return (
                        <div className='col-md-4 mb-3' key={author.id}>
                            <div className="card">
                                <img
                                    src={!author.image_url
                                    ? defaultImage
                                    : author.image_url}
                                    className="card-img-top"
                                    style={{
                                    height: 266,
                                    objectFit: 'cover'
                                }}
                                    alt={author.name}/>
                                <hr
                                    style={{
                                    margin: 3
                                }}/>
                                <div className="card-body">
                                    <img src={writerIcon} alt={author.name}/>
                                    <span className="card-title">{author.name}</span>
                                </div>
                                <div className='card-footer card-list-footer'>
                                    <Link className='btn btn-success' to={`/author/edit/${author.id}`}>Edit</Link>
                                    <button
                                        onClick={() => {
                                        handleShow();
                                        setAutorId(author.id)
                                    }}
                                        type="button"
                                        className='btn btn-danger'>Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                })}

        </div>
    );
}

export default Authors;
