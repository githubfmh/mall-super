import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()

new Vue({
	router,
	store,
  render: h => h(App),
}).$mount('#app')
