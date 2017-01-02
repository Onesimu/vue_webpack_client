<template lang="html">
<div class="topbar ">
    <div class="topbar-left">
      <div class="text-center">
          <a href="main.html" class="logo" v-html="sysName">
          </a>
      </div>
    </div>
    <div class="navbar navbar-default" role="navigation">
        <div class="container">
    			<div class="navbar-collapse collapse" aria-expanded="false" id="bs-navbar">
              <ul class="nav navbar-nav navbar-left pull-left" id="mainMenusBox">
                <li v-for="channel in channels"><a :href="channel.path" :class="{active: active == channel.name}"><i class="iconfont" v-html="channel.icon"></i> {{channel.name}}</a></li>
              </ul>
              <ul class="nav navbar-nav navbar-right pull-right">
                <li><a class="ell w100 text-right">{{account}}</a></li>
                <li>
                  <a href="javascript:;" @click="logout">退出</a>
                </li>
              </ul>
        	</div>
        </div>
    </div>
</div>
</template>

<script>
import { logoutAdmin,logoutAgent } from 'api'
export default {
  name:'c-topbar',
  data(){
    return {
      account:"",
      path:"",
      sysName:""
    }
  },
  props:['channels','active'],
  mounted(){
    var pagePath = location.pathname.split('.')[0].split("/");
    this.path = pagePath[1];
    if(this.path=="admin"){
      this.account = localStorage.supplierName;
      this.sysName = '稀雅-品牌商管理后台';
    }else{
      this.account = localStorage.agentName;
      this.sysName = '稀雅-代理商管理后台';
    }
  },
  methods:{
    logout(){
      var logoutAPI;
      if(this.path=="admin"){
        logoutAPI = logoutAdmin;
      }else{
        logoutAPI = logoutAgent;
      }
      logoutAPI.get().then(res=>{
        location.href="login.html";
      });
    }
  }
}
</script>

