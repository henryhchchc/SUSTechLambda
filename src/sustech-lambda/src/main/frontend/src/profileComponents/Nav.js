import React from 'react'
import PropTypes from 'prop-types'
import Hamburger from './Hamburger'

const Nav = (props) => (
  <nav>
    <Hamburger />
    <h1>{props.title}</h1>
  </nav>
)

Nav.propTypes = {
  title: PropTypes.string.isRequired
}

export default Nav
