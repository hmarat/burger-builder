import React, { Component } from "react"
import Aux from "../Auxi/Auxi"
import Modal from "../../components/UI/Modal/Modal"

const withErrorHandler = (WrappedComponent, axios) =>{
    return class extends Component{
        constructor(props){
            super(props);

            this.state = {
                error: null
            }

            this.reqInterceptor = axios.interceptors.request.use(req =>{
                this.setState({error: null});
                return req;
            }, err => {
                this.setState({error: err});
            })

            this.resInterceptor = axios.interceptors.response.use(res => res, err =>{
                this.setState({error: err})
            })
        }

        componentWillUnmount(){
            console.log(`Will unmount ${this.reqInterceptor} ${this.resInterceptor}`)
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        
        errorConfirmedHandler = () =>{
            this.setState({error: null})
        }

        render(){
            return(
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error && this.state.error.message}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}

export default withErrorHandler;