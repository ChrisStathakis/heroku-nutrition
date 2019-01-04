import React from 'react';
import {Segment, Header, Table, Grid, Button } from 'semantic-ui-react';
import { PRODUCTS_LIST_ENDPOINT } from '../../helpers/endpoints';
import { lookupOptionIncludeToken } from '../../helpers/functions_helpers';


class ListGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: {},
            doneProductsLoading: false
        }
    }

    toggleEdit = (product) => {
        this.props.toggleEdit(product)
    };

    getProducts(token){
        const thisComp = this;
        fetch(PRODUCTS_LIST_ENDPOINT, lookupOptionIncludeToken(token))
        .then(resp=>resp.json())
        .then(respData=>{
            thisComp.setState({
                products: respData,
                doneProductsLoading: true
            })
        })
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        this.getProducts(token)
    }


    render(){
        const { doneProductsLoading, products } = this.state;
        return (
            <Segment placeholder>
                <Header
                    as='h4'
                    color='blue'
                    icon='user'
                    content='Λίστα Προϊόντων'
                    attached='top'
                    textAlign='center'
                    inverted
                />
                <br />
                <Grid container>
                    <Grid.Row>
                        <Grid.Column>
                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>#</Table.HeaderCell>
                                        <Table.HeaderCell>Προϊόν</Table.HeaderCell>
                                        <Table.HeaderCell>Θερμίδες</Table.HeaderCell>
                                        <Table.HeaderCell>Πρωτεϊνη</Table.HeaderCell>
                                        <Table.HeaderCell>Υδατάνθρακες</Table.HeaderCell>
                                        <Table.HeaderCell>Λίπος</Table.HeaderCell>
                                        <Table.HeaderCell>#</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {doneProductsLoading ? products.map((product, index)=>(
                                        <ProductTableData
                                            key={index}
                                            product={product}
                                            index={index}
                                            toggleEdit={this.toggleEdit}
                                        />
                                        )):<p>No data</p>
                                    }
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }
}

class ProductTableData extends React.Component {

    toggleEdit = () => {this.props.toggleEdit(this.props.product)};

    render(){
        const {product, index }= this.props;
        return (
            <Table.Row>
                <Table.Cell>{index}</Table.Cell>
                <Table.Cell>{product.title}</Table.Cell>
                <Table.Cell>{product.calories}</Table.Cell>
                <Table.Cell>{product.protein}</Table.Cell>
                <Table.Cell>{product.carbs}</Table.Cell>
                <Table.Cell>{product.fat}</Table.Cell>
                <Table.Cell><Button onClick={this.toggleEdit} icon='edit' /></Table.Cell>
            </Table.Row>
        )
    }
}

export default ListGrid;