import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
const initialState={
    orders: [],
    loading: false,
    purchased:false
};
//creat funHadlerForpint-makeCodeLeant
const purchaseInit =(state,action)=>{
    return updateObject(state, {purchased:false});
};
//forPStart
const purchaseBurgerStart =(state, action)=>{
    return updateObject(state,{loading:true});
};
//forP_SUCCCESS
const purchaseBurgerSuccess= (state, action)=>{
    const newOrder =updateObject(action.orderDate, { id: action.orderId});
    return updateObject(state, {
     loading: false,
     purchased: true,
     orders:state.orders.concat(newOrder)
    });
};
//for p.fail
const purchaseBurgerFail =(state, action)=>{
    return updateObject(state, {loading:false});
};
//fetchorder
const fetchOrdersStart=(state,action)=>{
    return updateObject(state, {loading:true});
};
//fetchOrderSuccess
const fetchOrdersSuccess=(state, action)=>{
    return updateObject(state, {orders: action.orders,
        loading: false});
};
//fetchFail
const fetchOrdersFail=(state, action)=>{
    return updateObject (state, {loading: false}); 
};
const reducer = (state=initialState, action)=>{
     switch(action.type){
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);   
        case actionTypes.PURCHASE_BURGER_START:return purchaseBurgerStart(state, action);   
        case actionTypes.PURCHASE_BUYER_SUCCESS:return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BUYER_FAIL:return purchaseBurgerFail(state,action);
        case actionTypes.FETCH_ORDERS_START:return fetchOrdersStart(state,action);
        case actionTypes.FETCH_ORDERS_SUCCESS:return fetchOrdersSuccess(state,action);
        case actionTypes.FETCH_ORDERS_FAIL:return fetchOrdersFail(state,action);
          default:
          return state;              
               
     }
};
export default reducer;

