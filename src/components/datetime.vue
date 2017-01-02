<template>
    <div >
        <input class="form-control input-sm w200" :id="date.startId || 'dateStart'" readonly placeholder="请选择开始时间">
        <input class="form-control input-sm w200" :id="date.endId || 'dateEnd'" readonly placeholder="请选择结束时间">
        <div class="btn-group" v-if="date.search">
            <button type="button" class="btn btn-white btn-sm active" @click="timeSearch('',$event)">全部</button>
            <button type="button" class="btn btn-white btn-sm" @click="timeSearch(1,$event)">今日</button>
            <button type="button" class="btn btn-white btn-sm" @click="timeSearch(2,$event)">昨日</button>
            <button type="button" class="btn btn-white btn-sm" @click="timeSearch(8,$event)">最近7天</button>
            <button type="button" class="btn btn-white btn-sm" @click="timeSearch(31,$event)">最近30天</button>
        </div>
        <span v-if="date.flag" class="c-rd ml10">请选择时间</span>
    </div>
</template>
<script>
import 'assets/js/datetime/datetime'
import moment from 'moment'

export default {
    name: 'datetime',
    props: ['date', 'start', 'end', 'disabled'],
    mounted() {
        let vm = this.date;

        this.datepicker(vm);

        vm.startId = vm.startId || 'dateStart';
        vm.endId = vm.endId || 'dateEnd';

        $("#" + vm.startId).on("change", function() {
            vm.startVal = this.value;
            if (vm.optional !== undefined && !vm.optional) {
                vm.flag = false;
            } else {
                vm.flag = this.value && vm.endVal ? false : vm.search ? false : true;
            }
        });
        $("#" + vm.endId).on("change", function() {
            vm.endVal = this.value;
            if (vm.optional !== undefined && !vm.optional) {
                vm.flag = false;
            } else {
                vm.flag = this.value && vm.startVal ? false : vm.search ? false : true;
            }
        });
    },
    watch: {
        start(v) {
            $("#" + this.date.startId).val(v);
            this.date.startVal = v;
            $('#' + this.date.endId).datetimepicker('setStartDate', this.date.startVal);
        },
        end(v) {
            $("#" + this.date.endId).val(v);
            this.date.endVal = v;
            $('#' + this.date.startId).datetimepicker('setEndDate', this.date.startVal);
        },
        disabled(v) {
            $("#" + this.date.startId + ", #" + this.date.endId).attr('disabled', v ? true : false);
        }
    },
    methods: {
        timeSearch(id, el) {
            let vm = this.date,
            startId = vm.startId,
            endId = vm.endId,
            start = '',
            end = '';

            $(el.currentTarget).addClass('active');
            $(el.currentTarget).siblings().removeClass('active');

            if (id == '') {
                start = $('#' + startId).val('');
                end = $('#' + endId).val('');
            } else if (id == '1') {
                start = $('#' + startId).val(moment().format('YYYY-M-D 00:00:00'));
                end = $('#' + endId).val(moment().format('YYYY-M-D HH:mm:ss'));
            } else {
                start = $('#' + startId).val(moment().subtract((id - 1), 'days').format('YYYY-M-D 00:00:00'));
                end = $('#' + endId).val(moment().subtract(1, 'days').format('YYYY-M-D 23:59:59'));
            }

            vm.flag = id !== '' ? false : vm.search ? false : true;
            vm.startVal = start;
            vm.endVal = end;
        },
        datepicker(ops) {
            let startId = this.date.startId || 'dateStart',
            endId = this.date.endId || 'dateEnd';

            $('#' + startId).datetimepicker({
                language: 'zh-CN',
                format: "yyyy-MM-dd hh:ii:ss",
                todayBtn: 1,
                startDate: ops.startDate,
                endDate: ops.startDate ? '' : new Date(),
                autoclose: true,
            }).on('changeDate', function(e) {
                $('#' + endId).datetimepicker('setStartDate', this.value);
            });

            $('#' + endId).datetimepicker({
                language: 'zh-CN',
                format: "yyyy-MM-dd hh:ii:ss",
                todayBtn: 1,
                autoclose: true,
                startDate: ops.startDate,
            }).on('changeDate', function(e) {
                $('#' + startId).datetimepicker('setEndDate', this.value);
            });
        }
    },
}
</script>