import React from 'react'
import {lookupOptionPOST} from "../../helpers/functions_helpers";
import {Segment, Header, Button, Form, List, Message} from 'semantic-ui-react';
import {PRODUCTS_LIST_ENDPOINT} from "../../helpers/endpoints";


class NewProduct extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            token: localStorage.getItem('token'),
            errors_messages: {},
            fields: {
                title:'',
                category:null,
                calories:0,
                fat:0,
                carbs:0,
                protein:0
            }
        }
    }

    changeFormInput = (event)=> {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        const new_data = Object.assign({}, this.state.fields, {[name]: value})
        this.setState({fields:new_data})
    };

    changeCategory = (event) => {
        event.preventDefault()
        const new_data = Object.assign({}, this.state.fields, {category: event.target.value})
        this.setState({fields:new_data})
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        const data = this.state.fields;
        const thisComp = this;
        const errors_messages = this.getErrors(data);
        console.log(errors_messages, 'erroes')
        if (errors_messages.length > 0){
            console.log('here')
            this.setState({
                errors_messages: errors_messages
            })
        } else {
            console.log('works!')
    
        fetch(PRODUCTS_LIST_ENDPOINT, lookupOptionPOST(this.state.token, data))
            .then(resp=>resp.json())
            .then(respData=>{
                thisComp.props.reloadPage()
            })
        }
        
    };
    

    getErrors(data){
        console.log('data', data)
        const title = data.title;
        var errors_messages = []
        if (title === ''){
            var errors_messages = [...errors_messages, 'Ξέχασες να βάλεις τίτλο']
        }
        if (data.category === null){
            var errors_messages = [...errors_messages, 'Ξέχασες να βάλεις κατηγορία']
        }
        return errors_messages
    }

    render() {
        const categories = this.props.categories;
        const {fields, errors_messages} = this.state;
        return(
            <Segment>
                {errors_messages.length>0?
                <List>
                    {errors_messages.map((error, index)=>(
                        <Message
                        error
                        header='Προβλημα!'
                        content={error}
                      />
                    ))}
                </List>
                :<br/>}
                <Header
                    as='h4'
                    color='blue'
                    icon='user'
                    content='Νέο Προϊόν'
                    attached='top'
                    textAlign='center'
                    inverted
                />
                <Form>
                   <Form.Field required>
                  <label>Ονομασία</label>
                  <input
                      value={fields.title}
                      name='title'
                      onChange={this.changeFormInput}
                  />
                </Form.Field>
                <Form.Field required>
                  <label>Κατηγορία</label>
                  <Form.Select options={categories} placeholder='Κατηγορία' onChange={this.changeCategory} />
                </Form.Field>
                <Form.Field>
                  <label>Θερμίδες</label>
                  <input
                      value={fields.calories}
                      name='calories'
                      onChange={this.changeFormInput}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Πρωτεϊνη</label>
                  <input
                      value={fields.protein}
                      name='protein'
                      onChange={this.changeFormInput}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Υδατάνθρακες</label>
                  <input
                      value={fields.carbs}
                      name='carbs'
                      onChange={this.changeFormInput}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Λίπος</label>
                  <input
                      value={fields.fat}
                      name='fat'
                      onChange={this.changeFormInput}
                  />
                </Form.Field>
                <Button onClick={this.onFormSubmit} type='submit'>Submit</Button>
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

export default NewProduct;