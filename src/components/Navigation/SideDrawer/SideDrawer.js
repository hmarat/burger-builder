import React from "react"

import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import classes from "./SideDrawer.module.css"
import Backdrop from "../../UI/Backdrop/Backdrop"
import Aux from "../../../hoc/Auxi/Auxi"

const SideDrawer = props => {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if(props.show){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return(
        <Aux>
            <Backdrop show={props.show} clicked={props.closed}/>
            <div className={attachedClasses.join(" ")} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </div>
        </Aux>
        
    )
}

export default SideDrawer;