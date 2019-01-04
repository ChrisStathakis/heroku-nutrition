import React from 'react';
import {Form, Button, Segment, Header } from 'semantic-ui-react';
import {lookupOptionPUT} from "../../helpers/functions_helpers";
import {PRODUCT_DETAIL_ENDPOINT} from '../../helpers/endpoints';

class EditProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token:localStorage.getItem('token'),
            product: {}
        }
    }

    changeInput =(event)=>{
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        const data = Object.assign({}, this.state.product,{[name]: value});
        this.setState({product:data})
    };

    onSubmitButton = (event) =>{
        event.preventDefault();
        const data = this.state.product;
        console.log('submit', data, this.state);
        const endpoint = PRODUCT_DETAIL_ENDPOINT + data.id + '/';
        fetch(endpoint, lookupOptionPUT(this.state.token, data))
            .then(resp=>resp.json())
            .then(respData=>{this.props.toggleEdit()})
    };

    onCloseButton = () => {
        this.props.closeEditWindow()
    };

    componentDidMount(){
        this.setState({
            product: this.props.product
        })
    }

    render() {
        const categories = this.props.categories;
        const {product} = this.state;
        const title = 'Επεξεργασία ' + product.title;
        return(
            <Segment>
                <Header
                    as='h4'
                    color='blue'
                    icon='user'
                    attached='top'
                    textAlign='center'
                    inverted
                >{title}</Header>
            <Form>
                <Form.Field>
                  <label>Ονομασία</label>
                  <input
                      value={product.title}
                      name='title'
                      onChange={this.changeInput}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Κατηγορία</label>
                  <Form.Select options={categories} placeholder='Κατηγορία'  />
                </Form.Field>
                <Form.Field>
                  <label>Θερμίδες</label>
                  <input
                      value={product.calories}
                      name='calories'
                      onChange={this.changeInput}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Πρωτεϊνη</label>
                  <input
                      value={product.protein}
                      name='protein'
                      onChange={this.changeInput}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Υδατάνθρακες</label>
                  <input
                      value={product.carbs}
                      name='carbs'
                      onChange={this.changeInput}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Λίπος</label>
                  <input
                      value={product.fat}
                      name='fat'
                      onChange={this.changeInput}
                  />
                </Form.Field>
                <Button onClick={this.onSubmitButton} type='submit'>Submit</Button>
                <Button
                    onClick={this.props.closeEditWindow}
                    color='red'
                    icon='delete'
                />
            </Form>
            </Segment>
        )
    }

}

export default EditProduct;