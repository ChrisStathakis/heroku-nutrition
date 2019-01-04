import React from 'react';
import {withRouter} from 'react-router';
import {Segment, Form, Header, Message, Button} from 'semantic-ui-react';
import {lookupOptionPUT} from "../../../helpers/functions_helpers";


class EditProfileForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            fields : {},
            error_messages: [],
            categories: [],

        }
    }

    componentWillMount(){
        const product = this.props.product;
        const categoryDefaultValue = this.props.categories.filter(cate=>cate['key']===product['category'])
        this.setState({
            fields: product,
            categories: this.props.categories,
            categoryDefaultValue:categoryDefaultValue[0]
        })

    }

    onCloseButton = () => {
        this.props.closeEditWindow()
    };

    changeInput =(event)=>{
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        const data = Object.assign({}, this.state.fields,{[name]: value});
        this.setState({fields:data})
    };

    handleErrors(data){
        var error_messages = [];
        if (data.title === "") {
            error_messages = [...error_messages,'Συμπληρώστε τον τίτλο']
        }
        if (data.category === '') {
            error_messages = [...error_messages,  'Συμπληρώστε την κατηγορία']
        }
        return error_messages
    }

    onSubmitButton = () =>{
        const thisComp = this;
        const {fields} = this.state;
        let error_messages = this.handleErrors(fields);
        if (error_messages.length > 0){
            this.setState({
                error_messages: error_messages
            })
        } else {
            fetch(fields.url, lookupOptionPUT(this.state.token, fields))
                .then(resp=>{})
                .then(respData =>{ thisComp.onCloseButton()});

        }
    };


    render() {
        const categories = this.props.categories;
        const {fields, error_messages} = this.state;
        const title = 'Επεξεργασία ' + fields.title;
        console.log('default value', this.state.categoryDefaultValue, 'product', fields, fields['category']);
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
                            value={fields.title}
                            name='title'
                            onChange={this.changeInput}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Κατηγορία</label>
                        <Form.Select
                            options={categories}
                            placeholder='Κατηγορία'
                            defaultValue={this.state.categoryDefaultValue}
                        />
                    </Form.Field>
                <Form.Field>
                  <label>Θερμίδες</label>
                  <input
                      value={fields.calories}
                      name='calories'
                      onChange={this.changeInput}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Πρωτεϊνη</label>
                  <input
                      value={fields.protein}
                      name='protein'
                      onChange={this.changeInput}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Υδατάνθρακες</label>
                  <input
                      value={fields.carbs}
                      name='carbs'
                      onChange={this.changeInput}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Λίπος</label>
                  <input
                      value={fields.fat}
                      name='fat'
                      onChange={this.changeInput}
                  />
                </Form.Field>
                    {error_messages ? error_messages.map((error, index)=>(
                                <Message
                                    error
                                    header='Πρόβλημα!'
                                    content={error}
                                />
                            )):<br />}
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

export default withRouter(EditProfileForm);