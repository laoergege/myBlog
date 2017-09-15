import { http, require } from '../util/http';
import config from '../config'
import store from '../store/store'
import {
  INIT_BOOKS
} from "./mutation-types";

export default {
    async getBooks() {
        try {
           let res = await http.get(config.BOOKSADDR);
           
           store.commit(INIT_BOOKS, res.data);
        } catch (error) {
            console.log(error);
        }
    },

    async getArticle({commit}, article) {
        try {
            let res = await require(`${article.directory}/${article.filename}.md`);

            return res.data
        } catch (error) {
            console.log(error);
        }
    }
}