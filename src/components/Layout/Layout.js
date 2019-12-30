import React from "react"

import classes from "./Layout.module.css"
import Aux from "../../hoc/Auxi"

const Layout = props => {
    return (
        <Aux>
            <div>Toolbar, SideDrawer, BackDrop</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

export default Layout;