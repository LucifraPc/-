<template>
    <div class="app-container cursorterBox">
      <el-row style="margin-bottom:15px;" class="background-FFF padding-10">
          <!-- 搜索 -->
          <el-col :span="24">
              <bread-crumb style="float:left;line-height:40px"></bread-crumb>
              <el-checkbox-group v-model="searchAll" style="float:right;margin-left:20px;margin-top:10px">
                  <el-checkbox label="搜全部" name="searchAll" ></el-checkbox>
              </el-checkbox-group>
              <el-input class="search-input-box"
                placeholder="请输入通行证/姓名/手机号/QQ号搜索"
                v-model="searcKey">
                <i slot="prefix" class="el-input__icon el-icon-circle-close" v-show="searcKey" @click="searcKey=''"></i>
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
          </el-col>
      </el-row>
      <el-row class="background-FFF height-100 padding-20">
          <!-- 时间条件 -->
          <el-col :span="24">
              <div class="inline">
                  <span class="demonstration">注册时间：</span>
                  <el-date-picker
                    v-model="registrationTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
              </div>
              <div class="inline">
                  <span class="demonstration">最新跟进时间：</span>
                  <el-date-picker
                    v-model="followUpTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
              </div>
          </el-col>

          <!-- 成交客户  即将到期  到期未续费显示此时间 -->
          <el-col :span="24" v-if="$route.name=='成交客户' || $route.name=='即将到期客户' || $route.name=='到期未续费' ">
              <div class="inline">
                  <span class="demonstration">成交时间：</span>
                  <el-date-picker
                    v-model="ClinchAdealTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
              </div>
              <div class="inline">
                  <span class="demonstration">到期时间：</span>
                  <el-date-picker
                    v-model="expireTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
              </div>
          </el-col>
      

          <!-- 表格数据 -->
          <el-table
              ref="multipleTable"
              :data="tableData3"
              tooltip-effect="dark"
              @filter-change="filterChange"
              style="width: 100%;padding-top:10px"
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
              <el-table-column
                  show-overflow-tooltip
                  prop="userSerive"
                  label="客服专员"
                  width="100"
                  column-key="userSerive"
                  :filters="followResultUser">
                  <template slot-scope="scope">
                    <el-tag close-transition>{{scope.row.userSerive}}</el-tag>
                  </template>
              </el-table-column>
              <el-table-column
                  prop="tag"
                  label="跟进结果"
                  width="100"
                  column-key="tag"
                  :filters="followResult">
                  <template slot-scope="scope">
                    <el-tag close-transition>{{scope.row.tag}}</el-tag>
                  </template>
              </el-table-column>
              <el-table-column label="最新跟进时间"  show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.followUpTime }}</template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                    <span class="operationBtn" @click="delCustomerBtn(scope.row.id)">删除</span><span class="operationBtn" @click="followCustomerBtn(scope.row.id)">跟进</span>
                </template>
              </el-table-column>
          </el-table>
          

          <!-- 全选操作之后显示 -->
          <div class="selectionBox" v-show="multipleSelection.length>0">
              <i class="el-icon-info" style="color:#1890FF"></i>
              <span style="color:#666;margin-left:5px">已选择 {{multipleSelection.length}} 项</span>
              <span class="operationBtn" @click="delAllCustomerBtn">批量删除</span>
              <span class="operationBtn" @click="assignedAllCustomerBtn();dialogVisible=true;">客户指派</span>
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
      <!-- 跟进详情弹窗 -->
      <slide-view :showDetialBox="showDetialBox" v-on:showDetialBoxConfalse="showDetialBoxConfalse"></slide-view>
      <!-- 批量指派弹窗 -->
      <el-dialog
          title="客户指派"
          :visible.sync="dialogVisible"
          class="dialog770">
          <div>
              <h4 style="margin:0px;">部分指派：</h4>
              <p style="padding-left:40px;margin:10px 0px;">
                  已选择 {{multipleSelection.length}} 个客户，所属 {{assignedCount.length}} 个成员 <span style="color:#1890FF" v-for="item in assignedCount">{{item}} </span>
                  <el-select v-model="assignedOptionsValue" placeholder="请选择指派给谁">
                      <el-option
                        v-for="item in assignedOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>
              </p>
              <el-button type="primary">主要按钮</el-button>
          </div>
          <div>
              <h4 style="margin:0px;">全部指派：</h4>
              <p style="padding-left:40px;margin:10px 0px;">
                  指派
                  <el-select v-model="fromOptionsValue" placeholder="请选择转走谁的">
                    <el-option
                      v-for="item in fromOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select> 的全部 {{fromOptionsCount}} 个客户
                  <el-select v-model="gotoOptionsValue" placeholder="请选择给谁">
                    <el-option
                      v-for="item in gotoOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select> 
              </p>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
      </el-dialog>
      
    </div>
</template>

<script>
import slideView from '../../components/slideView/slideView'
export default {
  components: {
    slideView
  },
  data() {
    return {

      searcKey:'',//搜索值
      searchAll:false,//搜索全部
      registrationTime:'',//注册时间
      followUpTime:'',//最新跟进时间
      ClinchAdealTime:'',//成交时间
      expireTime:'',//到期时间

      showDetialBox:false,

      // 列表数据
      tableData3: [{
          id:11,
          name: '胡彦斌1',
          passpost: 'Hulk111',
          phone: '15721143333',
          QQ: '12345698745',
          registrationTime: '2017-10-01 12：00',
          userSerive: '辛元忠',
          status: '无人接听',
          followUpTime: '2017-10-01 12：00',
          tag: '关机'
        },{
          id:11,
          name: '胡彦斌1',
          passpost: 'Hulk111',
          phone: '15721143333',
          QQ: '12345698745',
          registrationTime: '2017-10-01 12：00',
          userSerive: '辛元忠',
          status: '无人接听',
          followUpTime: '2017-10-01 12：00',
          tag: '关机'
        },{
          id:22,
          name: '胡彦斌2',
          passpost: 'Hulk111',
          phone: '15721143333',
          QQ: '12345698745',
          registrationTime: '2017-10-01 12：00',
          userSerive: '裴奇致',
          status: '无人接听',
          followUpTime: '2017-10-01 12：00',
          tag: '高意向'
        }],


      followResult:[{ text: '可跟进', value: '可跟进' },
                    { text: '高意向', value: '高意向' }, 
                    { text: '关机', value: '关机' },
                    { text: '无法接通', value: '无法接通' }, 
                    { text: '已成交', value: '已成交' },
                    { text: '停机', value: '停机' }, 
                    { text: '空号', value: '空号' }, 
                    { text: '错号', value: '错号' },
                    { text: '未拨打', value: '未拨打' }, 
                    { text: '用其他软件', value: '用其他软件' }
                  ],//跟进结果
    followResultUser:[
                    { text: '辛元忠', value: '辛元忠' },
                    { text: '裴奇致', value: '裴奇致' }, 
                    { text: '纪乐容', value: '纪乐容' },
                    { text: '赵国安', value: '赵国安' }, 
                    { text: '郭博超', value: '郭博超' },
                    { text: '明宏阔', value: '明宏阔' }, 
                    { text: '封安民', value: '封安民' }, 
                  ],//客服专员

      multipleSelection: [], //选中数据

      currentPage:1,

      dialogVisible:false,//指派弹窗控制器
      assignedCount:[],//所属几个成员
      assignedOptions:[],//部分指派给谁
      fromOptions:[],//全部转走谁的
      gotoOptions:[],//全部转给谁
      assignedOptionsValue:null,//部分指派给谁
      fromOptionsValue:null,//全部转走谁的
      gotoOptionsValue:null,//全部转给谁
      fromOptionsCount:null,//全部转走谁的客户数


      userSerive:[],//客服专员筛选
      tag:[],//跟进结果筛选



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
    // 去重
    setArrRep(arr){
      var obj = {}
      for(var i  in arr){
         obj[arr[i]] = true;
      }
      console.log(obj);
    },
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
    // 单个删除操作
    delCustomerBtn(id){
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
    followCustomerBtn(id){
      // console.log(id);
      this.showDetialBox=!this.showDetialBox;
    },
    // 单个跟进组件传值
    showDetialBoxConfalse(value){
      console.log(value)
      this.showDetialBox=value;
    },
    // 批量删除操作
    delAllCustomerBtn(){
      // console.log(this.multipleSelection)
     
    },
    // 批量指派操作
    assignedAllCustomerBtn(){
      // console.log(this.multipleSelection)
      let vm = this ;
      vm.multipleSelection.forEach((item,index,arr) => {
          vm.assignedCount.push(item.userSerive)
      })
      vm.assignedCount=Array.from(new Set(vm.assignedCount));
    },
    filterChange(filters){
      if(filters.userSerive){
        this.userSerive=filters.userSerive;
      }
      if(filters.tag){
        this.tag=filters.tag;
      }
      console.log(this.userSerive)
      console.log(this.tag)
    }
  }
}
</script>
<style>
  .cursorter-table.el-table::before{
    height:0px;
  }
  .cursorter-table.el-table thead>tr>th{
    border-bottom: 1px solid #ebeef5;
  }
</style>
