import Vue from 'vue'
const VueMaterial = require('vue-material')

import 'vue-material/dist/vue-material.css'
Vue.use(VueMaterial.MdCore)

Vue.material.registerTheme('default', {
  primary: 'blue',
  accent: 'white',
  warn: 'grey'
})

Vue.material.registerTheme('item', {
  accent: 'blue',
  background: {
    color: 'grey',
    hue: '100',
  }
})

import 'vue-material/dist/components/mdToolbar/index.css'
Vue.use(VueMaterial.MdToolbar);

import 'vue-material/dist/components/mdButton/index.css'
Vue.use(VueMaterial.MdButton);

import 'vue-material/dist/components/mdIcon/index.css'
Vue.use(VueMaterial.MdIcon);

import 'vue-material/dist/components/mdTabs/index.css'
Vue.use(VueMaterial.MdTabs);

import 'vue-material/dist/components/mdWhiteframe/index.css'
Vue.use(VueMaterial.MdWhiteframe);

import 'vue-material/dist/components/mdAvatar/index.css'
Vue.use(VueMaterial.MdAvatar);

import 'vue-material/dist/components/mdLayout/index.css'
Vue.use(VueMaterial.MdLayout);

import 'vue-material/dist/components/mdCard/index.css'
Vue.use(VueMaterial.MdCard);

import 'vue-material/dist/components/mdSpinner/index.css'
Vue.use(VueMaterial.MdSpinner);

import 'vue-material/dist/components/mdSidenav/index.css'
Vue.use(VueMaterial.MdSidenav);

import 'vue-material/dist/components/mdBackdrop/index.css'
Vue.use(VueMaterial.MdBackdrop);

import 'vue-material/dist/components/mdList/index.css'
Vue.use(VueMaterial.MdList);

import 'vue-material/dist/components/mdSpeedDial/index.css'
Vue.use(VueMaterial.MdSpeedDial);

import 'vue-material/dist/components/mdSubheader/index.css'
Vue.use(VueMaterial.MdSubheader);

import 'vue-material/dist/components/mdStepper/index.css'
Vue.use(VueMaterial.MdStepper);