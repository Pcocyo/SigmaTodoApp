import React from 'react'

import { predefinedCalendar } from './calender'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Row, Col, Container, Button } from 'react-bootstrap'
import Navigation from './component/Navigation'
import YearView from './component/YearView'
const App = () => {
  return (
    <BrowserRouter>
      <Container fluid className=''>
        <Row className="w-100" style={{maxHeight:'100vh'}}>
          <Navigation/>
          <Col className='p-0 m-0' style={{backgroundColor:'#f9f9f9'}}>
            <Routes>
              <Route path='/' element={<YearView/>}/>
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>

  )
}
// this is for a test
export default App