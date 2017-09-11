<template>
  <div ref="container">
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

    <div class="info">
      <md-avatar>
        <img src="../assets/avatar.jpg" alt="Avatar">
      </md-avatar>

      <md-subheader>
        <span style="font-size: 18px;">laoergege</span><br>
        <span class="detail"> 2017.08.16 01:37 字数 148 阅读 1评论 0喜欢 0</span>
      </md-subheader>
    </div>

    <div class="markdown-body" v-html="content" ref="mdBody">
    </div>

    <div class="comments">
      <md-list>
        <md-list-item>
          <md-avatar>
            <img src="https://placeimg.com/40/40/people/5" alt="People">
          </md-avatar>

          <span>Abbey Christansen</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">chat_bubble</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item>
          <md-avatar>
            <img src="https://placeimg.com/40/40/people/1" alt="People">
          </md-avatar>

          <span>Alex Nelson</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">chat_bubble</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item>
          <md-avatar>
            <img src="https://placeimg.com/40/40/people/6" alt="People">
          </md-avatar>

          <span>Mary Johnson</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon>chat_bubble</md-icon>
          </md-button>
        </md-list-item>
      </md-list>
    </div>

    <md-speed-dial md-mode="scale" class="md-fab-bottom-right">
      <md-button class="md-fab" md-fab-trigger>
        <md-icon md-icon-morph>close</md-icon>
        <md-icon>share</md-icon>
      </md-button>

      <md-button class="md-fab md-mini md-clean">
        <md-icon>arrow_up</md-icon>
      </md-button>

      <md-button class="md-fab md-mini md-clean">
        <md-icon>share</md-icon>
      </md-button>
    </md-speed-dial>

    <md-sidenav class="md-right md-fixed" ref="rightSidenav">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title" ref="title">{{title}}</h3>
        </div>
      </md-toolbar>
      <md-theme>
        <div ref="catalog" class="catalog"></div>
      </md-theme>
    </md-sidenav>

  </div>
</template>

<script>
import axios from 'axios';
import showdown from 'showdown';
// markdown 样式
import "github-markdown-css/github-markdown.css"
// code 高亮 样式
import "highlight.js/styles/atom-one-light.css"
import hljs from "highlight.js/lib/highlight"

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
      title: 'Angular数据检测及单向数据流',
      section: 'Angular数据检测及单向数据流',
      lastSection: '',
      flag: false // 渲染标记
    }
  },
  computed: {
    isOpen() {
      return this.$store.state.openSidenav;
    }
  },
  props: {
    articleAddr: {
      type: String,
      require: true,
      default: 'http://localhost:8080/static/markdown/angular.md'
    }
  },
  methods: {
    async getArticle() {
      let res = await axios({ headers: { 'Content-Type': 'text/plain' }, url: this.articleAddr });
      let md = res.data;
      return md;
    },
    openRSideNav() {
      this.$refs.rightSidenav.toggle();
    },
    onScorll(e) {
      // 阅读到底部
      if (e.target.body.scrollHeight == (e.target.body.scrollTop + window.innerHeight)) {
        this.section = this.lastSection;
        return;
      }
      for (let [key, value] of this.catalog.entries()) {
        if (e.target.body.scrollTop <= value && e.target.body.scrollTop != 0) {
          if (this.section == key) {
            break;
          } else {
            this.section = key;
            break;
          }
        } else {
          // 回滚到顶部
          this.section = this.title;
        }
      }
    },
    backHome() {
      this.$router.back();
    }
  },
  watch: {
    isOpen: function(val) {
      this.$refs.rightSidenav.toggle()
    }
  },
  created() {
    this.getArticle().then((md) => {
      this.content = converter.makeHtml(md);
    })
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

      let hs = this.$refs.mdBody.querySelectorAll('h1,h2,h3,h4,h5');
      hs.forEach((h, index, array) => {
        let i = (index + 1) == array.length ? index : (index + 1);
        this.catalog.set(h.innerText, array[i].offsetTop - 85);

        let ch = h.cloneNode(true);

        this.$refs.catalog.appendChild(ch);

        ch.addEventListener('click', () => {
          document.body.scrollTop = h.offsetTop - 80;
        })


      })

      this.lastSection = hs[hs.length - 1].innerText;

      window.addEventListener('scroll', this.onScorll); // 监听阅读位置

      this.flag = true;
      console.log(1)
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScorll);
  }
}
</script>

<style lang="less" scoped>
.a_toolbar {
  position: fixed;
  width: 100%;
  top: 0;
}

.info {
  padding: 80px 20px 0; 
  display: flex;
  justify-content: center;
  align-items: center;
  .md-avatar {
    margin: 0 0.5rem !important;
  }
  .detail{
    font-size: 12px;
    color: #969696;
  }
}

.markdown-body {
  box-sizing: border-box;
  width: 80%;
  padding:0 45px;
  margin: 0 auto;
}

.comments {
  display: flex;
  justify-content: center;
  width: 80%;
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

.catalog {
  padding: 0 0.5rem;
  cursor: pointer;

  h1 {
    padding: 0 0.3rem!important
  }
  h2 {
    padding: 0 0.5rem!important
  }
  h3 {
    margin-left: 0 0.7rem!important
  }
  h4 {
    padding: 0 0.9rem!important
  }
  h5 {
    padding: 0 1.1rem!important
  }
  h6 {
    padding: 0 1.3rem!important
  }
}
</style>

