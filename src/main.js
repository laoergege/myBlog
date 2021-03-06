// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './vue-material-components' //导入 vue-material 组件

import '@/assets/js/clamp.min'; // 导入 clamp JS插件

import 'hover.css/less/hover.less'
import 'hover.css/less/effects/2d-transitions/_grow-rotate.less'
import 'hover.css/less/effects/2d-transitions/_bounce-in.less'
import './style.less' // 导入 全局样式

Vue.filter('date', function (d) {
    return d.slice(0,10)
  }
)


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
