//classBased statefull component
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

export class BurgerBuilder extends Component{
//localAppState
state={
purchasing: false,
}
componentDidMount(){
    this.props.onInitIngredients();
}
updatePurchaseState(ingredients){
    const sum= Object.keys(ingredients).map(igKey =>{
        return ingredients[igKey];
    }).reduce((sum, el)=>{
        return sum + el;
    }, 0);
   return sum > 0 ;
    
}

purchaseHandler = () => {
    if(this.props.isAuthenticated){
    this.setState({purchasing: true});
  }else{
      //history coming from react router
       this.props.history.push('/auth');
       this.props.onSetAuthRedirectPath('/checkout');
  }
}

purchaseCancleHandler = () => {
this.setState({purchasing: false});
}
purchaseContinueHandler=()=>{
this.props.onInitPurchase();    
this.props.history.push('/checkout');
}

    render () {
        const disabledInfo={
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key] <= 0
        }
        let orderSummary =null;
      
        
        let burger=this.props.error ? <p>Ingredients Can't be Loaded!</p> : <Spinner/>;
        if(this.props.ings){
         burger=(
            <Auxiliary>
            <Burger ingredients={this.props.ings}/>
            <BuildControls 
                     ingredientAdded={this.props.onIngredientAdded}
                     ingredientRemoved={this.props.onIngredientRemoved}
                     disabled={disabledInfo}
                     purchasable={this.updatePurchaseState(this.props.ings)}
                     ordered={this.purchaseHandler}
                     isAuth={this.props.isAuthenticated}
                     price={this.props.price} />
                     </Auxiliary>
        );
        orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.props.price}
        purchaseCancelled={this.purchaseCancleHandler}
        purchaseContinued={this.purchaseContinueHandler}/>;
        }
        //remove 
        // if(this.state.loading){
        //     orderSummary= <Spinner />;
        //     }
            return(
               <Auxiliary>

                   <Modal show={this.state.purchasing} modalClosed={this.purchaseCancleHandler}>
                       {orderSummary}
                   </Modal>
                    {burger}
               </Auxiliary>
            );
    }
}
const mapStateTopProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated: state.auth.token !==null
    };
}
const mapDispatchProps= dispatch=>{
    return{
onIngredientAdded: (ingName)=> dispatch(actions.addIngredient(ingName)),
onIngredientRemoved: (ingName)=> dispatch(actions.removeIngredient(ingName)),
onInitIngredients: ()=> dispatch(actions.initIngredients()),
onInitPurchase: ()=> dispatch(actions.purchaseInit()),
onSetAuthRedirectPath: (path)=>dispatch(actions.setAuthRedirectPath(path))
    };
}
export default connect(mapStateTopProps, mapDispatchProps) (withErrorHandler(BurgerBuilder,axios));
