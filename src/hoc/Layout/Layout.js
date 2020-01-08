import React, { Component } from "react"

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
                <Toolbar toggleMenuClicked={this.toggleMenuHandler} showMenu={this.state.showSideDrawer}/>
                <SideDrawer show={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;