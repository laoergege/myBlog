<template>
    <div>
        <ul>
            <li v-for="(item, index) of data" :key="index">{{item}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'catalog',
    props: {
        data: {
            type: Array,
            default: []
        }
    }
}
</script>
