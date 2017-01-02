<template>
	<select>
		<slot></slot>
	</select>
</template>
<script>
	import select2 from 'assets/js/select2'
	export default {
		name : 'select2',
        props: ['options', 'value','search'],
	  	mounted: function () {
		    var vm = this;
		    $(this.$el).val(this.value).select2({ data: this.options, minimumResultsForSearch:(this.search=='0' ? -1 : 0)}).on('change', function () {
		        vm.$emit('input', this.value);
		    });
		},
		watch: {
		    value: function (v) {
		    	$(this.$el).val(v).trigger('change');
		    },
		    options: function (options) {
		    	var vm = this;
		      	$(this.$el).empty().select2({ data: vm.options,minimumResultsForSearch:(vm.search=='0' ? -1 : 0)});
		    	if(vm.value){
		    		$(this.$el).select2('val',vm.value);
		    	}
		    	
		    }
		},
		destroyed: function () {
		    $(this.$el).off().select2('destroy')
		}
    }
</script>