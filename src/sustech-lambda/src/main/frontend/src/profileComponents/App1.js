import React from 'react'
import Nav from './Nav'
import Profile from './Profile'

import ScrollableTabsButtonForce from "./ScrollableTabsButtonForce";


export default class App1 extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     photo: require('./scss/jane-doe.jpg'),
  //     profileFields: {
  //       firstName: 'RainyTong',
  //       jobTitle: 'Web Developer',
  //       birthday: null,
  //       bio: null
  //     }
  //   }
  // }



  render () {
    return (
      <div>
        <Nav title='My Profile' />
        <ScrollableTabsButtonForce/>

        {/*<Profile profileFields={this.state.profileFields} photo={this.state.photo} />*/}


      </div>
    )
  }
}

if (module.hot) module.hot.accept()
