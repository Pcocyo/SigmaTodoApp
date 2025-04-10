import React,{useState}from 'react'
import { predefinedCalendar } from './calender'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Row, Col, Container, Button } from 'react-bootstrap'
import Navigation from './component/Navigation'
import YearView from './component/YearView'
import WeekView from './component/WeekView'
const App = () => {

  return ( 
    <BrowserRouter>
      <Container
        fluid
        className="w-100  m-0 p-0"
        style={{ padding: '0',minWidth:'100vw',overflowX:'hidden',maxHeight:"100vh"}}
      >
        <Row className="w-100" style={{ maxHeight: '100vh' }}>
          <Navigation />
          <Col
            className=""
            style={{ backgroundColor: '#f9f9f9' }}
          >
            <Routes>
              <Route path="/year" element={<YearView />} />
              <Route path="/week" element={<WeekView />} />
            </Routes>
          </Col>
        </Row>
      </Container>

    </BrowserRouter>

  )
}
// this is for a test
export default App