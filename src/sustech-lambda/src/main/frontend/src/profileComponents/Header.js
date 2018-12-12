import React from 'react'
import PropTypes from 'prop-types'
import ProfilePhoto from './ProfilePhoto'

const Header = (props) => (
  <header>
    <div className='accent' />
    <ProfilePhoto image={props.photo} />
  </header>
)

Header.propTypes = {
  photo: PropTypes.string.isRequired
}

export default Header
