import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import 'filters'
import 'components'
import Wrap from 'components/c-wrap'
Vue.use(VueRouter);
Vue.use(VueResource);

const Standard = resolve => require(['./standard.vue'], resolve)

const router = new VueRouter({
  routes: [
	  {
	   path: '/',
	   redirect: '/standard',
	  },
	  {
	    path: '/standard',
	    name:"首页",
	    component: Standard,
	  }
	],
  linkActiveClass:'active'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(Wrap),
  router,
});