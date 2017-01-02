<style>
  .spinner{position: static;}
</style>
<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card-box">
          <div class="mb30 ovh">
            <div class="form-inline col-md-9">
              商品标签：<select2 :options="groupList" :search="0" v-model="search.groupId" class="form-control input-sm w200"></select2>
              <input class="form-control input-sm" v-model="search.fuzzyName" placeholder="输入款号/条码/名称">
              <button type="button" class="btn btn-primary" @click="getStockList()">筛选</button>
            </div>
            <div class="form-inline col-md-3 tr">
              <a href="#/create" class="btn btn-default mr20">添加商品</a>
            </div>
          </div>

          <table class="table table-hover">
            <thead>
              <tr>
                <th>商品名称</th>
                <th>市场价</th>
                <th>款号</th>
                <th>创建时间</th>
                <th class="tc">操作</th>
              </tr>
            </thead>
            <tbody v-if="loading">
              <Loading></Loading>
            </tbody>
            <tbody v-else>
              <tr v-if="stockLst.length>0" v-for="(item, index) in stockLst">
                <td>
                  <a class="img"><img :src="item.productSupplier.picUrl"></a>
                  <a class="name">{{item.productSupplier.name}}</a>
                </td>
                <td>
                  <span v-if='item.minSkuPrice==item.maxSkuPrice'>{{item.minSkuPrice | toRMB}}</span>
                  <span v-else>{{item.minSkuPrice | toRMB}} ~ {{item.maxSkuPrice | toRMB}}</span>
                </td>
                <td>{{item.productSupplier.productCode}}</td>
                <td>{{item.productSupplier.gmtCreate | dateFormat}}</td>
                <td>
                  <a :href="'#/create?stockid='+item.stock.id">编辑商品</a>
                </td>
              </tr>
              <tr v-if="stockLst.length==0">
                <td colspan="99" class="text-center">暂无数据</td>
              </tr>
            </tbody>
          </table>
          <pagination :page="page" @btn-click="getList"></pagination> 
        </div>
      </div>
    </div>
</template>

<script>
import Loading from 'components/c-Loading'
export default {
  data(){
    return {
      stockLst:[],
      loading:true,
      groupList:[],
      search:{
        index:0,
        length:"20",
        supplierId:localStorage.supplierId,
        fuzzyName:"",
        groupId:""
      },
      page:{
        cur:1,
        all:1
      }
    }
  },
  created(){
  },
  components: {
    Loading
  },
  methods:{
    getList(){
      
    }
  }
}
</script>
