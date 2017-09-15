<template>
  <md-theme name="item" md-tag="div" class="hvr-bounce-in i-item" @click.native="goArticle(article)">
    <md-subheader>{{article['create_at'] | date}}</md-subheader>
    <span>{{article.title}}</span>
    <md-subheader class="i-detail">
      <md-icon class="md-warn">remove_red_eye</md-icon>&nbsp;{{article.readCount}} &nbsp;
      <md-icon class="md-warn">favorite</md-icon>&nbsp;{{article.favs}}
    </md-subheader>
  </md-theme>
</template>

<script>
import {
  ARTICLE
} from "../store/mutation-types";

export default {
  name: 'item',
  props: ['article'],
  methods: {
    goArticle(article) {
      sessionStorage.setItem(article.filename, JSON.stringify(article));
      this.$store.commit(ARTICLE, article);
      this.$router.push(`/${article.bookID.bookname}/${article.filename}`);
    }
  }
}
</script>

<style scoped>
.i-item {
  display: flex;
  padding: 1rem 3rem;
  align-items: baseline;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  flex-wrap: wrap;
}

.i-item>span {
  font-size: 18px;
}

.i-detail {
  align-self: end;
  margin-left: auto;
}
</style>

