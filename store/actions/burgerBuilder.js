import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
//actionCreators
export const addIngredient = (name) => {
    //jsObjectContentInside {}
    return{
        type: actionTypes.ADD_INGREDIENT,
     ingredientName: name
    };
};
 //actionCreaters
export const removeIngredient = (name) => {
    //jsObjectContentInside {}
    return{
        type: actionTypes.REMOVE_INGREDIENT,
     ingredientName: name
    };
};
export const setIngredients = (ingredients) =>{
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};
//fetchIngredient Asynchroniously
export const fetchIngredientFailed= ()=>{
    return{
   type: actionTypes.FETCH_INGREDIENTS_FAILED 
    };
};
export const initIngredients = () =>{
    return dispatch=>{
    axios.get('https://react-my-burger-d8020.firebaseio.com/ingredients.json')
    .then(response =>{
         dispatch(setIngredients(response.data));
    })
    .catch(error=>{
        dispatch(fetchIngredientFailed());
    });
    };
};