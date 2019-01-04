import React from "react";
import { List } from 'semantic-ui-react';


class CategoryListItem extends React.Component{

    selectCategoryButton = () => {this.props.selectCategory(this.props.category.key)}

    render() {
        const {category} = this.props;
        return (
            <List.Item>
                <List.Content>
                    <List.Header onClick={this.selectCategoryButton} as='a'>{category.title}</List.Header>
                </List.Content>
            </List.Item>
        )
    }
}

export default CategoryListItem
