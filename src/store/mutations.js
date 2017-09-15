import {
    TOGGLE_R_SIDENAV, INIT_BOOKS, ARTICLE
} from "./mutation-types";
const _ = require('lodash/collection');
import Vue from 'vue';

export default {
    [TOGGLE_R_SIDENAV](state) {
        state.openSidenav = state.openSidenav == true ? false : true;
    },

    [INIT_BOOKS](state, all) {
        state.books = _.groupBy(all, 'bookID._id');

        state['top_books'] = _.sortBy(all, 'readCount').slice(0,3);

        for(let key in state.books){
            state['new_books'][key] = state.books[key].slice(0,3);
        }
    },

    [ARTICLE](state, article) {
        state.article = article;
    }
}