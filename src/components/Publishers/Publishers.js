import React, { useEffect, useState } from 'react';
import {Modal, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultImage from '../../img/say-no.png'
import publishingIcon from '../../img/publishing.png'
import { deletePublisher, getPublisher } from '../../features/publisher/publisherSlice';

function Publishers() {
    const publisher = useSelector(state=>state.publisher);
    const dispatch = useDispatch();
    const [show,
        setShow] = useState(false);
        const [pubId,setPubId] = useState(null)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
  
    useEffect(()=>{
        dispatch(getPublisher())
    },[dispatch])
    
    const handleDelete = () => {
        dispatch(deletePublisher(pubId))
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
            
            {publisher
                .data
                .map(publisher => {
                    return (
                        <div className='col-md-4 mb-3' key={publisher.id}>
                            <div className="card">
                                <img
                                    src={!publisher.image_url
                                    ? defaultImage
                                    : publisher.image_url}
                                    className="card-img-top"
                                    style={{
                                    height: 266,
                                    objectFit: 'cover'
                                }}
                                    alt={publisher.name}/>
                                <hr
                                    style={{
                                    margin: 3
                                }}/>
                                <div className="card-body">
                                    <img  src={publishingIcon} alt={publisher.name}/>
                                    
                                     <span  className=" card-title">{publisher.name}</span>
                                </div>
                                <div className='card-footer card-list-footer'>
                                    <Link className='btn btn-success' to={`/publisher/edit/${publisher.id}`}>Edit</Link>
                                    <button
                                        onClick={() => {
                                       handleShow();
                                       setPubId(publisher.id)
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

export default Publishers;
