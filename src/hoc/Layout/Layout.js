import React, { useState } from "react"
import { connect } from "react-redux"

import classes from "./Layout.module.css"
import Aux from "../Auxi/Auxi"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"

const Layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    
    const sideDrawerClosedHandler = () =>{
        setShowSideDrawer(false)
    }

    const toggleMenuHandler = () =>{
        setShowSideDrawer((prev) => !prev);
    }

    return (
        <Aux>
            <Toolbar toggleMenuClicked={toggleMenuHandler} showMenu={showSideDrawer} isAuth={props.isAuth}/>
            <SideDrawer show={showSideDrawer} closed={sideDrawerClosedHandler} isAuth={props.isAuth}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

const mapStateToProps = state => ({
    isAuth: state.auth.token !== null
})

export default connect(mapStateToProps)(Layout)