import React, { Component } from "react"

import Aux from "../../../hoc/Auxi/Auxi"
import Backdrop from "../Backdrop/Backdrop"
import classes from "./Modal.module.css"

class Modal extends Component{
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render(){
        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                    className={classes.Modal}
                    style={{
                        opacity: this.props.show ? 1 : 0,
                        transform: this.props.show ? "translateY(0)" : "translateY(-100vh)"
                    }}
                >
                    {this.props.children}
                </div>
            </Aux>  
        )
    }
}

export default Modal;