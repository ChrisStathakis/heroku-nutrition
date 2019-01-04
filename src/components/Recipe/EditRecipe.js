import React from 'react';
import {Segment, Grid, Header, Input, Form, Button, Select, List, Message } from 'semantic-ui-react';
import { RECIPE_ITEM_LIST_ENDPOINT, RECIPE_CATEGORY_LIST_ENDPOINT } from '../../helpers/endpoints';
import { lookupOptionIncludeToken } from '../../helpers/functions_helpers';


class EditRecipePage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            items: {},
            fields: {},
            doneLoading:false,
            doneReciCateLoading:false

        }
    }

    componentWillMount(){
        const token = localStorage.getItem('token')
        const {recipe} = this.props;
        this.setState({
            fields:recipe
        });
        this.getItems(recipe.id, token);
        this.getRecipeCategories(token);
    }

    getItems(id, token){
        const thisComp = this;
        const endpoint = RECIPE_ITEM_LIST_ENDPOINT + '?product_related=&recipe_related='+ id;
        fetch(endpoint, lookupOptionIncludeToken(token))
            .then(resp=>resp.json())
            .then(respData=>{
                thisComp.setState({
                    items:respData,
                    doneLoading:true
                })
            })
    }

    getRecipeCategories(token){
        const thisComp = this;
        fetch(RECIPE_CATEGORY_LIST_ENDPOINT, lookupOptionIncludeToken(token))
            .then(resp=>resp.json()).then(respData=>thisComp.setState({recipeCategories:respData, doneReciCateLoading:true}))
    }

    handleFieldInput = (event) => {
        event.preventDefault();
        console.log('here!')
        const name = event.target.name;
        const value = event.target.value;
        const fields = this.state.fields;
        console.log(name, value)
        const new_fields = Object.assign({}, fields, {[name]:value});
        this.setState({fields:new_fields, error_messages:[]})

    }

    handleCategory = (e, {name, value}) => {
        e.preventDefault();
        const new_fields = Object.assign({}, this.state.fields, {[name]:value})
        this.setState({fields:new_fields, error_messages:[]})
    }

    handlePublicCheckBox = (e) => {
        e.preventDefault();
        const new_fields = Object.assign({}, this.state.fields, {public:!this.state.fields.public})
        this.setState({
            fields: new_fields
        })
    }

    handleActiveCheckBox = (e) => {
        e.preventDefault();
        const new_fields = Object.assign({}, this.state.fields, {active:!this.state.fields.active})
        this.setState({
            fields: new_fields
        })
    }

    render(){
        const {fields, doneLoading, doneReciCateLoading, recipeCategories, items} = this.state;
        const {error_messages} = []
        console.log('render', fields)
        return(
            <div>
                {doneLoading ? 
                    <Segment>
                    <Header
                        as='h4'
                        color='blue'
                        content={fields.title} attached='top' textAlign='center' inverted
                    />
                    <br />
                    <Grid container>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Form>
                                <Form.Field required>
                                    <label>Τίτλος</label>
                                    <Input 
                                        placeholder='Full name' 
                                        value={fields.title} 
                                        onChange={this.handleFieldInput}
                                        name='title'
                                    />
                                </Form.Field>
                                {doneReciCateLoading ?<Form.Field
                                    name='category'
                                    control={Select}
                                    options={recipeCategories}
                                    label={{ children: 'Κατηγορία', htmlFor: 'form-select-control-gender' }}
                                    placeholder='Κατηγορία'
                                    search
                                    searchInput={{ id: 'form-select-control-gender' }}
                                    onChange={this.handleCategory}
                                />:<br/>}
                                
                                <Form.Group widths='equal'>
                                    <Form.Checkbox 
                                        name='active'
                                        label='Ενεργό'
                                        onChange={this.handleActiveCheckBox}
                                        checked={fields.active}
                                    />
                                    <Form.Checkbox 
                                        label='Δημόσιο'
                                        name='public'
                                        onClick={this.handlePublicCheckBox}
                                        checked={fields.public}
                                    />
                                </Form.Group>
                                <Button 
                                    type='submit'
                                   
                                    >Submit</Button>
                            </Form>
                            {error_messages ? error_messages.map((error, index)=>(
                                <Message 
                                    error
                                    header='Πρόβλημα!'
                                    content={error}
                                />
                            ))
                            :<br />}
                            <Segment>
                                <Header as='h6' content='Επιλεγμένα' />
                                <List>
                                    {items.length>0 ? items.map((item, index)=>(
                                        <p>Hello</p>
                                    ))
                                :
                                <List.Item>
                                    <List.Icon name='github' size='large' verticalAlign='middle' />
                                    <List.Content><List.Header as='a'>Δε έχετε επιλέξει.</List.Header></List.Content>
                                </List.Item>
                                }
                                </List>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row> 
                    </Grid>
                    </Segment>
        
                : 
                <p>Loading</p>
                }
            </div>
        )
    }
}


export default EditRecipePage;