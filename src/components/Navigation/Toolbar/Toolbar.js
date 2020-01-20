import React from "react"

import classes from "./Toolbar.module.css"
import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import ToggleMenuButton from "../SideDrawer/ToggleMenuButton/ToggleMenuButton"

const Toolbar = props => {
    return(
        <header className={classes.Toolbar}>
            <ToggleMenuButton clicked={props.toggleMenuClicked} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </header>
    )
}

export default Toolbar;