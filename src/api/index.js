import Vue from 'vue'
import VueResource from 'vue-resource'
import {$alert} from '../assets/js/dialog'

//接口主机名，开发环境一般为空，生产环境根据情况设置
const HOST = "";

Vue.use(VueResource)
//服务器无法处理application/json,所以只能把请求当作表单提交
Vue.http.options.emulateJSON = true;
Vue.http.options.xhr = {withCredentials: true}

const skipLogin = ["login"]

Vue.http.interceptors.push((request, next) => {
	request.url = HOST + request.url;
	// 请求发送前的处理逻辑
	next((response) => {
		// 请求完成后的处理逻辑
		var data;
		try{
			data = JSON.parse(response.body);
		}catch(e){
			data = response.body
		}
		if(data.status=="401"){
			$alert("对不起，您尚未登录，请登录后重试",function(){
				location.href="login.html"
			});
		}else if(data.status=="403"){
			$alert("对不起，您没有权限进行此项操作，请重新登录后再试",function(){
				location.href="login.html"
			});
		}else if(data.status=="1"){
			$alert(data.errmsg||"对不起，系统繁忙，请稍后再试");
		}else if(data.status=="0"){
			return response;
		}else{
			$alert("对不起，系统繁忙，请稍后再试");
		}
	})
})

// 登录
export const getPrivilegeList = Vue.resource('/admin/getPrivilegeList.json')
