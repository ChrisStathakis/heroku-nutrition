import React, { Component } from 'react';
import {withRouter} from  'react-router';
import { Sidebar, Menu, Icon } from 'semantic-ui-react'

class SideMenu extends Component {

    handleLink = (e, {name}) => {
        const link = name;
        this.props.history.push('/'+link)
    };
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
                  style={{ marginTop: '7em' }}
              >
                  <Menu.Item
                      as='a'
                      header
                      onClick={this.handleLink}
                      name=''
                      > <Icon name='home' /> Home
                  </Menu.Item>
                  <Menu.Item
                      as='a'
                      name='recipes/'
                      onClick={this.handleLink}
                  ><Icon name='home' /> Συνταγές
                  </Menu.Item>
                  <Menu.Item
                      as='a'
                      name='products/'
                      onClick={this.handleLink}
                  >Προϊόντα
                  </Menu.Item>
                  <Menu.Item
                      as='a'
                      name='plan/'
                      onClick={this.handleLink}
                  >Σχεδίαση
                  </Menu.Item>
                  <Menu.Item as='a'>
                      <Icon name='gamepad' />
                      Games
                  </Menu.Item>
                  <Menu.Item
                      as='a'
                      onClick={this.handleLink}
                      name='user/'
                  ><Icon name='user' />Χρήστης
                  </Menu.Item>
              </Sidebar>
      )
    }
}

export default withRouter(SideMenu)