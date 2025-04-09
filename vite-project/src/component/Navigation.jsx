import React, { useState } from 'react'
import { Col, Button } from 'react-bootstrap'
const Navigation = () => {
  const [wide, setWide] = useState(false)
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
            <p className='h6 align-center p-0 mb-0' style={{height:'100%'}}>BookTodos</p>
            <div className="">
              <HoverButton
              hoverStyles='#c39edb'
              defaultStyles='#222222'
              textHoverStyle='#222222'>
                <i className="bi bi-plus-circle" style={{fontSize:'20px'}}></i>
              </HoverButton>
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

const HoverButton = ({ hoverStyles, defaultStyles, additionalStyles, children, onClick, textHoverStyle, defaulTextStyles }) => {
  const [hovered, setHovered] = useState(false); // Internal hover state for the button

  const handleMouseEnter = () => {
    setHovered(true); // Activate hover state
  };

  const handleMouseLeave = () => {
    setHovered(false); // Deactivate hover state
  };
  const styles = {
    backgroundColor: hovered ? hoverStyles : defaultStyles,
    color: hovered ? textHoverStyle : defaulTextStyles,
    border: '0px',
    ...additionalStyles
  }
  return (
    <Button
      style={{ ...styles }} // Apply styles dynamically
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children} {/* Button content */}
    </Button>
  );
};


// const ButtonComponent = ({style,onClick,handleMouseEnterbutton,handleMouseExitbutton,hover,btnId})=>{
//   const [hover,setHover] = useState(false)

//   return(
//     <Button
//       style={{...style}}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//     >
//       <i className="bi bi-book-half" style={{ fontSize: '20px' }}></i>
//     </Button>

//   )
// }

export default Navigation