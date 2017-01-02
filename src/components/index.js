import Vue from 'vue'
import pagination from './pagination'
import select2 from './select2'
import {$alert, $confirm} from 'assets/js/dialog'
import {getUrlParam} from 'assets/js/webuploader'

Vue.component('pagination', pagination)
Vue.component('select2', select2)

Vue.prototype.$alert = $alert;
Vue.prototype.$confirm = $confirm;
Vue.prototype.$getUrlParam = getUrlParam;
