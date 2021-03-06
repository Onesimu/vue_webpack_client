import Vue from 'vue'
//import $ from 'jquery'
import * as Utils from '../utils'

Vue.filter('dateFormat', function (date) {
	return date ? Utils.getLocalTime(date) : '';
});
Vue.filter('dayFormat', function (date) {
	return date ? Utils.getLocalTime(date,true) : '';
});
Vue.filter('toFixed', function (data,num) {
	return data ? parseFloat(data).toFixed(num?num:2) : '0.00';
});
Vue.filter('parseNumber', function (v,num) {
  num = typeof(num)=='undefined'? 0 : num;
  return /^[+-]?\d+(\.\d+)?$/.test(v)? (num===0?parseInt(v):parseFloat(v).toFixed(num)) : Number(0).toFixed(num);
});
Vue.filter('MathFloor', function (v) {
  num = typeof(num)=='undefined'? 0 : num;
  // 小数点num位之后舍弃
  return /^[+-]?\d+(\.\d+)?$/.test(v)? (num===0?Math.floor(v):(v.toString().split('.')[0]+'.'+v.toString().split('.')[1].substr(0,2))) : 0;
});
Vue.filter('toString', function (data) {
  	return typeof a === 'object' ? JSON.stringify(data) : '';
});
Vue.filter('toPercent',function(data){
	return data ? ((parseFloat(data)*100).toFixed(2)+"%") : "0.00%";
});
Vue.filter('toRate',function(data,total){
	return (data && total) ? (parseFloat(data/total*100).toFixed(2)+"%") : "0.00%";
});
Vue.filter('toRMB',function(data){
	return data ? ('¥'+parseFloat(data).toFixed(2)) : '¥0.00';
});
Vue.filter('placeholderImg', function (data,format) {
  	var placeholderImg = '';
    switch(format){
        case 'product': placeholderImg = 'https://qncdn.qiakr.com/admin/placeholer_300x300.gif'; break;
        case 'avatar': placeholderImg = 'https://qncdn.qiakr.com/mall/default-photo.png'; break;
        default: placeholderImg ='https://qncdn.qiakr.com/admin/placeholer_300x300.gif'; break;
    }
    if(!data || data.length<5) return placeholderImg;
    return data;
});

$.fn.serializeObject=function(){var result={};var extend=function(i,element){var node=result[element.name];if('undefined'!==typeof node&&node!==null){if($.isArray(node)){node.push(element.value)}else{result[element.name]=[node,element.value]}}else{result[element.name]=element.value}};$.each(this.serializeArray(),extend);return result};
