import React, { Component } from 'react'
import { Sidebar, Menu, Button, Icon, Header, Segment, Image } from 'semantic-ui-react'

export default class MyMenu extends Component {
  
  render() {
    return (
      <Sidebar
      as={Menu}
      animation='overlay'
      icon='labeled'
      inverted
      onHide={this.props.handleSidebarHide}
      vertical
      visible={this.props.visible}
      width='thin'
  >
<Menu.Item as='a'>
<Icon name='home' />
Home
</Menu.Item>
<Menu.Item as='a'>
<Icon name='gamepad' />
Games
</Menu.Item>
<Menu.Item as='a'>
<Icon name='camera' />
Channels
</Menu.Item>
</Sidebar>

    )
  }
}



