import React, { useState, useRef } from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import { useSelector } from 'react-redux'

import HoverButton from './HoverButton'
import AddTaskModal from './AddTaskModal'
import Task from './Task'
const Week = ({ weekToDisplay, weekInMonth, currentMonth }) => {
    // modal control
    const [showAddTask, setShowAddTask] = useState(false);

    const handleCloseAddTask = () => setShowAddTask(false);
    const handleShowAddTask = () => setShowAddTask(true);

    // daysInMonth ref logic
    const daysInMonth = useRef(null)
    function handleChangeDaysInMonth(days) {
        daysInMonth.current = days
    }
  
    // redux logic
    const user = useSelector((state) => state.user)


    return (
        <>
            <Container fluid className='' style={{ maxHeight: '100vh', height: '100vh' }} xs={1}>
                <Row className='' style={{ height: 'auto' }}>
                    {weekToDisplay.map((days, Dindex) => {
                        return (
                            <Col key={Dindex} className='p-1 m-0'
                            >
                                <div className='fs-1' style={{ color: '#9a9a9a' }}>{(weekInMonth * 7) + Dindex + 1}</div>
                                <div className="d-flex flex-column justify-content-center align-items-center gap-2 p-2"
                                    style={{
                                        borderColor: '#222222',
                                        borderRight: '2px solid',
                                        borderBottom: '2px solid',
                                        borderRadius: '14px',
                                        backgroundColor: '#151515',
                                        height: 'inherit'
                                    }}>
                                    {days &&
                                        days.map((ele, index) => {
                                            return (
                                                <div className="d-flex flex-column align-items-center "
                                                    style={{
                                                        width: '90%',
                                                        minHeight: '100px',
                                                        border: '1px solid #c39edb',
                                                        height: 'auto',
                                                        backgroundColor: '#222222',
                                                        color: '#FFFFFF',
                                                        borderRadius: '14px'
                                                    }}
                                                    key={index}>
                                                <Task taskDescription={ele.taskDescription} taskName={ele.taskName} taskIndex= {index} dataAttr={{dataIndex:(weekInMonth * 7) + Dindex + 1,currentMonth:currentMonth.month}}/>
                                                </div>
                                            )
                                        })}
                                    <HoverButton
                                        additionalStyles={{ width: '90%', height: '100px' }}
                                        hoverStyles='#c39edb'
                                        defaultStyles='#222222'
                                        textHoverStyle='#222222'
                                        onClick={() => {
                                            handleChangeDaysInMonth((weekInMonth * 7) + Dindex)
                                            handleShowAddTask()
                                        }}>
                                        <i className="bi bi-plus-circle fs-1"></i>
                                    </HoverButton>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
            <AddTaskModal show={showAddTask} handleClose={handleCloseAddTask} daysInMonth={daysInMonth.current} currentMonth={currentMonth.month} />
            
        </>
    )
}

export default Week