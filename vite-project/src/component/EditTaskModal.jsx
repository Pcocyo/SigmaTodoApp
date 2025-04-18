import React from 'react'
import { Modal, Form, ModalBody, Button, ModalFooter, ModalHeader } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import HoverButton from './HoverButton'
import { editTask, deleteTask } from '../reducer/userReducer'
import { useState } from 'react'
const EditTaskModal = ({ handleClose, show, dataAttr }) => {
    const userData = useSelector(state => state.user)
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    console.log(dataAttr)
    const dispatch = useDispatch()
    //delete and edit button 
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(editTask({ dataAttr, newTask: { taskName, taskDescription } }))
        setTaskName('')
        setTaskDescription('')
        handleClose()
    }
    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteTask({ dataAttr }))
        setTaskName('')
        setTaskDescription('')
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <div className=''
                style={
                    {
                        backgroundColor: '#000000',
                        padding: '24px',
                        color: '#FFFFFF',
                        borderRadius: '5px'
                    }
                }
            >
                <ModalBody>

                    <ModalHeader style={{
                        borderBottom: '0px'
                    }}>
                        <Modal.Title>Edit Task</Modal.Title>
                    </ModalHeader>
                    <Form>
                        <Form.Group className='m-2'>
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control
                                style={{
                                    backgroundColor: '#151515',
                                    color: '#ffffff',
                                    border: '1px solid #c39edb'
                                }}
                                onChange={(e) => setTaskName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='m-2'>
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control
                                style={{
                                    backgroundColor: '#151515',
                                    color: '#ffffff',
                                    border: '1px solid #c39edb'
                                }}
                                onChange={(e) => setTaskDescription(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter style={{ border: '0' }}>
                    <Button
                        variant='outline-danger'
                        onClick={handleClose}>
                        <i className="bi bi-x-circle-fill"></i>
                    </Button>

                    <Button variant="outline-danger"
                        onClick={handleDelete}
                        type='submit'
                    >
                        <i className="bi bi-trash3-fill"></i>
                    </Button>
                    <HoverButton
                        onClick={handleSubmit}
                        type='submit'
                        hoverStyles='#c39edb'
                        defaultStyles='#222222'
                        textHoverStyle='#222222'
                        additionalStyles={{ border: '2px solid #c39edb' }}>
                        <i className="bi bi-check-circle-fill"></i>
                    </HoverButton>

                </ModalFooter>
            </div>

        </Modal>
    )
}

export default EditTaskModal