<template>
    <md-layout :md-column="true">
        <h1 class="label">
            <svg class="icon" aria-hidden="true">
                <use v-bind:xlink:href="icon"></use>
            </svg>
            &nbsp;
            <span class="md-title"> {{markbook}}</span>
        </h1>

        <md-layout md-gutter :md-column-small="true">

            <md-layout md-align="center" v-for="(top,index) in tops" :key="index">
                <md-theme :md-name="theme">
                    <md-card class="item hvr-grow-rotate" :md-with-hover="true" @click.native="goArticle(top)">
                        <md-card-content class="item-content">
                            <div ref="top">{{top.title}}</div>
                        </md-card-content>
                    </md-card>
                </md-theme>
            </md-layout>

        </md-layout>
    </md-layout>
</template>

<script>
import '../assets/js/iconfont';
import {
    ARTICLE
} from "../store/mutation-types";

export default {
    name: 'topItem',
    props: {
        icon: {
            type: String,
            require: true
        },
        tops: {
            type: Array,
            require: true,
            default: []
        },
        markbook: {
            type: String,
            require: true
        },
        theme: {
            type: String,
            require: true
        }
    },
    mounted() {
        if (this.$refs.top) {
            // 多行文本溢出隐藏
            this.$refs.top.map(
                (top) => {
                    $clamp(top, { clamp: 2 });
                }
            )
        }
    },
    updated() {
        // 多行文本溢出隐藏
        this.$refs.top.map(
            (top) => {
                $clamp(top, { clamp: 2 });
            }
        )
    },
    methods: {
        goArticle(article) {
            sessionStorage.setItem(article.filename, JSON.stringify(article));
            this.$store.commit(ARTICLE, article);
            this.$router.push(`/${article.bookID.bookname}/${article.filename}`);
        }
    }
}
</script>

<style lang="less" scoped>
.label {
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
        width: 1.5em;
        height: 1.5em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
}

.item {
    margin: 3px;
    padding: 2rem; 
}

.item .item-content {
    font-size: 18px;
    max-height: 4rem;
    overflow: hidden;
    text-align: center; 
}

@media screen and (max-width: 960px) {
    .item .item-content {
        width: 100vh;
        max-height: 2rem;
    }
}
</style>

