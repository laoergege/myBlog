<template>
  <div ref="container" class="a-container">
    <md-whiteframe md-tag="md-toolbar" md-elevation="2" class="a_toolbar" md-theme="light-blue">
      <div class="md-toolbar-container">
        <md-button class="md-icon-button" @click="backHome">
          <md-icon>arrow_back</md-icon>
        </md-button>

        <h2 class="md-title" style="flex: 1;text-align: center;">{{section}}</h2>

        <md-button class="md-icon-button" @click="openRSideNav">
          <md-icon>menu</md-icon>
        </md-button>
      </div>
    </md-whiteframe>

    <transition name="fade">
      <div v-if="!loading">
        <div class="info">
          <md-avatar>
            <img src="../assets/avatar.jpg" alt="Avatar">
          </md-avatar>

          <div>
            <span style="font-size: 18px;">laoergege</span>
            <br>
            <span class="detail"> {{article.create_at | date}} 字数 {{article.wordCount}} 阅读 {{article.readCount}} 评论 0 喜欢 {{article.favs}}</span>
          </div>
        </div>
        <div class="markdown-body" v-html="content" ref="mdBody">
        </div>
        <div id="comment" ref="comment" class="comments"></div>
      </div>
      <md-spinner v-else md-indeterminate class="md-primary loading" :md-size="60"></md-spinner>
    </transition>

    <md-sidenav class="md-right md-fixed" ref="rightSidenav">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title" ref="title">{{title}}</h3>
        </div>
      </md-toolbar>
      <div class="catalog">
        <div class="track"></div>
        <ul ref="catalog" class="content"></ul>
      </div>
    </md-sidenav>

  </div>
</template>

<script>
import axios from 'axios';
import config from '../config'
import showdown from 'showdown';
import Vue from 'vue';

// markdown 样式
import "github-markdown-css/github-markdown.css"

// code 高亮 样式
import "highlight.js/styles/atom-one-light.css"
import hljs from "highlight.js/lib/highlight"
import { mapState } from "vuex"

// 导入 gitment 插件
// import 'gitment/style/default.css'
// const Gitment = require('gitment/dist/gitment.browser.js');
// import 'gitment/dist/gitment.browser.js'
// console.log(Gitment)

// 注册需要高亮的语言
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'));

const converter = new showdown.Converter();

export default {
  name: 'article',
  data() {
    return {
      content: '',
      catalog: new Map(),
      title: '',
      section: '',
      lastSection: '',
      flag: false, // 渲染标记,
      gitment: null,
      progress: 0,
      loading: true,
    }
  },
  computed: {
    isOpen() {
      return this.$store.state.openSidenav;
    },
    ...mapState({
      article(state) {
        return state.article || JSON.parse(sessionStorage.getItem(this.$route.params.id))
      }
    }),
  },
  methods: {
    openRSideNav() {
      this.$refs.rightSidenav.toggle();
    },
    onScorll(e) {
      if (document.documentElement.scrollTop == 0) {
        this.section = this.title;
        return;
      }
      for (let [key, value] of this.catalog.entries()) {
        if (window.scrollY < value) {
          this.section = key;
          let target = document.querySelector(`#title-${value}`);
          let active;
          if (target) {
            this.deactivated();
            active = target.className.concat(' current-title');
            target.className = active;
          }
          break;
        }
      }
    },
    backHome() {
      this.$router.back();
    },
    init() {
      this.title = this.article.title;
      this.section = this.article.title;
      this.$store.dispatch('getArticle', this.article).then(
        (md) => {
          this.content = converter.makeHtml(md);
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }
      )
    },
    deactivated() {
      let deactivated = document.querySelector('.current-title');
      deactivated.className = deactivated.className.replace('current-title', '');
    }
  },
  watch: {
    isOpen: function(val) {
      this.$refs.rightSidenav.toggle()
    }
  },
  created() {
    this.init();
  },
  mounted() {

    $clamp(this.$refs.title, { clamp: 1 });

  },
  updated() {
    if (!this.flag) {
      // 语法高亮
      let blocks = this.$refs.mdBody.querySelectorAll('pre code');
      blocks.forEach((block) => {
        hljs.highlightBlock(block)
      });

      // 渲染目录
      let hs = this.$refs.mdBody.querySelectorAll('h1,h2,h3,h4,h5');
      hs.forEach((h, index, array) => {

        let i = (index + 1) == array.length ? 0 : (index + 1);
        let top = (i == 0 ? document.documentElement.scrollHeight : (array[i].offsetTop - 80));
        this.catalog.set(h.innerText, top);

        let li = document.createElement('li');
        li.id = `title-${top}`;
        if (index == 0) {
          li.className = `title-${h.tagName} current-title`
        } else {
          li.className = `title-${h.tagName}`;
        }
        li.innerText = h.innerText;

        this.$refs.catalog.appendChild(li);

        li.addEventListener('click', (e) => {
          console.log(e.target)
          window.scrollTo(0, h.offsetTop - 80);
          this.deactivated();
          let active = li.className.concat(' current-title');
          li.className = active;
        }, false)
      })

      this.lastSection = hs[hs.length - 1].innerText;

      // 监听阅读位置
      document.addEventListener('scroll', this.onScorll);

      // 渲染评论
      this.gitment = new Gitment({
        id: this.article._id, // optional
        ...config.GITMEN_CONFIG
      })

      this.gitment.render(this.$refs.comment)

      this.flag = true;
    }

  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScorll);
  }
}
</script>

<style lang="less" scoped>
.a-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.a-progress {
  position: fixed;
  top: 0;
  z-index: 100;
}

.a_toolbar {
  position: fixed;
  width: 100%;
  top: 0;
}

.info {
  padding: 100px 20px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  .md-avatar {
    margin: 0 0.5rem !important;
  }
  .detail {
    font-size: 12px;
    color: #969696;
  }
}

.markdown-body {
  box-sizing: border-box;
  width: 60%;
  padding: 0 45px;
  margin: 2rem auto;
}

svg:not(.md-image) {
  height: inherit;
}

.comments {
  width: 60%;
  margin: 0 auto;
  padding: 1rem;
}

.loading {
  margin: auto 0;
  align-self: center;
}

@media (max-width: 767px) {
  .markdown-body {
    width: 100%;
    padding: 20px 15px 15px;
  }
  .comments {
    width: 100%;
  }
}





/**目录**/

.catalog {
  display: flex;
}

.track {
  height: auto;
  border: 1px solid #9e9e9e;
  align-self: stretch;
  position: relative;
  left: 28px;
  z-index: -1;
}

ul.content {
  cursor: pointer;
  list-style-type: none;
}
</style>

