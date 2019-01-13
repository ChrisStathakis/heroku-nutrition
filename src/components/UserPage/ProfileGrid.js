import React, {Component} from 'react';
import {Grid, Segment, Form, Button, Divider, Header, Icon, Modal} from 'semantic-ui-react';
import {SegmantHeader} from "../GeneralComponents/MyCostumComponents";
import {PROFILE_DETAIL_ENDPOINT} from "../../helpers/endpoints";
import {lookupOptionPUT} from "../../helpers/functions_helpers";
import {ErrorMessage} from "../GeneralComponents/ErrorMessagesForm";

class ProfileGrid extends Component {

    state ={
        total_hours:24,
        current_hours:24,
        error_messages:[]
    };

    componentWillMount(){
        const {profile_data} = this.props;
        this.setState({
            fields: {
                sleep:profile_data.sleep,
                light_exercise: profile_data.light_exercise,
                medium_exercise: profile_data.medium_exercise,
                normal_exercise: profile_data.normal_exercise,
                heavy_exercise: profile_data.heavy_exercise
            },
            fields_2: {
                protein_percent: profile_data.protein_percent,
                carbs_percent: profile_data.carbs_percent,
                fat_percent: profile_data.fat_percent,
                calories_target: profile_data.calories_target
            },
            disable_fields:{
                protein_target: profile_data.tag_protein_target,
                fat_target: profile_data.tag_fat_target,
                carbs_target: profile_data.tag_carbs_target
            },
            token:localStorage.getItem('token')
        })
    }

    handleInputChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        var dataForSum = 0;
        const new_data = Object.assign({}, this.state.fields, {[name]: value});
        for (var key in new_data){if(new_data[key] !== '') {dataForSum += parseFloat(new_data[key])}}
        this.setState({fields:new_data,current_hours:dataForSum})
    };

    handleInputChange2 = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        const new_data = Object.assign({}, this.state.fields_2, {[name]: value});
        this.setState({fields_2:new_data})
    };


    handleErrors(data){
        let error_messages = [];
        if (this.state.current_hours !== 24){
            error_messages = [...error_messages, 'Το σύνολο των ωρών πρέπει να είναι 24']
        }
        return error_messages
    }

    handleSubmitForm = (event) =>{
        event.preventDefault();
        const {fields} = this.state;
        const error_messages = this.handleErrors(fields);
        if (error_messages.length > 0) {
            this.setState({error_messages:error_messages})
        } else {
            const thisComp = this;
            const endpoint = PROFILE_DETAIL_ENDPOINT + this.props.user_data.profile_id + '/';
            const merge_fields = Object.assign({}, fields, this.state.fields_2);
            fetch(endpoint, lookupOptionPUT(this.state.token, merge_fields))
                .then(resp=>resp.json()).then(respData=>{
                    console.log(respData);
                    thisComp.props.reload()
            })
        }
    };

   

    render() {
        const {fields, fields_2, error_messages, current_hours, disable_fields} = this.state;
        return (
            <Grid.Column  mobile={16} tablet={16} computer={16}>
                <Segment>
                    <SegmantHeader title={'Πληροφοριες Προφίλ'} icon={'coffee'}/>
                    <br></br>
                    <Form>
                        <Form.Group widths='equal'>
                        <Form.Input
                                action={{
                                    color: 'orange',
                                    labelPosition: 'left',
                                    icon: 'like',
                                    content: 'Θέσε τον στόχο σου'
                                    
                                }}
                                actionPosition='left'
                                type='number'
                                step={1}
                                name='calories_target'
                                value={fields_2.calories_target}
                                onChange={this.handleInputChange2}  
                            />
                        </Form.Group>

                        <Form.Group widths='equal'>
                        <Form.Input
                                action={{
                                    color: 'orange',
                                    labelPosition: 'left',
                                    icon: 'stop',
                                    content: 'Προτεινομ. Πρωτεϊνές'
                                    
                                }}
                                actionPosition='left'
                                type='number'
                                name='calories_tart'
                                value={disable_fields.protein_target}
                            />
                            <Form.Input
                                action={{
                                    color: 'orange',
                                    labelPosition: 'left',
                                    icon: 'stop',
                                    content: 'Προτεινομ. Υδατάνθρακες'
                                    
                                }}
                                actionPosition='left'
                                type='number'
                                step={1}
                                value={disable_fields.carbs_target}

                            />
                            <Form.Input
                                action={{
                                    color: 'orange',
                                    labelPosition: 'left',
                                    icon: 'stop',
                                    content: 'Προτεινομ. Λίπος'
                                    
                                }}
                                actionPosition='left'
                                type='number'
                                step={1}
                                name='Προτεινομ. Λίπος'
                                value={disable_fields.fat_target}
                            />
                        </Form.Group>
                        <Divider horizontal><Header as='h4'><Icon name='tag' />Είδος Διατροφής</Header></Divider>
                        <br />
                        <Form.Group widths='equal'>
                            <Form.Input
                                action={{
                                    color: 'teal',
                                    labelPosition: 'left',
                                    icon: 'edit',
                                    content: 'Υπνος'
                                }}
                                actionPosition='left'
                                type='number'
                                step={1}
                                name='sleep'
                                value={fields.sleep}
                                onChange={this.handleInputChange}
                            />
                            <Form.Input
                                action={{
                                    color: 'teal',
                                    labelPosition: 'left',
                                    icon: 'edit',
                                    content: 'Καθόλου Άσκηση'
                                }}
                                actionPosition='left'
                                type='number'
                                step={1}
                                name='light_exercise'
                                value={fields.light_exercise}
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Input
                                action={{
                                    color: 'teal',
                                    labelPosition: 'left',
                                    icon: 'edit',
                                    content: 'Ελαφριά Άσκηση'
                                }}
                                actionPosition='left'
                                type='number'
                                step={1}
                                name='medium_exercise'
                                value={fields.medium_exercise}
                                onChange={this.handleInputChange}
                            />
                            <Form.Input
                                action={{
                                    color: 'teal',
                                    labelPosition: 'left',
                                    icon: 'edit',
                                    content: 'Κανονική Άσκηση'
                                }}
                                actionPosition='left'
                                type='number'
                                step={1}
                                name='normal_exercise'
                                value={fields.normal_exercise}
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Input
                                action={{
                                    color: 'teal',
                                    labelPosition: 'left',
                                    icon: 'edit',
                                    content: 'Βαριά Άσκηση'
                                }}
                                actionPosition='left'
                                type='number'
                                step={1}
                                name='heavy_exercise'
                                value={fields.heavy_exercise}
                                onChange={this.handleInputChange}
                            />
                            <Form.Input
                                action={{
                                    color: 'red',
                                    labelPosition: 'left',
                                    icon: 'arrow alternate circle right outline',
                                    content: 'Συνολικές Ώρες'
                                }}
                                actionPosition='left'
                                type='number'
                                step={1}
                                name=''
                                value={current_hours}
                            />
                        </Form.Group>
                        <br />
                        <Divider horizontal><Header as='h4'><Icon name='tag' />Είδος Διατροφής</Header></Divider>
                        <Form.Group widths='equal'>
                            <Form.Input
                                action={{
                                    color: 'blue',
                                    labelPosition: 'left',
                                    icon: 'edit',
                                    content: 'Ποσοστό Πρωτεϊνης'
                                }}
                                actionPosition='left'
                                type='number'
                                name='protein_percent'
                                value={fields_2.protein_percent}
                                onChange={this.handleInputChange2}
                            />
                            <Form.Input
                                action={{
                                    color: 'blue',
                                    labelPosition: 'left',
                                    icon: 'edit',
                                    content: 'Ποσοστό Υδατάνθράκων'
                                }}
                                actionPosition='left'
                                type='number'
                                name='carbs_percent'
                                value={fields_2.carbs_percent}
                                onChange={this.handleInputChange2}
                            />
                            <Form.Input
                                action={{
                                    color: 'blue',
                                    labelPosition: 'left',
                                    icon: 'edit',
                                    content: 'Ποσοστό Λίπους'
                                }}
                                actionPosition='left'
                                type='number'
                                name='fat_percent'
                                value={fields_2.fat_percent}
                                onChange={this.handleInputChange2}
                            />
                        </Form.Group>
                        <Button color='green' icon='save' onClick={this.handleSubmitForm} content='Αποθήκευση' />
                    </Form>
                    <br />
                    {error_messages ? <ErrorMessage error_messages={error_messages} />:<br />}
                </Segment>
            </Grid.Column>
        )
    }

}

export default ProfileGrid;