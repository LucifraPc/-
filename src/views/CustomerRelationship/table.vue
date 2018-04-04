<template>
    <div class="app-container cursorterBox">
      <el-row class="background-FFF padding-10">
          <!-- 搜索 -->
          <el-col :span="24">
              <bread-crumb style="float:left;line-height:40px"></bread-crumb>
              <el-input class="search-input-box"
                placeholder="请输入通行证/姓名/手机号/QQ号搜索"
                v-model="searcKey">
                <i slot="prefix" class="el-input__icon el-icon-circle-close" v-show="searcKey" @click="searcKey=''"></i>
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
          </el-col>
      </el-row>
      <el-row class="background-FFF height-100 padding-20 margin-top-15">
          <!-- 表格数据 -->
          <el-table
              ref="multipleTable"
              :data="tableData3"
              tooltip-effect="dark"
              style="width: 100%"

              @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column label="通行证账号"  show-overflow-tooltip align="center">
                <template slot-scope="scope">{{ scope.row.passpost }}</template>
              </el-table-column>
              <el-table-column prop="name" label="客户姓名" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column label="注册时间"  show-overflow-tooltip align="center">
                <template slot-scope="scope">{{ scope.row.registrationTime }}</template>
              </el-table-column>
              <el-table-column label="入海时间"  show-overflow-tooltip align="center">
                <template slot-scope="scope">{{ scope.row.registrationTime }}</template>
              </el-table-column>
              <el-table-column prop="userSerive" label="使用云功能次数" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column prop="status" label="使用BIM应用次数" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column prop="userSerive" label="有效云套餐(个人/企业)" width="200" align="center"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="status" label="有效BIM套餐(个人/企业)" width="200" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column label="最新跟进时间"  show-overflow-tooltip align="center">
                <template slot-scope="scope">{{ scope.row.followUpTime }}</template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <span class="operationBtn" @click="claimCustomerBtn(scope.row.id)">认领</span><span class="operationBtn" @click="viewCustomerBtn(scope.row.id)">查看</span>
                </template>
              </el-table-column>
          </el-table>

          <!-- 全选操作之后显示 -->
          <div class="selectionBox" v-show="multipleSelection.length>0">
              <i class="el-icon-info" style="color:#1890FF"></i>
              <span style="color:#666;margin-left:5px">已选择 {{multipleSelection.length}} 项</span>
              <span class="operationBtn" @click="claimAllCustomerBtn">批量认领</span>
          </div>

          <!-- 分页 -->
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
      </el-row>

      <!-- 详情弹窗 -->
      <transition name="slide-fade">
          <div id="slide-window" v-if="showDetialBox">
              <i class="el-icon-close" @click="showDetialBox=!showDetialBox"></i>
          </div>
      </transition>
      
    </div>
</template>

<script>
export default {
  data() {
    return {
      searcKey:'',//搜索值

      showDetialBox:false,

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

      multipleSelection: [], //选中数据

      currentPage:1,
    }
  },
  created() {
  },
  watch: {
    // 检测路由切换页面
    $route() {
      console.log(this.$route.name)
      this.registrationTime='';
      this.followUpTime='';
      this.ClinchAdealTime='';
      this.expireTime='';
      this.searcKey='';
      this.searchAll=false;
      this.multipleSelection=[];
      this.currentPage=1;
      this.showDetialBox=false;
    },
    // 检测搜索全部操作
    'searchAll'(){
       console.log(this.searchAll)
    }
  },
  methods: {

    // 列表选择操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页操作
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 单个认领操作
    claimCustomerBtn(id){
      console.log(id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 单个跟进操作
    viewCustomerBtn(id){
      console.log(id);
      this.showDetialBox=!this.showDetialBox;
      // $("#slide-window").animate({width:'600px',opacity:'1'});
      // $("#slide-window").animate({width:'0px',opacity:'0'});
    },
    // 批量认领操作
    claimAllCustomerBtn(){
      console.log(this.multipleSelection)
    },
  }
}
</script>
