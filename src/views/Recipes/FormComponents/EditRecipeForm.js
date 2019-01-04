import React from 'react';
import {withRouter} from 'react-router';
import _ from 'lodash';
import { Segment, Grid, Header, Form, Button, Input, Search, List, Select, Message } from 'semantic-ui-react';
import {
    PRODUCTS_LIST_ENDPOINT,
    FOOD_CATEGORY_LIST_ENDPOINT,
    RECIPE_CATEGORY_LIST_ENDPOINT,
    RECIPE_LIST_ENDPOINT,
    RECIPE_ITEM_LIST_ENDPOINT
} from '../../../helpers/endpoints';
import {lookupOptionIncludeToken, lookupOptionPOST, lookupOptionPUT, lookupOptionDELETE} from '../../../helpers/functions_helpers';
import ProductGrid from './ProductGrid';
import SelectedItem from './SelectedItem';
import CategoryListItem from './CategoryListItem';


class EditRecipeForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            isLoading: false,
            results: [],
            value:'',
            fields:{
                title: '',
                active: true,
                public: true,
                category: ''
            },
            items:[],
            initial_items: [],
            categories: {},
            doneCateLoading: false,
            selectCategory: false,

            recipeCategories: {},
            doneReciCateLoading: false
        }
    }

    componentWillMount() {
        const token = localStorage.getItem('token');
        this.setState({
            fields: this.props.recipe,
        });
        this.resetComponent();
        this.getCategories(token);
        this.getRecipeCategories(token);
        this.getItems(this.props.recipe.id, token)
    }

     getItems(id, token){
        const thisComp = this;
        const endpoint = RECIPE_ITEM_LIST_ENDPOINT + '?product_related=&recipe_related='+ id;
        fetch(endpoint, lookupOptionIncludeToken(token))
            .then(resp=>resp.json())
            .then(respData=>{
                thisComp.setState({
                    items:respData,
                    initial_items: respData,
                    doneLoading:true
                })
            })
    }

    getProducts(token, selectCategory=false) {
        const thisComp = this;
        const {value} = this.state;
        let endpoint = PRODUCTS_LIST_ENDPOINT + '?search='+ value;
        if (selectCategory){
            endpoint = PRODUCTS_LIST_ENDPOINT + '?search='+ value + '&category=' + selectCategory;
        }
        fetch(endpoint, lookupOptionIncludeToken(token))
        .then(resp=>resp.json())
        .then(respData=>{
            setTimeout(() => {
                thisComp.setState({
                    isLoading: false,
                    results: respData,
                })
              },
              300)
            }
        )
    }

    getCategories(token){
        const thisComp = this;
        fetch(FOOD_CATEGORY_LIST_ENDPOINT, lookupOptionIncludeToken(token))
            .then(resp=>resp.json()).then(respData=>thisComp.setState({categories:respData, doneCateLoading:true}))
    }

    getRecipeCategories(token){
        const thisComp = this;
        fetch(RECIPE_CATEGORY_LIST_ENDPOINT, lookupOptionIncludeToken(token))
            .then(resp=>resp.json()).then(respData=>thisComp.setState({recipeCategories:respData, doneReciCateLoading:true}))
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    handleSearchChange = (e, { value }) => {
        this.setState({
            isLoading: true, value: value
        });
        this.getProducts(this.state.token);

    };

    handleItem = (product, action='') => {
        var items = []
        const initial_items = this.state.items;
        if (action === 'delete') {
            items = initial_items.filter(item=>item.id !== product.id)
        }
        if (action === 'add') {
            items =[...initial_items, product]
        }
        this.setState({
            items: items
        })
    }

    handleFieldInput = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        const fields = this.state.fields;
        const new_fields = Object.assign({}, fields, {[name]:value});
        this.setState({fields:new_fields, error_messages:[]})

    };

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

    handleSumbit = (event) =>{
        event.preventDefault();
        const {fields, items, initial_items} = this.state;
        var error_messages = this.handleErrors(fields);
        if (error_messages.length > 0) {
            this.setState({
                error_messages: error_messages
            })
        } else if (items.length <1) {
            var error_messages = ['Δε έχετε προσθέσει προϊόντα']
            this.setState({
                error_messages: error_messages
            })
        } else {
            for(var i=0; i<initial_items.length; i++){
                fetch(RECIPE_ITEM_LIST_ENDPOINT+ initial_items[i].id + '/', lookupOptionDELETE(this.state.token))
                    .then(resp=>resp.json())
            }
            fetch(fields.url, lookupOptionPUT(this.state.token, fields))
            .then(resp=> resp.json())
            .then(respData => {
                for(var i=0; i<items.length; i++){
                    const data = {
                        recipe_related:respData.id,
                        product_related: items[i].id,
                        qty: items[i].qty
                    };
                    fetch(RECIPE_ITEM_LIST_ENDPOINT, lookupOptionPOST(this.state.token, data))
                    .then(resp=>resp.json())
                    .then(respData=>this.props.history.push('/recipes/'))
                }
            })
        }
    };

    handleErrors(data) {
        var error_messages = []
        if (data.title === ""){
            var error_messages = [...error_messages, 'Συμπληρώστε τον τίτλο']
        }
        if (data.category === ''){
            var error_messages = [...error_messages, 'Συμπληρώστε την κατηγορία']
        }
        return error_messages
    }

    reloadPage = () => {this.setState({
        value:'',
        fields:{
            title: '',
            active: true,
            public: true,
            category: ''
        },
        items:[],
        results:[]
    })}

    selectCategoryButton = (id) => {
        this.setState({selectCategory:id})
        this.getProducts(this.state.token, id)
    }

    render() {
        const {isLoading, value, results, items, fields, error_messages } = this.state;
        const {categories, doneCateLoading, recipeCategories, doneReciCateLoading}= this.state;
        console.log('render', this.props.initial_items)
        return(
            <Segment>
                <Header
                    as='h4'
                    color='blue'
                    content='Δημιουργία Συνταγής' attached='top' textAlign='center' inverted
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
                                    defaultValue={recipeCategories[0].value}
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
                                        onChange={this.handlePublicCheckBox}
                                        checked={fields.public}
                                    />
                                </Form.Group>
                                <Button
                                    type='submit'
                                    onClick={this.handleSumbit}
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
                                    {items !== undefined ? items.map((item, index)=>(
                                        <SelectedItem item={item} key={index} handleItem={this.handleItem} />
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
                        <Grid.Column width={10}>
                        <Segment>
                            <Search
                                loading={isLoading}
                                onResultSelect={this.handleResultSelect}
                                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                                results={results}
                                value={value}
                                {...this.props}

                            />
                            <br />
                            {doneCateLoading ?
                                <List horizontal relaxed>
                                    {categories.map((category, index)=>(
                                        <CategoryListItem
                                        category={category}
                                        key={index}
                                        selectCategory={this.selectCategoryButton}
                                        />
                                    ))}
                                </List>
                            :<br />
                            }
                            <br/>
                            {results.length >0 ?
                            <div>
                                <ProductGrid products={results} handleItem={this.handleItem} />
                                <Button onClick={this.reloadPage} width={10} color='red' content='Καθαρισμός'  />
                            </div>
                            :<p>No data</p>
                            }
                        </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Segment>
        )

    }
}

export default withRouter(EditRecipeForm);