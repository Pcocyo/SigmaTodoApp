import React, { useState } from 'react'
import { Modal, Button, Form, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addTask } from '../reducer/userReducer'
import HoverButton from './HoverButton'

const AddTaskModal = ({ show, handleClose,daysInMonth,currentMonth }) => {
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')

    //redux logic 
    const user = useSelector((state)=> state.user)
    const dispatch = useDispatch()
    function handleSubmit(e) {
        e.preventDefault()
        console.log('button submit')
        const dataToInsert = {taskName:taskName,taskDescription:taskDescription}
        console.log(dataToInsert)
        console.log(daysInMonth)
        console.log(currentMonth)
        dispatch(addTask({data:dataToInsert,month:currentMonth,index:daysInMonth}))
        console.log(user)
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
                <Modal.Header
                    style={{
                        borderBottom: '0px'
                    }}>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body
                >
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Task name</Form.Label>
                            <Form.Control
                                style={{
                                    backgroundColor: '#151515',
                                    color: '#ffffff',
                                    border: '1px solid #c39edb'
                                }} 
                                value={taskName}
                                onChange={(e)=>setTaskName(e.target.value)}
                                />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                style={{
                                    backgroundColor: '#151515',
                                    color: '#ffffff',
                                    border: '1px solid #c39edb'
                                }}
                                value={taskDescription}
                                onChange={(e)=>setTaskDescription(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer
                    style={{
                        borderTop: 'none'
                    }}>
                    <Button variant="danger" onClick={handleClose}>
                        Cancel
                    </Button>
                    <HoverButton
                        hoverStyles='#c39edb'
                        defaultStyles='#222222'
                        textHoverStyle='#222222'
                        type='submit'
                        additionalStyles={{border:'2px solid #c39edb'}}
                        onClick={(e)=>handleSubmit(e)}
                    >
                        Submit
                    </HoverButton>
                </Modal.Footer>
            </div>
        </Modal>
    )
}
export default AddTaskModal