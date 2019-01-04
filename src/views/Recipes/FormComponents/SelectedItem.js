import React from "react";
import { List } from 'semantic-ui-react'

class SelectedItem extends React.Component {

    handleItem = () => {
        this.props.handleItem(this.props.item, 'delete')
    };

    render() {
        const {item} = this.props;
        return (
            <List.Item>
                <List.Icon name='edit' size='large' verticalAlign='middle' />
                <List.Icon onClick={this.handleItem} name='delete' color='red' size='large' verticalAlign='middle' />
                <List.Content>
                    <List.Header as='a'>{item.title}</List.Header>
                    <List.Description as='a'>Ποσότητα {item.qty}</List.Description>
                </List.Content>
            </List.Item>
        )
    }
}

export default SelectedItem;