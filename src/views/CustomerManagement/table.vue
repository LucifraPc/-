<template>
    <div class="app-container">
      <el-row>
          <el-col :span="24">
              <breadcrumb style="float:left;line-height:40px"></breadcrumb>
              <el-checkbox-group v-model="type" style="float:right;margin-left:20px;margin-top:10px">
                  <el-checkbox label="搜全部" name="type" ></el-checkbox>
              </el-checkbox-group>
              <el-input class="search-input-box"
                placeholder="请输入内容"
                v-model="searcKey">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
          </el-col>
          <el-col :span="24">
              <div class="inline">
                  <span class="demonstration">注册时间：</span>
                  <el-date-picker
                    v-model="registrationTime"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
              </div>
              <div class="inline">
                  <span class="demonstration">最新跟进时间：</span>
                  <el-date-picker
                    v-model="followUpTime"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
              </div>
          </el-col>
      </el-row>

      <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="通行证账号"  show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.passpost }}</template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="phone" label="手机号码"  show-overflow-tooltip></el-table-column>
          <el-table-column prop="QQ" label="QQ号"  show-overflow-tooltip></el-table-column>
          <el-table-column label="注册时间"  show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.registrationTime }}</template>
          </el-table-column>
          <el-table-column prop="userSerive" label="客服专员"  show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="跟进结果"  show-overflow-tooltip></el-table-column>
          <el-table-column label="最新跟进时间"  show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.followUpTime }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span>删除</span><span>跟进</span>
            </template>
          </el-table-column>
      </el-table>


      <div class="selectionBox">
          <i class="el-icon-info" style="color:#1890FF"></i>
          <span style="color:#666;margin-left:5px">已选择 {{multipleSelection.length}} 项</span>
          <span>批量删除</span>
          <span>客户指派</span>
      </div>

      <div class="block" style="text-align: center;margin-top:20px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
      </div>

    </div>
</template>

<script>
import { getList } from '@/api/table'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      list: null,
      listLoading: true,
      searcKey:'',
      type:false,
      registrationTime:'',
      followUpTime:'',

      tableData3: [{
          name: '胡彦斌',
          passpost: 'Hulk111',
          phone: '15721143333',
          QQ: '12345698745',
          registrationTime: '2017-10-01 12：00',
          userSerive: '辛元忠',
          status: '无人接听',
          followUpTime: '2017-10-01 12：00',
        },{
          name: '胡彦斌',
          passpost: 'Hulk111',
          phone: '15721143333',
          QQ: '12345698745',
          registrationTime: '2017-10-01 12：00',
          userSerive: '辛元忠',
          status: '无人接听',
          followUpTime: '2017-10-01 12：00',
        }],
      multipleSelection: [],

      currentPage:1,
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    $route() {
      console.log(this.$route.name)
    },
    'type'(){
       console.log(this.type)
    }
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if(val.length>0){

      }
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>
<style>
  .search-input-box .el-input__prefix{
      left:initial;
      right:5px;
      cursor: pointer;
  }
  .el-input--prefix.search-input-box .el-input__inner{
      padding-left:10px!important;
  }
  .search-input-box{
      max-width:350px;
      float:right;
  }
  .inline{
    display:inline-block;
    font-size:14px;
    margin-left:30px;
    margin-top:15px;
    margin-bottom:15px;
  }
  .selectionBox{
    height:30px;
    line-height:30px;
    background:#E6F7FF;
    border: 1px solid #91D5FF;
    border-radius:4px;
    margin-top:40px;
    font-size:12px;
    box-sizing:border-box;
    padding:0px 20px;
    /*position:absolute;
    bottom:20px;
    box-sizing:border-box;
    width:calc(100% - 280px);*/
  }
  .selectionBox span{
    margin-right:30px;
    color:#1890FF;
  }
  /*html,body,#app{
      height: 100%;
      width:100%;
      position:relative;
  }*/
</style>
