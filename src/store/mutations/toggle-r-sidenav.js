import {
    TOGGLE_R_SIDENAV
} from "../mutation-types";

export default {
    [TOGGLE_R_SIDENAV](state) {
        state.openSidenav = state.openSidenav == true ? false : true;
    }
}