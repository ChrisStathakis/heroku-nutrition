import React from 'react'
import {withRouter} from 'react-router';
import {
  Container,
  Dropdown,
  Image,
  Menu,
} from 'semantic-ui-react'


class Navbar extends React.Component{

  handleLink = (e, {name}) => {
    const link = name;
    this.props.history.push('/'+link)
  };


  render() {
    return(
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item 
                    onClick={this.props.handleShowClick}><Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
                
                </Menu.Item>
                <Menu.Item
                    as='a'
                    header
                    name=''
                    onClick={this.handleLink}
                >
                    
                    Home
                </Menu.Item>
                <Menu.Item
                    as='a'
                    name='recipes/'
                    onClick={this.handleLink}
                >Συνταγές</Menu.Item>
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

                <Dropdown item simple text='Dropdown'>
                    <Dropdown.Menu>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>Header Item</Dropdown.Header>
                        <Dropdown.Item>
                            <i className='dropdown icon' />
                            <span className='text'>Submenu</span>
                            <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>
    )
  }
}



export default  withRouter(Navbar);