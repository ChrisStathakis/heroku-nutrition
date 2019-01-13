import React, {Component} from 'react';
import {Grid, Form, Select, Segment, Icon} from 'semantic-ui-react';
import {SegmantHeader} from "../GeneralComponents/MyCostumComponents";
import {ErrorMessage} from "../GeneralComponents/ErrorMessagesForm";
import {USER_EDIT_ENDPOINT} from "../../helpers/endpoints";
import {lookupOptionPUT} from "../../helpers/functions_helpers";

const options = [
  { key: 'a', text: 'Ανδρας', value: 'a', checked:true },
  { key: 'b', text: 'Γυναίκα', value: 'b' },
];

class FormGrid extends Component {

    state = {
        token: localStorage.getItem('token'),
        error_messages: [],
    };

    componentWillMount(){
        const {user_data} = this.props;
        this.setState({
            token: localStorage.getItem('token'),
            user_fields:{
                username: user_data.username,
                weight: user_data.weight,
                height: user_data.height,
                birth: user_data.birth,
                gender:user_data.gender,
                id:user_data.id
            }
        })
    }

    handleInputChange = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        const new_data = Object.assign({}, this.state.user_fields, {[name]:value})
        this.setState({
            user_fields: new_data,
            error_messages: false
        })
    };

    handleGenderChange = (e) => {
        e.preventDefault();
        let value = this.state.user_fields.gender;
        if (value === 'a'){ value = 'b'} else {value = 'a'};
        const new_data = Object.assign({}, this.state.user_fields, {gender:value});
        this.setState({user_fields:new_data})
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        const data = this.state.user_fields;
        const thisComp = this;
        const error_messages = this.handleErrors(data);
        if (error_messages.length>0){
            this.setState({error_messages:error_messages})
        } else {
            const endpoint = USER_EDIT_ENDPOINT + data.id +'/';
            fetch(endpoint, lookupOptionPUT(this.state.token, data))
                .then(resp=>resp.json())
                .then(respData=>{
                    thisComp.props.reload()
                })
        }
    };

    handleErrors(data){
        let error_messages = [];
        if (data.username === ''){
            error_messages = [...error_messages, 'Το username είναι κενό']
        }
        if (data.height < 100 ){
            error_messages = [...error_messages, 'Το Υψος πρέπει να είναι τουλαχιστον 100 εκατοστα']
        }
        return error_messages
    };

    render() {
        const {user_fields, error_messages} = this.state;
        return (
            <Grid.Column  mobile={16} tablet={8} computer={8}>
                <Segment>
                    <SegmantHeader title={'Γενικές Πληροφορίες'} icon={'chart bar outline'}/>
                    <br /> <br />
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input
                                fluid
                                label='Username'
                                value={user_fields.username}
                                name='username'
                                onChange={this.handleInputChange}
                            />
                            <Form.Input
                                fluid
                                type='number'
                                label='Ύψος'
                                placeholder='Last name'
                                value={user_fields.height}
                                name='height'
                                onChange={this.handleInputChange}
                            />
                            <Form.Input
                                fluid
                                type='number'
                                step='0.5'
                                label='Βάρος'
                                value={user_fields.weight}
                                name='weight'
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                             <Form.Input
                                fluid
                                type='date'
                                label='Ημερομηνία Γέννησης'
                                value={user_fields.birth}
                                name='birth'
                                onChange={this.handleInputChange}
                            />
                            <Form.Field
                                control={Select}
                                label='Φύλο'
                                options={options}
                                defaultValue={user_fields.gender}
                                placeholder='Επέλεξε'
                                onChange={this.handleGenderChange}
                            />
                        </Form.Group>
                        <Form.Button onClick={this.handleFormSubmit} color='green'><Icon name='save' />Αποθήκευση</Form.Button>
                    </Form>
                    <br /><br/> <br /> <br />
                    {error_messages ?<ErrorMessage error_messages={error_messages} /> : <br />}
                </Segment>
            </Grid.Column>
        )
    }
}

export default FormGrid;