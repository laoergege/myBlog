<template>
    <div class="layout">
        <md-toolbar class="md-medium">
            <div class="md-toolbar-container">
                <md-avatar class="md-large avatar">
                    <img src="../assets/github.svg" alt="People">
                </md-avatar>

                <h2 class="md-title" style="flex: 1;margin-left:5px">laoergege</h2>

                <md-button class="md-icon-button">
                    <md-icon>search</md-icon>
                </md-button>

                <md-button class="md-icon-button">
                    <md-icon>filter_list</md-icon>
                </md-button>
            </div>
        </md-toolbar>

        <div class="layout">
            <md-tabs :md-centered="true" @change="onChange($event, $refs.tabs)" ref="tabs">
                <md-tab md-label="home" @click.native="data=homedata" :id="0"></md-tab>
                <md-tab :id="key" :md-label="book[0].bookID.bookname" v-for="(book, key) in books" :key="key">
                </md-tab>
            </md-tabs>

            <list v-if="!loading" :items="data" style="margin-bottom:2rem;">
                <template scope="props">

                    <keep-alive>
                        <component v-bind:is="currentView" :article="props" :icon="props.icon" :tops="props.tops" :markbook="props.markbook" :theme="props.theme"></component>
                    </keep-alive>

                </template>
            </list>

            <md-spinner v-else md-indeterminate class="md-primary loading" :md-size="60"></md-spinner>

        </div>

        <md-toolbar class="md-account-header">

        </md-toolbar>
    </div>
</template>

<script>
import List from './List';
import TopItem from './top-item';
import "animate.css/source/sliding_entrances/slideInLeft.css";
import Item from './Item';
import { http } from "../util/http";
import { mapActions, mapState } from 'vuex'
import config from '../config'

export default {
    name: 'home',
    data() {
        return {
            currentView: 'top-item',
            loadTime: 3000,
            loading: true,
            homedata: [],
            data: []
        }
    },
    computed: {
        ...mapState(['books']),
    },
    components: {
        list: List,
        "top-item": TopItem,
        item: Item
    },
    methods: {
        onChange(index, tabs) {
            this.currentView = index == 0 ? 'top-item' : 'item';
            if (index) {
                let key = tabs.$children[index + 1].id;
                this.data = this.books[key];
            } else {
                this.data = this.homedata;
            }
        },
        ...mapActions(['getBooks'])
    },
    created() {
        // if (!this.books) {
        this.getBooks().then(() => {
            let state = this.$store.state;
            let data = config.HOME_CONFIG;
            data[0].tops = state['top_books']
            for (let key in state['new_books']) {
                for (let index = 1; index < data.length; index++) {
                    if (state['new_books'][key][0].bookID.bookname == data[index].markbook) {
                        data[index].tops = state['new_books'][key];
                    }
                }
            }
            this.homedata = data;
            this.data = data;
        });
        setTimeout(() => {
            this.loading = false;
        }, this.loadTime);
        // } else {
        //     this.loading = false;
        // }
    }
}
</script>

<style scoped>
.layout {
    display: flex;
    flex-flow: column;
    position: relative;
    overflow: hidden;
    z-index: 1;
    min-height: 100vh;
}

.layout .md-toolbar-container {
    align-self: auto;
}

.loading {
    margin: auto 0;
    align-self: center;
}
</style>

