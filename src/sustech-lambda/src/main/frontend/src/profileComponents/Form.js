import React from 'react'
import PropTypes from 'prop-types'

export default class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: this.props.values.firstName || 'Your name',
      jobTitle: this.props.values.jobTitle || 'Your title',
      birthday: this.props.values.birthday || 'mm/dd/yyyy',
      bio: this.props.values.bio || 'A few words about yourself'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='firstName'>
          First Name
        </label>
        <input type='text' value={this.state.firstName} onChange={this.handleChange} name='firstName' />
        <label htmlFor='jobTitle'>
          Job Title
        </label>
        <input type='text' value={this.state.jobTitle} onChange={this.handleChange} name='jobTitle' />
        <label htmlFor='birthday'>
          Birthday
        </label>
        <input type='text' value={this.state.birthday} onChange={this.handleChange} name='birthday' />
        <label htmlFor='bio'>
          Bio
        </label>
        <textarea value={this.state.bio} onChange={this.handleChange} name='bio' />
        <button className='cta-primary' type='submit'>
          Save
        </button>
      </form>
    )
  }
}

Form.propTypes = {
  values: PropTypes.shape({
    firstName: PropTypes.string,
    jobTitle: PropTypes.string,
    birthday: PropTypes.string,
    bio: PropTypes.string
  }).isRequired
}
