import React, { Component } from "react"
import { connect } from "react-redux"

import classes from "./Layout.module.css"
import Aux from "../Auxi/Auxi"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    
    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer: false})
    }

    toggleMenuHandler = () =>{
        this.setState(({showSideDrawer}) => ({
            showSideDrawer: !showSideDrawer
        }))
    }

    render(){
        return (
            <Aux>
                <Toolbar toggleMenuClicked={this.toggleMenuHandler} showMenu={this.state.showSideDrawer} isAuth={this.props.isAuth}/>
                <SideDrawer show={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} isAuth={this.props.isAuth}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => ({
    isAuth: state.auth.token !== null
})

export default connect(mapStateToProps)(Layout)