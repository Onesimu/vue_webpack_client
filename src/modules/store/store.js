import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import 'filters'
import 'components'
import Wrap from 'components/c-wrap'
Vue.use(VueRouter);
Vue.use(VueResource);

const List = resolve => require(['./views/list.vue'], resolve)
const Create = resolve => require(['./views/create.vue'], resolve)

const router = new VueRouter({
  routes: [
	  {
	   path: '/',
	   redirect: '/list',
	  },
	  {
	    path: '/list',
	    name:"商品管理",
	    component: List,
	  },
	  {
	    path: '/create',
	    name:"商品编辑",
	    component: Create,
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
