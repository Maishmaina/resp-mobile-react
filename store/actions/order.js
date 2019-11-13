import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
//export synchronious actionCreator
export const purchaseBurgerSuccess = (id,orderData)=>{
    return{
      type: actionTypes.PURCHASE_BUYER_SUCCESS,
      orderId: id,
      orderData:orderData
    };
};

export const purchaseBurgerFail=(error)=>{
   return{
       type:actionTypes.PURCHASE_BUYER_FAIL,
       error: error
   };
};

export const purchaseBurgerStart=()=>{
  return{
    type: actionTypes.PURCHASE_BURGER_START
  };
};
//asynchroiousactionCreator dispatchToTheStore removed ,token below
export const purchaseBurger=(orderData)=>{
   return dispatch => {
         dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData)
    .then(response=>{ 
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));  
    })
    .catch(error=>{
        dispatch(purchaseBurgerFail(error));
    });
   };

};
export const purchaseInit =()=>{
  return{
    type: actionTypes.PURCHASE_INIT
  };
};
export const fetchOrdersSuccess = (orders)=>{
  return{
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders:orders
  };
};
export const fetchOrdersFail = (error)=>{
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};
export const fetchOrdersStart = () =>{
  return{
    type: actionTypes.FETCH_ORDERS_START,

  };
};
export const fetchOrders =(token, userId) =>{
   return dispatch=>{
     dispatch(fetchOrdersStart());
     const queryParams='?orderBy="userId"&equalTo="' + userId + '"';
    axios.get('/orders.json' + queryParams)
    .then(res=>{
        const fetchedOrders=[];
        for(let key in res.data){
      fetchedOrders.push({
          ...res.data[key],
          id: key
      });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders)); 
    })
    .catch(err=>{
        dispatch(fetchOrdersFail(err));
    });
   }; 
};