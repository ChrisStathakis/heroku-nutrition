import React, {Component} from 'react';
import {Menu, Sidebar, Icon, Segment} from 'semantic-ui-react';


export default class RecipeMenu extends Component {

    handleLink = (e, {name}) =>{
        if(name === 'new') {
            this.props.toggleNew()
        }
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
            style={{ marginTop: '20%'}}
        >
            <Menu.Item as='a'>
                <Icon
                    name='home'
                    onClick={this.handleLink} />
                Λιστα
            </Menu.Item>
            <Menu.Item as='a'>
                <Icon name='gamepad' />
                Δημιουργία
</Menu.Item>
<Menu.Item as='a'>
<Icon name='camera' />
Channels
</Menu.Item>
</Sidebar>

    )
  }
}

