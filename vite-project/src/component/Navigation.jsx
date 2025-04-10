import React, { useState, useRef } from 'react'
import { Col, Button, Overlay } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import HoverButton from './HoverButton'
const Navigation = ({setUserLogin}) => {
  const [wide, setWide] = useState(false)
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const buttonRef = useRef(null);
  return (
    <>
      <Col
        style={{
          width: '50px',
          flex: '0 0 50px',
          maxWidth: '50px',
          backgroundColor: '#151515',
        }}
        className="w-100 min-vh-100 m-0 p-0 d-flex flex-column align-items-center">
        <div className="mt-2">
          <HoverButton
            hoverStyles='#c39edb'
            defaultStyles='transparent'
            textHoverStyle='#151515'
            defaulTextStyles='#c39edb'
            onClick={() => setWide(!wide)}>
            <i className="bi bi-book-half" style={{ fontSize: '20px' }}></i>
          </HoverButton>
        </div>
      </Col>
      {wide &&
        <Col sm={3}
          className='m-0 p-0'
          style={{ backgroundColor: '#000000', color: '#e3e3e3' }}
        >
          <div className="m-3  d-flex justify-content-between align-items-center">
            <p className='h6 align-center p-0 mb-0' style={{ height: '100%' }}>BookTodos</p>
            <div className="">
              <HoverButton
                hoverStyles='#c39edb'
                defaultStyles='#222222'
                textHoverStyle='#222222'
                additionalStyles={{border:'1px solid #c39edb',marginRight:'7px'}}>
                <i className="bi bi-plus-circle" style={{ fontSize: '20px' }}></i>
              </HoverButton>
              <HoverButton
                hoverStyles='#c39edb'
                defaultStyles='#222222'
                textHoverStyle='#222222'
                onClick={() => setShow(!show)}
                ref={buttonRef}
                additionalStyles={{border:'1px solid #c39edb'}}
              >
                <i className="bi  bi-three-dots" style={{ fontSize: '20px' }}></i>
              </HoverButton>
              {show && (
                <div
                  style={{
                    position: "absolute",
                    top: buttonRef.current?.offsetTop || 0,
                    left: buttonRef.current?.offsetLeft + 4 + buttonRef.current?.offsetWidth || 0,
                    padding: "10px",
                    borderRadius: "5px",
                    zIndex: 1000,
                    boxShadow: "0 4px 6px #252525",
                    backgroundColor: '#252525'
                  }}
                >
                  {console.log(buttonRef)}
                  
                  <HoverButton
                    hoverStyles='#c39edb'
                    defaultStyles='#222222'
                    textHoverStyle='#222222'
                    onClick={() => setShow(!show)}
                    additionalStyles={{border:'1px solid #c39edb', marginRight:'4px'}}
                  >
                    <i className="bi bi-x-circle" style={{ fontSize: '20px' }}></i>
                  </HoverButton>
                  <HoverButton
                    hoverStyles='#c39edb'
                    defaultStyles='#222222'
                    textHoverStyle='#222222'
                    onClick={() =>{
                        setUserLogin(false)
                        navigate('/')
                      }
                    }
                    additionalStyles={{border:'1px solid #c39edb'}}
                  >
                    <i className="bi bi-person-x-fill" style={{ fontSize: '20px'}}></i>
                  </HoverButton>
                </div>
              )}

            </div>
          </div>
          <div className="">
            today task
          </div>
        </Col>
      }
    </>
  )
}


export default Navigation