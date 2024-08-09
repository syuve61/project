import App from './App'
	
// #ifndef VUE3 
import Vue from 'vue'
import './uni.promisify.adaptor'
import { createPinia } from 'pinia'
// import store from './store/store.js'
const pinia = createPinia()



Vue.config.productionTip = false
App.mpType = 'app'
// 配置静态资源目录
app.config.globalProperties.$static = 'static'
app.use(pinia).mount('#app')
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif