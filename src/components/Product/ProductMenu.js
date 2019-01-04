import React from 'react';
import { Menu } from 'semantic-ui-react'


class ProductMenu extends React.Component {

    handleItemClick = name => this.setState({ activeItem: name })
    handleNewPage = name => this.props.toggleNewPageButton();

    render() {
        const { activeItem } = this.state || {};
        const { categories }= this.props;
        return (
            <Menu fixed='left' className='ui vertical inverted sidebar menu left uncover visible' vertical>
                <Menu.Item style={{ marginTop: '20%' }}>
                <Menu.Header>Προϊόντα</Menu.Header>
                <Menu.Menu>
                    <Menu.Item
                    name='Λίστα'
                    active={activeItem === 'enterprise'}
                    onClick={this.handleItemClick}
                    />
                    <Menu.Item
                    name='Δημιουργία'
                    active={activeItem === 'consumer'}
                    onClick={this.handleNewPage}
                    />
                    <Menu.Item
                    name='Αυτη τον Μήνα'
                    active={activeItem === 'consumer'}
                    onClick={this.handleItemClick}
                    />
                </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                    <Menu.Header>Κατηγορίες</Menu.Header>
                    <Menu.Menu>
                    {categories.map((category, index) => (
                        <Menu.Item
                            key={index}
                            name= {category.title}
                            active={activeItem === 'rails'}
                            onClick={this.handleItemClick}
                        />
                    ))}
                </Menu.Menu>
            </Menu.Item>
        </Menu>
        )
    }
}


export default ProductMenu;