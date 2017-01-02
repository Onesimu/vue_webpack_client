<style>

</style>
<template>
<div class="container">
    <div class="row">
        <div class="col-lg-6">
            <div class="panel panel-border">
                <div class="panel-heading"><h3 class="panel-title">文字</h3></div>
                <div class="panel-body">
                    <div class="bdr">
                        <div class="text-left">左对齐.text-left</div>
                        <div class="text-center">居中对齐.text-center</div>
                        <div class="text-right">右对齐.text-right</div>
                    </div>
                    <div class="bdr">
                        <div class="text-muted fs12">.text-muted.fs12</div>
                        <div class="text-warning fs13">.text-warning.fs13</div>
                        <div class="text-danger fs14">.text-danger.fs14</div>
                        <a href="javascript:;" class="text-link fs16">.text-link.fs16</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="panel panel-border">
                <div class="panel-heading"><h3 class="panel-title">按钮、输入框</h3></div>
                <div class="panel-body">
                    <div>
                        <button class="btn">.btn</button>
                        <button class="btn btn-default">.btn.btn-default</button>
                        <button class="btn btn-light">.btn.btn-light</button>
                        <button class="btn disabled">.btn.disabled</button>
                        <button class="btn btn-primary">.btn.btn-primary</button>
                        <button class="btn btn-link">.btn.btn-link</button>
                        <button class="btn btn-lg">.btn.btn-lg</button>
                        <button class="btn btn-sm">.btn.btn-sm</button>
                    </div>
                    <div class="pt10 form-inline">
                        <input type="text" class="form-control input-sm w100">
                        <input type="text" class="form-control input-sm w150" placeholder="选择时间">
                    </div>
                    <div class="pt10 form-inline">
                        <div class="checkbox checkbox-custom"><input id="checkbox0" type="checkbox"><label for="checkbox0">多选1</label></div>
                        <div class="checkbox checkbox-custom"><input id="checkbox1" type="checkbox"><label for="checkbox1">多选2</label></div>
                        <div class="radio radio-custom"><input type="radio" name="radio" id="radio1" value="option2"><label for="radio1">单选1</label></div>
                        <div class="radio radio-custom"><input type="radio" name="radio" id="radio2" value="option2"><label for="radio2">单选2</label></div>
                    </div>
                    <div class="pt10">
                        <select2 class="form-control input-sm w125" name="dateType" :options="[{id:'1',text:'选项一'},{id:'2',text:'选项二'},{id:'3',text:'选项三'}]" :search="0" ></select2>
                        <select2 class="form-control input-sm w125" name="dateType" :options="[{id:'1',text:'选项一'},{id:'2',text:'选项二'},{id:'3',text:'选项三'}]" ></select2>
                        <select2 class="form-control input-sm w300" multiple name="dateType" :options="[{id:'1',text:'选项一'},{id:'2',text:'选项二'},{id:'3',text:'选项三'}]" ></select2>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-6">
            <div class="panel panel-border">
                <div class="panel-heading"><h3 class="panel-title">辅助类</h3></div>
                <div class="panel-body">
                    <code>
                        左浮动：.pull-left /*!important*/<br>
                        右浮动：.pull-right /*!important*/<br>
                        显示：.show /*!important*/<br>
                        隐藏：.hide /*!important*/<br>
                        边框：.bdr, .bdr-l, .bdr-r, .bdr-t, .bdr-b, .bdr0, /*#e4e4e4*/<br>
                        display：.dn{display:none;} .di{display:inline;} .db{display:block;} .dib{display:inline-block;}<br>
                        内间距：.p0,.p5~.p30,  .pt0,.pt5~.pt30 ... /*4方向间距t、r、b、l*/<br>
                        外间距：.m0,.m5~.m30,  .mt0,.mt5~.mt30 ... /*4方向间距t、r、b、l*/<br>
                        .ovh{overflow: hidden;} <br>
                        .ell{text-overflow:ellipsis; white-space:nowrap; overflow:hidden;} <br>
                        宽度：w50,w75,w100,w125,w150,w175,w200,w250,w300 /*!important*/
                    </code>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="panel panel-border">
                <div class="panel-heading"><h3 class="panel-title">弹窗</h3></div>
                <div class="panel-body">
                    <button class="btn" @click="alertDia">alert</button>
                    <button class="btn" @click="confirmDia">confirm</button>
                    <span>看右侧小弹窗</span>
                    <div class="line-tip right-top">
                        大部分用户选择这个
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-6">
            <div class="panel panel-border">
                <div class="panel-heading"><h3 class="panel-title">分页</h3></div>
                <div class="panel-body">
                    <pagination :page="page" v-on:btn-click="getagents"></pagination>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
    <div class="col-md-12"><div class="card-box"><h4 class="m-t-0 header-title"><b>栅格布局，统一用"col-md"</b></h4><p class="text-muted m-b-30 font-13">Don't want your columns to simply stack in smaller devices? Use the extra small and medium device grid classes by adding <code>.col-xs-*</code> <code>.col-md-*</code> to your columns. See the example below for a better idea of how it all works.</p><div class="grid-structure"><div class="row"><div class="col-md-12"><div class="grid-container">col-md-12</div></div></div><div class="row"><div class="col-md-11"><div class="grid-container">col-md-11</div></div><div class="col-md-1"><div class="grid-container">col-md-1</div></div></div><div class="row"><div class="col-md-10"><div class="grid-container">col-md-10</div></div><div class="col-md-2"><div class="grid-container">col-md-2</div></div></div><div class="row"><div class="col-md-9"><div class="grid-container">col-md-9</div></div><div class="col-md-3"><div class="grid-container">col-md-3</div></div></div><div class="row"><div class="col-md-8"><div class="grid-container">col-md-8</div></div><div class="col-md-4"><div class="grid-container">col-md-4</div></div></div><div class="row"><div class="col-md-7"><div class="grid-container">col-md-7</div></div><div class="col-md-5"><div class="grid-container">col-md-5</div></div></div><div class="row"><div class="col-md-6"><div class="grid-container">col-md-6</div></div><div class="col-md-6"><div class="grid-container">col-md-6</div></div></div><div class="row"><div class="col-md-5"><div class="grid-container">col-md-5</div></div><div class="col-md-7"><div class="grid-container">col-md-7</div></div></div><div class="row"><div class="col-md-4"><div class="grid-container">col-md-4</div></div><div class="col-md-8"><div class="grid-container">col-md-8</div></div></div><div class="row"><div class="col-md-3"><div class="grid-container">col-md-3</div></div><div class="col-md-9"><div class="grid-container">col-md-9</div></div></div><div class="row"><div class="col-md-2"><div class="grid-container">col-md-2</div></div><div class="col-md-10"><div class="grid-container">col-md-10</div></div></div><div class="row"><div class="col-md-1"><div class="grid-container">col-md-1</div></div><div class="col-md-11"><div class="grid-container">col-md-11</div></div></div><div class="row"><div class="col-md-2"><div class="grid-container">col-md-2</div></div><div class="col-md-3"><div class="grid-container">col-md-3</div></div><div class="col-md-4"><div class="grid-container">col-md-4</div></div><div class="col-md-2"><div class="grid-container">col-md-2</div></div><div class="col-md-1"><div class="grid-container">col-md-1</div></div></div></div></div></div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            page:{
                cur: 1,
                all: 78
            }
        }
    },
    created(){
    },
    methods:{
        alertDia(){
            this.$alert("这是个普通弹窗")
        },
        confirmDia(){
            this.$confirm("你确定？",()=>{
                this.$alert("你点击了确定");
            },()=>{
                this.$alert("你取消了");
            })
        },
        getagents(){
            this.$alert("当前第"+this.page.cur+"页")
        }
    }
}
</script>
