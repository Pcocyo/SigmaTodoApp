import React, { useState } from 'react'
import { predefinedCalendar } from './calender'
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Row, Col, Container, Button } from 'react-bootstrap'
import Navigation from './component/Navigation'
import YearView from './component/YearView'
import WeekView from './component/WeekView'
import LoginPage from './component/LoginPage'
const App = () => {
  const [userLogin, setUserLogin] = useState(false)
  const [user, setUser] = useState({ username: '', password: '', data: '' })
  return (
    <BrowserRouter>
      <Container
        fluid
        className="w-100"
        style={{ padding: '0', margin:'0', width: '100%', overflowX: 'hidden', maxHeight: "100vh", backgroundColor: '#F9F9F9' }}
      >
        <Row className="w-100" style={{ height: '100vh', padding:'0', margin:'0' }}>
          <Col
            style={{
              width: '10%',
              flex: '0 0 50px',
              maxWidth: '50px',
              backgroundColor: '#151515',
            }}
            className="min-vh-100 m-0 p-0 d-flex flex-column align-items-center"
            xs={1} md={3} lg={2}>
              <Navigation setUserLogin={setUserLogin} />
            </Col>
            <Col
              className="m-0 p-0 " style={{width:'90%',padding:'0', margin:'0' }}
              xs={11} md={9} lg={10}
            >
              <Routes>
                <>
                  <Route path="/" element={<LoginPage setUser={setUser} setUserLogin={setUserLogin} />} />
                  <Route path="/year" element={userLogin ? <YearView /> : <Navigate to='/' />} />
                  <Route path="/week" element={userLogin ? <WeekView /> : <Navigate to='/' />} />
                </>
              </Routes>
            </Col>
        </Row>
      </Container>
    </BrowserRouter>

  )
}
// this is for a test
export default App