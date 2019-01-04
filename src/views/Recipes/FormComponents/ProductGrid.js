import React from 'react';
import {Card, Button, Image, Modal } from 'semantic-ui-react';


class ProductGrid extends React.Component {

    handleItem = (product, action) => this.props.handleItem(product, action);

    render() {
        const {products} = this.props;

        return (
            <Card.Group>
                {products.map((product, index)=>(
                    <ProductCard key={index} product={product} handleItem={this.handleItem} />
                )
                )}
            </Card.Group>
        )

    }
}


class ProductCard extends React.Component {

    state = {open: false}
    show = size => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })

    handleItem = () => {
        console.log('works!')
        let new_product = Object.assign({}, this.props.product, {'qty':1})
        this.props.handleItem(new_product, 'add')
    }
    render() {
        const { open, size } = this.state;
        const {product} = this.props;
        return (
            <Card>
                <Card.Content>
                    <Image floated='right' size='mini' src='/images/avatar/large/steve.jpg' />
                    <Card.Header>{product.title}</Card.Header>
                    <Card.Meta>Θερμίδες {product.calories} cal</Card.Meta>
                    <Card.Description>
                    Πρωτεϊνη <strong>{product.protein} gr</strong> Υδατάνθρακες <strong>{product.carbs} gr</strong> Λίπος <strong>{product.fat} gr</strong>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                    <Button onClick={this.handleItem} basic color='green'>
                        Προσθήκη
                    </Button>
                    <Button color='blue' onClick={this.show('mini')}>Ποσότητα</Button>
                    </div>
                </Card.Content>
                <br />
                <Modal size={size} open={open} onClose={this.close}>
                    <Modal.Header>Delete Your Account</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete your account</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative>No</Button>
                        <Button positive icon='checkmark' labelPosition='right' content='Yes' />
                    </Modal.Actions>
                </Modal>

            </Card>
        )

    }
}

export default ProductGrid;
