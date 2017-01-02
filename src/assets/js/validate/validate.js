import Vue from 'vue';
import VeeValidate,{ Validator } from 'assets/js/validate/veevalidate';
import messages from 'assets/js/validate/zh_CN';
Validator.updateDictionary({
	zh_CN: {
		messages
	}
});
const config = {
	errorBagName: 'errors', 
	locale: 'zh_CN',
	messages: null,
	strict: true
};

Vue.use(VeeValidate,config);

Validator.extend('mobile', {
	messages: {
		en:field => '请输入正确手机号',
	},
	validate: value => {
		return value.length == 11 && /^(1[34578]\d{9})$/.test(value)
	}
});
Validator.extend('isPwd', {
	messages: {
		en:field => '以字母开头，6-12之间的字符、数字和下划线',
	},
	validate: value => {
		return /^[a-zA-Z]\w{5,11}$/.test(value)
	}
});
Validator.extend('password', {
	messages: {
		en:field => '以字母或数字开头，6-12之间的字符、数字和下划线',
	},
	validate: value => {
		return /^[a-zA-Z0-9]\w{5,11}$/.test(value)
	}
});
Validator.extend('discount', {
	messages: {
		en:field => '只能输入0.1-10的最多包含一位小数的数字', //验证折扣
	},
	validate: value => {
		return /^(0\.([1-9]{1})|10(\.0{1,9})?)$/.test(value)
	}
});
Validator.extend('payment', {
	messages: {
		en:field => '最大金额为九千万,最多包含两位小数',  //验证金钱
	},
	validate: value => {
		return /^(\d{3,7}(\.\d{1,2}))|(\d{3,8})(\.0{1,9})?$/.test(value)
	}
});
Validator.extend('integer', {
	messages: {
		en:field => '只能输入大于0的整数',  //验证数字
	},
	validate: value => {
		return /^\+?[1-9][0-9]*$/.test(value)
	}
});