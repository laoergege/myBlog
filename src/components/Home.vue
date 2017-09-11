<template>
    <div class="layout">
        <md-toolbar class="md-medium">
            <div class="md-toolbar-container">
                <md-avatar class="md-large avatar">
                    <img src="../assets/avatar.jpg" alt="People">
                </md-avatar>

                <h2 class="md-title" style="flex: 1;margin-left:5px">laoergege</h2>

                <md-button class="md-icon-button">
                    <md-icon>search</md-icon>
                </md-button>

                <md-button class="md-icon-button" @click="openRSideNav">
                    <md-icon>filter_list</md-icon>
                </md-button>
            </div>
        </md-toolbar>

        <div class="layout">
            <md-tabs :md-centered="true" @change="onChange($event)">
                <md-tab :id="book" :md-label="book" v-for="(book, index) in markbooks" :key="index">
                </md-tab>
            </md-tabs>

            <list v-if="bookdatas" :items="bookdatas">
                <template scope="props">
                    <keep-alive>
                        <component v-bind:is="currentView" :icon="props.icon" :tops="props.tops" :markbook="props.markbook" :theme="props.color"></component>
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
import _http from "../util/http";

export default {
    name: 'home',
    data() {
        return {
            markbooks: [
                'Home', 'Angular', 'Vue', 'JavaScript', 'MongoDB', 'TypeScript', 'Sass'
            ],
            currentView: 'top-item',
            bookdatas: null
        }
    },
    components: {
        list: List,
        "top-item": TopItem,
        item: Item
    },
    methods: {
        onChange(index) {
            this.currentView = index == 0 ? 'top-item' : 'item';
        }
    },
    created() {
        _http.get('/static/mock/markbooks.json')
            .then((response) => {
                this.bookdatas = response.data
            })
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

.avatar {
    border: 2px solid;
}

.loading {
    margin: auto 0;
    align-self: center;
}
</style>

