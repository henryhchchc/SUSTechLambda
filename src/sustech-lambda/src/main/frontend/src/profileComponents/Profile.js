import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Form from './Form'

const Profile = (props) => (
  <div>
    <Header photo={props.photo} />
    <Form values={props.profileFields} />
    <footer />
  </div>
)

Profile.propTypes = {
  photo: PropTypes.string.isRequired,
  profileFields: PropTypes.object.isRequired
}

export default Profile
