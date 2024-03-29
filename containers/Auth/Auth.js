import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import  { updateObject, checkValidity } from '../../shared/utility'; 
class Auth extends Component{
    state={
       controls: {
        email: {
            elementType:'input',
            elementConfig:{
                type:'email',
                placeholder: 'E-Mail Address'
            },
            value:'',
            validation:{
                required: true,
                isEmail: true
            },
            valid:false,
            touched: false
        },
        password: {
            elementType:'input',
            elementConfig:{
                type:'password',
                placeholder: 'Passward'
            },
            value:'',
            validation:{
                required: true,
                minLength:6
            },
            valid:false,
            touched: false
        }
       }, 
       isSignup:true
    }

   componentDidMount(){
     if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
  this.onSetAuthRedirectPath();
     }  
   } 
//validatyfn
//validaitionhander
inputChangeHandler = (event,controlName)=>{
    const updatedControls= updateObject(this.state.controls, {
        [controlName]:updateObject(this.state.controls[controlName], { 
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
            touched: true
        })
    });
    this.setState({controls: updatedControls});
}
submitHandle=(event)=>{
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
}
//hadleUserAuth
switchAuthModeHandler=()=>{
    this.setState(prevState=>{
        return{isSignup: !prevState.isSignup};
    })
}
    render(){
        const fromElementsArray=[];
            for(let key in this.state.controls){
                fromElementsArray.push({
                    id: key,
                    config: this.state.controls[key]
                });
            }
            let form = fromElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig= {formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangeHandler(event,formElement.id)}    
                />
            ));
            if(this.props.loading){
                form=<Spinner/>;
            }
            let errorMessage= null;
            if(this.props.error){
                errorMessage=(
                    <p>{this.props.error.message}</p>
                );
            }
            //redirect user After signinHomePage&Checkout
        let authRedirect =null;
       if(this.props.isAuthenticated){
           authRedirect=<Redirect to={this.props.authRedirectPath}/>
       }            
        return (
          <div className={classes.Auth}>
            {authRedirect}
           {errorMessage}
             <form onSubmit={this.submitHandle}>
                 {form}
             <Button btnType="Success" >SUBMIT</Button>  
            </form> 
            <Button
            clicked={this.switchAuthModeHandler}
             btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
          </div>
        );
    }
} 
const mapStateToPrpos = state=>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath 
    };
};
const mapDispatchToprops= dispatch=>{
     return{
      onAuth:(email, password, isSignup)=>dispatch(actions.auth(email, password, isSignup)),
      onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
     };
};
export default connect(mapStateToPrpos, mapDispatchToprops)(Auth);



