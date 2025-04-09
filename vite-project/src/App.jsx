import React from 'react'

import { predefinedCalendar } from './calender'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Row, Col, Container, Button } from 'react-bootstrap'
import Navigation from './component/Navigation'
const App = () => {
  return (
    <BrowserRouter>
      <Container fluid className='border border-danger'>
        <Row className="w-100" style={{maxHeight:'100vh'}}>
          <Navigation/>
          <Col className=''>
            <Routes>

            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>

  )
}
// this is for a test
export default App