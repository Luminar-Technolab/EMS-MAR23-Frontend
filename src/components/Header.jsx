import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <Navbar >
        <Container>
          <Navbar.Brand className='fw-bolder text-light' >
          <Link to={'/'} style={{textDecoration:'none'}} >
              <i class="fa-solid fa-layer-group fa-flip me-2"></i>
              EMS Application
          </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
  )
}

export default Header