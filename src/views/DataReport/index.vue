<template>
    <div class="app-container cursorterBox">
      <el-row>
          <breadcrumb style="float:left;line-height:40px"></breadcrumb>
          <!-- 时间条件 -->
          <el-col :span="24">
              <div class="inline">
                  <span class="demonstration">下单时间：</span>
                  <el-date-picker
                    v-model="orderTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
              </div>
              <div class="inline"><el-button type="primary">查询</el-button></div>
              <div class="inline" style="float: right;margin-top:30px;margin-right:20px"><i class="el-icon-sold-out" style="color:green"></i><span class="operationBtn">导出Excel</span></div>
          </el-col>

      </el-row>

      <!-- 表格数据 -->
      <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column label="客户姓名" prop="passpost"  show-overflow-tooltip></el-table-column>
          <el-table-column prop="name" label="员工姓名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="phone" label="订单号"  show-overflow-tooltip></el-table-column>
          <el-table-column label="下单时间"  show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.registrationTime }}</template>
          </el-table-column>
          <el-table-column prop="userSerive" label="订单金额"  show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="购买内容"  show-overflow-tooltip></el-table-column>
          <el-table-column label="支付方式" prop="followUpTime" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
      Breadcrumb
  },
  data() {
    return {
      orderTime:'',

      // 列表数据
      tableData3: [{
          id:11,
          name: '胡彦斌',
          passpost: 'Hulk111',
          phone: '15721143333',
          QQ: '12345698745',
          registrationTime: '2017-10-01 12：00',
          userSerive: '辛元忠',
          status: '无人接听',
          followUpTime: '2017-10-01 12：00',
        },{
          id:22,
          name: '胡彦斌',
          passpost: 'Hulk111',
          phone: '15721143333',
          QQ: '12345698745',
          registrationTime: '2017-10-01 12：00',
          userSerive: '辛元忠',
          status: '无人接听',
          followUpTime: '2017-10-01 12：00',
        }],
    }
  },
  created() {
  },
  watch: {
  },
  methods: {
  }
}
</script>



