export const HOST = 'django-react-nutrition.herokuapp.com';
export const USER_DATA_ENDPOINT = HOST + '/api/current-user/';
export const USER_EDIT_ENDPOINT = HOST + '/api/edit-user/';
export const PROFILE_DETAIL_ENDPOINT = HOST + '/api/edit-profile/';
export const AUTH_ENDPOINT = HOST + '/api/auth/';
export const REGISTER_USER_ENDPOINT = HOST + '/api/register/';

export const CALENDAR_DAY_LIST_ENDPOINT = HOST + '/api/calendar-days/';
export const CALENDAR_CATEGORY_LIST_ENDPOINT = HOST + '/api/calendar-categories/';
export const CALENDAR_CATEGORY_DETAIL_ENDPOINT = HOST  + '/api/calendar-category-item/';
export const CALENDAR_ITEMS_LIST_ENDPOINT = HOST + '/api/calendar-items/';
export const CALENDAR_ITEM_DETAIL_ENDPOINT = HOST + '/api/calendar-item/';
export const CALENDAR_CREATE_ITEM_ENDPOINT = HOST + '/api/create-day/';

export const RECIPE_LIST_ENDPOINT = HOST + '/api/recipes/';
export const RECIPE_ITEM_LIST_ENDPOINT = HOST + '/api/recipeitems/';
export const RECIPE_CATEGORY_LIST_ENDPOINT = HOST + '/api/recipe-categories/';
export const TAG_LIST_ENDPOINT = HOST + '/api/tag-list/';



export const FOOD_CATEGORY_LIST_ENDPOINT = HOST + '/api/food-categories/';
export const PRODUCTS_LIST_ENDPOINT = HOST + '/api/products/';
export const PRODUCT_DETAIL_ENDPOINT = HOST + '/api/product/';
export const token = localStorage.getItem('token');