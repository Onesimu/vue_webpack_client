<template>
    <div class="card-box">
        <table class="formTable">
            <tr>
                <td>
                    <label>选择时间：</label>
                </td>
                <td>
                    <datetime :date="date"></datetime>
                </td>
            </tr>
            <tr>
                <td>
                    <label>联系电话：</label>
                </td>
                <td>
                    <input v-validate data-rules="required|mobile" v-model="options.mobile" name="mobile" class="input-sm form-control w200" placeholder="请输入手机号" maxlength="11">
                </td>
            </tr>
            <tr>
                <td>
                    <label>联系地址：</label>
                </td>
                <td>
                    <select id="loc_province" class="select form-control input-sm w120"></select>
                    <input type="hidden" name="loc_province">
                    <select id="loc_city" class="select form-control input-sm  w120"></select>
                    <input type="hidden" name="loc_city">
                    <select id="loc_town" class="select form-control input-sm  w120"></select>
                    <input type="hidden" name="loc_town">
                    <span v-show="detailflag" class="c-rd ml10">请选择联系地址</span><br>
                </td>
            </tr>
            <tr>
                <td>
                    <label>选择时间1：</label>
                </td>
                <td>
                    <datetime :date="dates" :start="options.dateStart" :end="options.dateEnd" :disabled="options.dateStart"></datetime>
                </td>
            </tr>
            <tr>
                <td>
                    <label>选择时间2：</label>
                </td>
                <td>
                    <datetime :date="datess"></datetime>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <button class="btn btn-success btn-lg" @click="validateForm" type="button">确认</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import datetime from 'components/datetime'

import 'assets/js/validate/validate';
import 'assets/js/locationNew'
import * as Utils from 'utils'

export default {
    components: {
        datetime
    },
    data() {
        return {
            detailflag: false,
            adressDetail: null,
            detail: '',
            options: {
                dateStart: '',
                dateEnd: '',
                mobile: '',
            },
            page: {
                cur: 1,
                all: 1
            },
            date: {
                search: true,
            },
            dates: {
                startId: 'aaaa',
                endId: 'bbbb',
                flag: false,
            },
            datess: {
                startId: 'aaaaa',
                endId: 'bbbbb',
                optional: false,
            }
        }
    },
    mounted() {
        this.adressDetail = new Location({
            domsId: {
                province: "loc_province",
                city: "loc_city",
                town: "loc_town",
            },
        });

        let _this = this;
        $("#loc_town").on("change", function(v) {
            _this.detail = this.value;
        })
        _this.getops();
    },
    methods: {
        getops() {
            let opsops = {
                dateStart: '1481959902000',
                dateEnd: '1481969902000',
                mobile: '13400000000',
            }
            opsops.dateStart = Utils.getLocalTime(opsops.dateStart);
            opsops.dateEnd = Utils.getLocalTime(opsops.dateEnd);
            this.options = opsops;
        },
        validateForm() {
            let check = this.$validator.validateAll({
                mobile: this.options.mobile,
            }),
            ops = this.options,
            dates = this.dates;

            this.detailflag = this.detail ? false : true;
            dates.flag = dates.startVal && dates.endVal ? false : true;

            if (check && !this.detailflag && !dates.flag) {
                ops.dateStarts = Utils.getUnixTime(dates.startVal);
                ops.dateEnds = Utils.getUnixTime(dates.endVal);
                let newops = $.extend(ops, this.adressDetail.getValue());

                console.log(newops)
            }
        }
    },
    watch: {
        detail(v) {
            if (v) {
                this.detailflag = false;
            } else {
                this.detailflag = true;
            }
        },
    },
};
</script>
