import React, { Component } from "react"
import {connect} from "react-redux"

import Spinner from "../../components/UI/Spinner/Spinner"
import Button from "../../components/UI/Button/Button"
import Input from "../../components/UI/Input/Input"
import classes from "./Auth.module.css"
import {auth, setAuthRedirectPath} from "../../store/actions"
import { Redirect } from "react-router"

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    placeholder: "Mail address",
                    type: "email"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    placeholder: "Password",
                    type: "password"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 7
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    componentDidMount(){
        if(!this.props.isBuilding && this.props.authRedirectPath !== "/"){
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = isValid && value.trim() !== "";
        }
        if (rules.minLength) {
            isValid = isValid && value.length >= rules.minLength;
        }
        if (rules.maxLength) {
            isValid = isValid && value.length <= rules.maxLength;
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }

        this.setState({
            controls: updatedControls
        })
    }

    onSubmitHandler = (event) =>{
        event.preventDefault();
        this.props.onSubmit(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    switchAuthModeHandler = (evt) =>{
        evt.preventDefault();
        this.setState(prevState =>({
            isSignup: !prevState.isSignup
        }))
    }

    render() {
        const formElementsArray = [];

        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(element => {
            return (
                <Input
                    key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    changed={(event) => this.inputChangedHandler(event, element.id)}
                    invalid={!element.config.valid}
                    shouldValidate={element.config.validation}
                    touched={element.config.touched}
                />
            )
        })

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
        }

        let authRedirect = null;
        if(this.props.isAuth){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>;
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                <form onSubmit={this.onSubmitHandler}>
                    {errorMessage}
                    {form}
                    <Button btnType="Success">Submit</Button>
                    <Button btnType="Danger" clicked={this.switchAuthModeHandler}>Switch to {this.state.isSignup ? "SIGNIN" : "SIGNUP"}</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    isBuilding: state.burgerBuilder.isBuilding
})

const mapDispatchToProps = dispatch =>{
    return {
        onSubmit: (email, password, mode) => dispatch(auth(email, password, mode)),
        onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath("/"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)