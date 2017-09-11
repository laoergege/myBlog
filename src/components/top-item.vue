<template>
    <md-layout :md-column="true">
        <h1 class="label">
            <svg class="icon" aria-hidden="true">
                <use v-bind:xlink:href="icon"></use>
            </svg>
            <span class="md-title"> {{markbook}}</span>
        </h1>

        <md-layout md-gutter :md-column-small="true">

            <md-layout  md-align="center" :md-flex="33" v-for="(top,index) in tops" :key="index">
                <md-card class="md-warn item" :md-with-hover="true">
                    <md-card-header>
                        <div class="md-title item-content" ref="top">{{top}}</div>
                    </md-card-header>
                </md-card>
            </md-layout>

        </md-layout>
    </md-layout>
</template>

<script>
import '../assets/js/iconfont';

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
        // 多行文本溢出隐藏
        this.$refs.top.map(
            (top) => {
                $clamp(top, { clamp: 'auto' });
            }
        )
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
    margin: 10px;
}

.item .item-content {
    max-height: 4rem;
    overflow: hidden;
    text-align: center;
}

@media screen and (max-width: 960px) {
    .item .item-content {
        width: 300px;
        max-height: 2rem;
    }
}
</style>

