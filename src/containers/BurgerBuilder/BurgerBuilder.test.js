import React from "react"

import Adapter from "enzyme-adapter-react-16"
import { configure, shallow } from "enzyme"
import BurgerBuilder from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onIngredientsLoaded={() => { }} />);
    })

    it("Must render one BuildControls element when has ings props", () => {
        wrapper.setProps({ ings: { salad: 0 } })
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
})