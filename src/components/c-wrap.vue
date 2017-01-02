<template lang="html">
    <div id="wrapper" class="forced" :class="{'enlarged':menuMini}">
        <div class="topbar">
            <div class="topbar-left">
                <div class="text-center">
                    <a href="index.html" class="logo"><i class="iconfont icon-magnet icon-c-logo">&#xe67e;</i><span>洽客商户后台</span></a>
                </div>
            </div>
            <div class="navbar navbar-default" role="navigation">
                <div class="container">
                    <div class="">
                        <div class="pull-left">
                            <button @click="narrowMenu" class="button-menu-mobile open-left"><i class="iconfont ion-navicon" v-html="menuStatusIcon"></i></button><span class="clearfix"></span>
                        </div>
                        <ul class="nav navbar-nav navbar-right pull-right">
                            <li class="dropdown hidden-xs"><a href="#" class="dropdown-toggle waves-light"><i class="iconfont f20 vm rel" style="top:-2px;">&#xe6ee;</i><span class="badge badge-xs badge-danger">3</span></a>
                            </li>
                            <li class="dropdown hidden-xs">
                                <a href="#" @click.prevent="showSet" class="dropdown-toggle waves-light">
                                    <i class="iconfont f20 vm rel" style="top:-2px;">&#xe613;</i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-lg">
                                    <li><a href="">退出登录</a></li>
                                </ul>
                            </li>
                            <li class="dropdown">
                                <div href="" class="dropdown-toggle profile">
                                    <img src="https://qncdn.qiakr.com/FhDDA2KOxNi-ZoW5LlBpnrVb0mlu?imageView2/1/w/50/h/50" alt="user-img" class="img-circle">
                                    <div class="supplier">
                                        <div>杭州信息有限公司</div>
                                        <div>ID:19870903</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="left side-menu ovh">
            <div class="slimScrollDiv">
                <div class="sidebar-inner slimscrollleft">
                    <div id="sidebar-menu">
                        <ul>
                            <li v-for="(e,k) in menuList" class="has_sub"><a @click.stop="showSubmenu($event)" href="javascript:;" class=""><i v-html="e.pic" class="iconfont"></i><span>{{e.name}}</span></a>
                                <ul class="list-unstyled">
                                    <li v-for="s in e.subMenu"><a :href="s.url">{{s.name}}</a></li>
                                </ul>
                            </li>

                        </ul>
                        <div class="clearfix">
                        </div>
                    </div>
                    <div class="clearfix">
                    </div>
                </div>
                <div class="slimScrollBar" style="background: rgb(220, 220, 220); width: 5px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 139.562px; visibility: visible;">
                </div>
                <div class="slimScrollRail" style="width: 5px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;">
                </div>
            </div>
        </div>
        <div class="content-page">
            <div class="content">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
            <footer class="footer">杭州蚁国科技有限公司    浙ICP备14041692号</footer>
        </div>
    </div>
</template>

<script>
import { getPrivilegeList } from 'api'
export default {
    data(){
        return {
            menuMini:false,
            menuList:[],
            menuStatusIcon:'&#xe6ef;'
        }
    },
    created(){
        this.initPrivilegeList();
    },
    methods:{
        initPrivilegeList(){
            getPrivilegeList.get().then(res=>{
                var list = res.body.privilegeList;
                var treeList = {};
                list.forEach(e=>{
                    if(!e.parentId){
                        e.subMenu = [];
                        treeList[e.id] = e;
                    }else{
                        // debugger;
                        if(treeList[e.parentId]){
                            treeList[e.parentId].subMenu.push(e);
                        }else{
                            var secId = e.parentId;
                            for(var i=0;i<list.length;i++){
                                if(list[i].id==secId){
                                    var secParentId = list[i].parentId;
                                    treeList[secParentId].subMenu.push(e)
                                    return;
                                }
                            }
                        }
                        
                    }
                });
                console.log(treeList)
                this.menuList = treeList;
            });
        },
        narrowMenu(){
            if(this.menuMini){
                $(".side-menu.left").addClass("ovh");
                this.menuStatusIcon = '&#xe6ef;';
                this.menuMini = false;
            }else{
                $("#sidebar-menu .list-unstyled").removeAttr("style");
                $(".side-menu.left").removeClass("ovh");
                this.menuStatusIcon = '&#xe6f0;';
                this.menuMini = true;
            }
        },
        showSubmenu(e){
            if(!this.menuMini){
                var list = $(event.target).closest("li").find(".list-unstyled");
                // debugger;
                if(list.is(":visible")){
                    list.slideUp(200);
                }else{
                    $(event.target).closest("li").siblings().find(".list-unstyled:visible").slideUp(200);
                    list.slideDown(200);
                }
            }
        },
        showSet(e){
            $(event.target).closest(".dropdown").toggleClass("open");
        }
    }
}
</script>

