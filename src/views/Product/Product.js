import React from 'react';
import Navbar from '../../components/Navbar';
import { Container, Sidebar, Segment } from 'semantic-ui-react';
import ProductMenu from '../../components/Product/ProductMenu';
import ListGrid from "../../components/Product/ListGrid";
import EditProductForm from "./FormComponents/EditProfileForm";
import {FOOD_CATEGORY_LIST_ENDPOINT} from "../../helpers/endpoints";
import {lookupOptionIncludeToken} from "../../helpers/functions_helpers";
import NewProduct from "../../components/Product/NewProduct";
import SideMenu from '../../components/GeneralComponents/SideMenu';


class ProductPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            toggleEditPage: false,
            toggleNewPage: false,
            editProductData: {},
            categories: {},
            doneLoadingCategories: false,
            visible: false
        }
    }

    fetchFoodCategories(token){
        const thisComp = this;
        fetch(FOOD_CATEGORY_LIST_ENDPOINT, lookupOptionIncludeToken(token))
        .then(resp=>resp.json())
        .then(respData=>{
            thisComp.setState({
                categories: respData,
                doneLoadingCategories: true
            })
        })
    }

    toggleEdit = (product) => {
        this.setState({
            toggleEditPage: !this.state.toggleEditPage,
            toggleNewPage: false,
            editProductData:product
        })
    };

    toggleNewPageButton = () => {
        this.setState({
            toggleEditPage: false,
            toggleNewPage: !this.state.toggleNewPage
        })
    };

    closeEditWindow =() => {
        this.setState({
            toggleEditPage: false,
            editProductData: {}
        })
    };

    reloadPage = () => {
        this.setState()
    };

    componentDidMount(){
        const token = localStorage.getItem('token');
        this.fetchFoodCategories(token);
    }

    handleHideClick = () => this.setState({ visible: false });
    handleShowClick = () => this.setState({ visible: true });
    handleSidebarHide = () => this.setState({ visible: false });

    render (){
        const {toggleEditPage, categories, doneLoadingCategories, toggleNewPage, visible } = this.state;
        return (
            <div>
               <Navbar handleShowClick={this.handleShowClick} />
                <Sidebar.Pushable as={Segment}>
                    <SideMenu
                        handleSidebarHide={this.handleSidebarHide}
                        visible={visible}
                    />
                    <Sidebar.Pusher dimmed={visible} style={{height: '100vh'}}>
                        {doneLoadingCategories ?
                            <ProductMenu
                                categories={categories}
                                toggleNewPageButton={this.toggleNewPageButton}
                            />
                            : <p>Oups i did it again</p>
                        }
                        <Container style={{ marginTop: '7em' }}>
                            {toggleEditPage ?
                                <EditProductForm
                                    product={this.state.editProductData}
                                    toggleEdit={this.toggleEdit}
                                    closeEditWindow={this.closeEditWindow}
                                    categories={this.state.categories}
                                />
                                :<ListGrid toggleEdit={this.toggleEdit} />
                            }
                            {toggleNewPage ?
                            <NewProduct
                                toggleNewPageButton={this.toggleNewPageButton}
                                categories={categories}
                                reloadPage={this.reloadPage}
                            />
                            :''}
                        </Container>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

export default ProductPage;