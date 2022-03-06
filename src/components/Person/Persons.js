import React, {useEffect, useState} from 'react'
import {Button, Modal} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {deletePerson, getPerson} from '../../features/person/personSlice';
import publishingIcon from '../../img/publishing.png'

function Persons() {
    const [show,
        setShow] = useState(false);
    const person = useSelector(state => state.person);
    const dispatch = useDispatch();
    const [personId,
        setPersonId] = useState("");
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
  
    useEffect(() => {
        dispatch(getPerson())
    }, [])
    const handleDelete = () => {
        dispatch(deletePerson(personId))
        handleClose()
    }

    return (
        <div>

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
            <div className='row'>
            
                {person
                    .data
                    .map(person => {
                        return (
                            <div className='col-md-4 mb-3' key={person.id}>
                                <div className="card">
                                    <img
                                        src={`https://randomuser.me/api/portraits/men/${person.id}.jpg`}
                                        className="card-img-top"
                                        style={{
                                        height: 266,
                                        objectFit: 'cover'
                                    }}
                                        alt={person.name}/>
                                    <hr
                                        style={{
                                        margin: 3
                                    }}/>
                                    <div className="card-body">
                                        <img src={publishingIcon} alt={person.name}/>

                                        <span className=" card-title">{person.name}</span>
                                    </div>
                                    <div className='card-footer card-list-footer'>
                                        <Link className='btn btn-success' to={`edit/${person.id}`}>Edit</Link>
                                        <button
                                            onClick={() => {
                                            handleShow();
                                            setPersonId(person.id)
                                        }}
                                            type="button"
                                            className='btn btn-danger'>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

            </div>

        </div>
    )
}

export default Persons