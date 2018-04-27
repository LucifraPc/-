/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var basePath = global.baseHost;
var mid = window.parent.miningId
$(document).ready(function () {
  var condition = {
    "product": "登录产品",
    "userRegisterTime": "用户注册时间",
    "useArea": "登录地区",
    "buyType": "个人套餐购买情况",
    "functionUseTimes": "功能使用情况",
    "loginCount": "账号登陆次数",
    "onlineTime": "账号在线时长"
  };
  //导入原挖掘条件

  var showCondition = function () {
    var k = $("#tr_count").val();
    $.ajax({
      url: basePath + "rest/dataming/condition/" + mid,
      datatype: 'json',
      type: 'get',
      success: function (res) {
        var result = res.data
        for (var i = 0; i < result.length; i++) {
          //功能使用日期
          if (result[i].ct == 1) {

            var addcont = "<input class='Wdate startDate' value='" + result[i].dc1.st + "' type='text' size='12' onClick='WdatePicker({errDealMode:1,readOnly:true,isShowClear:false})'> ~ " +
              "<input   type='text' size='12' value='" + result[i].dc1.et + "' class='Wdate endDate' onClick='WdatePicker({isShowClear:false,readOnly:true})'> ";
            addLeft("useTime", k, condition, addcont);
            k++;
          }

          //用户注册时间
          if (result[i].ct == 2) {

            var addcont = "<select class='userRegister' onchange='usrChange(this," + k + ")'>";
            if (result[i].dc2.type == 2) {
              addcont += "<option value='2' selected='select'>等于</option>";
            } else {
              addcont += "<option value='2' >等于</option>";
            }
            if (result[i].dc2.type == 1) {
              addcont += "<option value='1' selected='select'>小于</option>";
            } else {
              addcont += "<option value='1' >小于</option>";
            }
            if (result[i].dc2.type == 3) {
              addcont += "<option value='3' selected='select'>大于</option>";
            } else {
              addcont += "<option value='3' >大于</option>";
            }
            if (result[i].dc2.type == 4) {
              addcont += "<option value='4' selected='select'>范围</option>";
            } else {
              addcont += "<option value='4' >范围</option>";
            }
            addcont += "</select>"
            if (result[i].dc2.type == 4) {
              addcont += "<span><input class='Wdate register_startDate' type='text' value='" + result[i].dc2.st + "' size='12' id='sd" + k + "' onClick=WdatePicker({errDealMode:1,readOnly:true,isShowClear:false,maxDate:'#F{$dp.$D(ed" + k + ")||\\'%y-%M-%d\\'}'})> ~" +
                "<input  class='Wdate register_endDate' type='text' value='" + result[i].dc2.et + "'  size='12' id='ed" + k + "' onClick=WdatePicker({isShowClear:false,readOnly:true,errDealMode:4,minDate:'#F{$dp.$D(sd" + k + ")}',maxDate:'%y-%M-%d'})></span> ";
            } else {
              addcont += "<span><input type='text' class='registerday' maxlength='9' size='6' value='" + result[i].dc2.days + "' />天</span>";
            }
            addLeft("userRegisterTime", k, condition, addcont);
            k++;
          }

          //登录地区
          if (result[i].ct == 3) {
            var pid = result[i].dc3;
            var st = result[i].st;
            var et = result[i].et;
            var url = basePath + "rest/common/area";
            areaLists(url, pid, k, condition, st, et);
            k++;

          }

          //登录产品
          if (result[i].ct == 4) {
            var addcont = "时间范围：<input  value='" + result[i].st + "' id='sd" + k + "' class='Wdate startDate'  type='text' size='12' onClick=WdatePicker({errDealMode:1,readOnly:true,isShowClear:false,maxDate:'#F{$dp.$D(ed" + k + ")||\\'%y-%M-%d\\'}'})> ~ " +
              "<input   type='text' size='12' value='" + result[i].et + "' id='ed" + k + "' class='Wdate endDate' onClick=WdatePicker({isShowClear:false,readOnly:true,minDate:'#F{$dp.$D(sd" + k + ")}',maxDate:'%y-%M-%d'})> <br/>";
            addcont += "<input type='checkbox' id='pdt_checkbox0' name='pdt_checkbox" + k + "' onclick='checkAll(this.name)' value=''>全部"
            var pid = result[i].dc4;

            var a = 0,
              b = 0,
              c = 0;
            for (var j = 0; j < pid.length; j++) {
              if (pid[j] == 3) {
                a = 1;
                addcont += "&nbsp;&nbsp;<input type='checkbox' name='pdt_checkbox" + k + "' value='3' checked='chedked'>土建";
              }
            }
            if (a == 0) {
              addcont += "&nbsp;&nbsp;<input type='checkbox' name='pdt_checkbox" + k + "' value='3'>土建";
            }
            for (var j = 0; j < pid.length; j++) {
              if (pid[j] == 2) {
                b = 1;
                addcont += "&nbsp;&nbsp;<input type='checkbox' name='pdt_checkbox" + k + "' value='2' checked='chedked'>钢筋";
              }
            }
            if (b == 0) {
              addcont += "&nbsp;&nbsp;<input type='checkbox' name='pdt_checkbox" + k + "' value='2'>钢筋";
            }
            for (var j = 0; j < pid.length; j++) {
              if (pid[j] == 5) {
                c = 1;
                addcont += "&nbsp;&nbsp;<input type='checkbox' name='pdt_checkbox" + k + "' value='5' checked='chedked'>安装";
              }
            }
            if (c == 0) {
              addcont += "&nbsp;&nbsp;<input type='checkbox' name='pdt_checkbox" + k + "' value='5'>安装";
            }
            addLeft("product", k, condition, addcont);
            k++;
          }

          //个人套餐购买情况
          if (result[i].ct == 5) {
            var addcont = "<select class='isbuy' onchange='buyChange(this," + k + ")'  style='float:left'>";

            if (result[i].dc5.bt == 1) {
              addcont += "<option value='1' selected='selected'>已拥有</option>";
            } else {
              addcont += "<option value='1' >已拥有</option>";
            }
            if (result[i].dc5.bt == 2) {
              addcont += "<option value='2' selected='selected'>未购买过</option>";
            } else {
              addcont += "<option value='2' >未购买过</option>";
            }
            if (result[i].dc5.bt == 3) {
              addcont += "<option value='3' selected='selected'>N天内到期</option>";
            } else {
              addcont += "<option value='3' >N天内到期</option>";
            }
            if (result[i].dc5.bt == 4) {
              addcont += "<option value='4' selected='selected'>过期N天内未续费</option>";
            } else {
              addcont += "<option value='4' >过期N天内未续费</option>";
            }
            addcont += "</select><div style='float:left;width:650px;line-height:40px'>";

            var a = "",
              b = "",
              c = "",
              d = "",
              e = "",
              f = "";
            var proInfo = result[i].dc5.param;
            for (var h = 0; h < proInfo.length; h++) {
              if (proInfo[h].pt == 2 && proInfo[h].pid == 3) {
                a = {
                  name: "土建云功能",
                  day: proInfo[h].day
                };
              }
              if (proInfo[h].pt == 2 && proInfo[h].pid == 2) {
                b = {
                  name: "钢筋云功能",
                  day: proInfo[h].day
                };
              }
              if (proInfo[h].pt == 2 && proInfo[h].pid == 5) {
                c = {
                  name: "安装云功能",
                  day: proInfo[h].day
                };
              }
              if (proInfo[h].pt == 12 && proInfo[h].pid == 3) {
                d = {
                  name: "土建BIM",
                  day: proInfo[h].day
                };
              }
              if (proInfo[h].pt == 12 && proInfo[h].pid == 2) {
                e = {
                  name: "钢筋BIM",
                  day: proInfo[h].day
                };
              }
              if (proInfo[h].pt == 12 && proInfo[h].pid == 5) {
                f = {
                  name: "安装BIM",
                  day: proInfo[h].day
                };
              }
            }
            var proInfos = [a, b, c, d, e, f];
            var isAll = true;
            for (var g = 0; g < proInfos.length; g++) {
              if (proInfos[0].day != proInfos[g].day) {
                isAll = false;
                break;
              }
            }
            if (isAll && proInfos.length == 6 && proInfos[0].day) {
              proInfos = "";
            }
            var buytype = ["全部", "土建云功能", "钢筋云功能", "安装云功能", "土建BIM", "钢筋BIM", "安装BIM"];
            for (var j = 0; j < buytype.length; j++) {
              if (j == 0) {
                if ((result[i].dc5.bt == 3 || result[i].dc5.bt == 4) && proInfos == "") {
                  addcont += "<div style='width:150px;float:left'><input type='checkbox' checked='checked' name='btp_checkbox" + k + "' onclick='unfunCheck(this.name," + k + ")' value='" + j + "'>" + buytype[j] +
                    "&nbsp;&nbsp;(N=<input type='text' value='" + proInfo[0].day + "' maxlength='9' class='nbuy' size='2' />)</div>";
                } else if (result[i].dc5.bt == 3 || result[i].dc5.bt == 4) {
                  addcont += "<div style='width:150px;float:left'><input type='checkbox' name='btp_checkbox" + k + "' onclick='unfunCheck(this.name," + k + ")' value='" + j + "'>" + buytype[j] +
                    "&nbsp;&nbsp;(N=<input type='text' value='' maxlength='9' class='nbuy' size='2' />)</div>";
                } else {
                  addcont += "<input type='checkbox' name='btp_checkbox" + k + "' onclick='checkAll(this.name)' value='" + j + "'>" + buytype[j] + "&nbsp;&nbsp;";
                }
              } else {
                var t = 0;
                for (var m = 0; m < proInfos.length; m++) {
                  if (proInfos[m].name == buytype[j]) {
                    if (result[i].dc5.bt == 3 || result[i].dc5.bt == 4) {
                      addcont += "<div style='width:165px;float:right'><input type='checkbox' name='btp_checkbox" + k + "' checked='checked' onclick='funCheck(this.name," + (j - 1) + "," + k + ")' value='" + j + "'>" + buytype[j] +
                        "&nbsp;(N=<input type='text' maxlength='9' value='" + proInfos[m].day + "' class='nbuy' size='2' />)</div>";
                    } else {
                      addcont += "&nbsp;<input type='checkbox' checked='checked' name='btp_checkbox" + k + "' value='" + j + "'>" + buytype[j];
                    }
                    t = 1;
                  }
                }
                if (t == 0) {
                  if (result[i].dc5.bt == 3 || result[i].dc5.bt == 4) {
                    addcont += "<div style='width:165px;float:right'><input type='checkbox' name='btp_checkbox" + k + "' onclick='funCheck(this.name," + (j - 1) + "," + k + ")' value='" + j + "'>" + buytype[j] +
                      "&nbsp;(N=<input type='text' maxlength='9'  class='nbuy' size='2' />)</div>";
                  } else {
                    addcont += "&nbsp;<input type='checkbox'  name='btp_checkbox" + k + "' value='" + j + "'>" + buytype[j];
                  }
                }
              }
            }
            addcont += "</div>";
            addLeft("buyType", k, condition, addcont);
            k++;
          }

          //功能使用情况
          if (result[i].ct == 6) {
            debugger
            var funUse = result[i].dc6;
            var url = basePath + "rest/dataming/functionType";
            funList(url, funUse, k, condition);
            k++;

          }

          //活跃度
          if (result[i].ct == 7) {
            var ac = result[i].dc7.ia;
            var url = basePath + "/essencesale/queryActiveUserParam.htm";
            acList(url, ac, k, condition);
            k++;
          }

          //账号登陆次数
          if (result[i].ct == 8) {

            var addcont = "时间范围：<input  value='" + result[i].dc8.st + "' id='sd" + k + "' class='Wdate startDate'  type='text' size='12' onClick=WdatePicker({errDealMode:1,readOnly:true,isShowClear:false,maxDate:'#F{$dp.$D(ed" + k + ")||\\'%y-%M-%d\\'}'})> ~ " +
              "<input   type='text' size='12' value='" + result[i].dc8.et + "' id='ed" + k + "' class='Wdate endDate' onClick=WdatePicker({isShowClear:false,readOnly:true,minDate:'#F{$dp.$D(sd" + k + ")}',maxDate:'%y-%M-%d'})>" +
              "&nbsp;&nbsp;账号登录次数：平均" +
              "&nbsp;<select class='lgType'>";
            if (result[i].dc8.type == 2) {
              addcont += "<option value='2' selected='select'>=</option>";
            } else {
              addcont += "<option value='2' >=</option>";
            }
            if (result[i].dc8.type == 1) {
              addcont += "<option value='1' selected='select'><</option>";
            } else {
              addcont += "<option value='1' ><</option>";
            }
            if (result[i].dc8.type == 3) {
              addcont += "<option value='3' selected='select'>></option>";
            } else {
              addcont += "<option value='3' >></option>";
            }
            addcont += "</select>&nbsp;<span><input type='text' maxlength='9' class='lgCount' value='" + result[i].dc8.count + "' size='6' />次/天</span>";
            addLeft("loginCount", k, condition, addcont);
            k++;
          }

          //账号在线时长
          if (result[i].ct == 9) {

            var addcont = "时间范围：<input  value='" + result[i].dc9.st + "' id='sd" + k + "' class='Wdate startDate'  type='text' size='12' onClick=WdatePicker({errDealMode:1,readOnly:true,isShowClear:false,maxDate:'#F{$dp.$D(ed" + k + ")||\\'%y-%M-%d\\'}'})> ~ " +
              "<input   type='text' size='12' value='" + result[i].dc9.et + "' id='ed" + k + "' class='Wdate endDate' onClick=WdatePicker({isShowClear:false,readOnly:true,minDate:'#F{$dp.$D(sd" + k + ")}',maxDate:'%y-%M-%d'})>" +
              "&nbsp;&nbsp;账号在线时长：平均" +
              "&nbsp;<select class='onlineType'>";
            if (result[i].dc9.type == 2) {
              addcont += "<option value='2' selected='select'>=</option>";
            } else {
              addcont += "<option value='2' >=</option>";
            }
            if (result[i].dc9.type == 1) {
              addcont += "<option value='1' selected='select'><</option>";
            } else {
              addcont += "<option value='1' ><</option>";
            }
            if (result[i].dc9.type == 3) {
              addcont += "<option value='3' selected='select'>></option>";
            } else {
              addcont += "<option value='3' >></option>";
            }
            addcont += "</select>&nbsp;<span><input type='text' maxlength='9' class='onlineHour' value='" + result[i].dc9.hour + "' size='6' />小时/天</span>";
            addLeft("onlineTime", k, condition, addcont);
            k++;
          }

          $("#tr_count").val(k);
        }
      }
    });
  }

  showCondition();



});

//增加左侧选择条件
var addLeft = function addLeft(ct, k, condition, addcont) {
  var newTr = "<tr style='line-height: 20px;padding:20px;' class='ctr' id='ctr" + k + "'>" +
    "<td width='14%' style='background: white;'>" +
    "<select class='condition' style='margin: 0px 10px; width: calc(100% - 20px);' id='condition_id" + k + "' onchange='cdnChange(this," + k + ")'>";


  for (var cn in condition) {
    if (ct == cn) {
      newTr += "<option value='" + cn + "' selected='selected' >" + condition[cn] + "</option>";
    } else {
      newTr += "<option value='" + cn + "' >" + condition[cn] + "</option>";
    }
  }
  newTr += "</select>" +
    "</td>" +
    "<td width='80%' style='background: white;text-align: left;padding-left:15px!important;'>" + addcont +
    "</td>" +
    "<td width='6%'>" +
    "<input type='button' onclick='cdndelete(this)' class='fdd el-button el-button--primary' value='删除'/>" +
    "</td> </tr>";
  $("#cenditionList").append(newTr);
  $(".fdd").show();
};

var in_array = function in_array(search, array) {
  for (var i in array) {
    if (array[i] == search) {
      return true;
    }
  }
  return false;
};

var areaLists = function areaLists(url, pid, k, condition, st, et) {
  $.ajax({
    url: url,
    datatype: 'json',
    type: 'get',
    success: function (result) {
      proInfo = result.data;
      var addcont = "";
      var addcont = "时间范围：<input  value='" + st + "' id='sd" + k + "' class='Wdate startDate'  type='text' size='12' onClick=WdatePicker({errDealMode:1,readOnly:true,isShowClear:false,maxDate:'#F{$dp.$D(ed" + k + ")||\\'%y-%M-%d\\'}'})> ~ " +
        "<input   type='text' size='12' value='" + et + "' id='ed" + k + "' class='Wdate endDate' onClick=WdatePicker({isShowClear:false,readOnly:true,minDate:'#F{$dp.$D(sd" + k + ")}',maxDate:'%y-%M-%d'})> <br/>";
      for (var h = 0; h < proInfo.length; h++) {
        if (h == 0) {
          addcont += "<div style='float:left;width:71px;'><input  type='checkbox' value='" + proInfo[h].provinceId + "' name='pro_checkbox" + k + "' onclick='checkAll(this.name)'>" + proInfo[h].province + "</div>";
        } else {
          var t = 0;
          for (var j = 0; j < pid.length; j++) {
            if (proInfo[h].provinceId == pid[j]) {
              addcont += "<div style='float:left;width:71px;'><input type='checkbox' value='" + proInfo[h].provinceId + "' name='pro_checkbox" + k + "' checked='checked' >" +
                proInfo[h].province.replace("省", " ").replace("市", " ").replace("自治区", " ").replace("特别行政区", " ").replace("维吾尔自治", " ").replace("回族", " ").replace("壮族", " ").replace("未知区域", "其他") +
                "</div>";
              var t = 1;
            }
          }
          if (t == 0) {
            addcont += "<div style='float:left;width:71px;'><input type='checkbox' value='" + proInfo[h].provinceId + "' name='pro_checkbox" + k + "' >" +
              proInfo[h].province.replace("省", " ").replace("市", " ").replace("自治区", " ").replace("特别行政区", " ").replace("维吾尔自治", " ").replace("回族", " ").replace("壮族", " ").replace("未知区域", "其他") +
              "</div>";
          }
        }
      }

      addLeft("useArea", k, condition, addcont);
    }
  });
}

var funList = function funList(url, funUse, k, condition) {
  $.ajax({
    url: url,
    datatype: 'json',
    type: 'get',
    success: function (res) {
      var result = res.data
      var functionTypes = new Array();
      for (var j = 0; j < result.length; j++) {
        functionTypes[j] = result[j].functionType;
      }
      unique(functionTypes);
      var funCheck = funUse.param;
      var addcont = "<div style='position: absolute;top: 0;bottom: 0;margin: auto;height: 83px;'>时间范围：<input  value='" + funUse.st + "' id='sd" + k + "' class='Wdate startDate' name='fst' type='text' size='12' onChange='fstChange(this)' onClick=WdatePicker({errDealMode:1,readOnly:true,isShowClear:false,maxDate:'#F{$dp.$D(ed" + k + ")||\\'%y-%M-%d\\'}'})> ~ " +
        "<input   type='text' size='12' value='" + funUse.et + "' id='ed" + k + "' class='Wdate endDate' name='fet' onChange='fetChange(this)' onClick=WdatePicker({isShowClear:false,readOnly:true,minDate:'#F{$dp.$D(sd" + k + ")}',maxDate:'%y-%M-%d'})> <br/>";
      addcont += "<select class='functionType' onchange='funChange(this," + k + ")' style='float:left' >";
      for (var h = 0; h < functionTypes.length; h++) {
        if (funUse.ft == functionTypes[h]) {
          addcont += "<option value='" + functionTypes[h] + "' selected='selected' >" + functionTypes[h] + "</option>";
        } else {
          addcont += "<option value='" + functionTypes[h] + "' >" + functionTypes[h] + "</option>";
        }

      }

      addcont += "</select></div>";
      addcont += "<div style='width:710px;margin-left:355px'>";
      if (funCheck[0].fn == "不限功能") {
        addcont += "<div style='float:left;width:710px;'><div style='float:left;width:236px;line-height:40px;'><input type='checkbox'  name='fun_checkbox" + k + "' onclick='unfunCheck(this.name," + k + ")' value='不限功能,0'  checked='checked' style='float:left;margin-top:14px' ><span style='color:orange;float:left'>不限功能</span>";
        addcont += "<div style='float:right;margin-right:10px;'><select class='funType'>"
        if (funCheck[0].type == 3) {
          addcont += "<option value='3' selected='select'>></option>"
        } else {
          addcont += "<option value='3'>></option>"
        }
        if (funCheck[0].type == 1) {
          addcont += "<option value='1' selected='select'><</option>"
        } else {
          addcont += "<option value='1'><</option>"
        }
        if (funCheck[0].type == 2) {
          addcont += "<option value='2' selected='select'>=</option>"
        } else {
          addcont += "<option value='2'>=</option>"
        }
        addcont += "</select>"
        addcont += "<input type='text' class='funTimes' maxlength='9' style='width:30px' value='" + funCheck[0].count + "' />次</div></div></div>";
      } else {
        addcont += "<div style='float:left;width:710px;'><div style='float:left;width:236px;line-height:40px'><input type='checkbox'  name='fun_checkbox" + k + "' onclick='unfunCheck(this.name," + k + ")' value='不限功能,0' style='float:left;margin-top:14px' ><span style='color:orange;float:left'>不限功能</span>";
        addcont += "<div style='float:right;margin-right:10px;'><select class='funType'>" +
          "<option value='3' selected='select'>></option>" +
          "<option value='1'><</option>" +
          "<option value='2'>=</option>" +
          "</select>" +
          "<input type='text' class='funTimes' maxlength='9' style='width:30px' />次</div></div></div>";
      }
      addcont += "<div id='left" + k + "' style='float:left;width:260px;line-height:40px;margin-right:45px'></div><div id='center" + k + "' style='float:left;width:260px;line-height:40px'></div><div id='right" + k + "' style='margin-left:550px;width:260px;line-height:40px'></div>"
      addcont += "</div>";
      addLeft("functionUseTimes", k, condition, addcont);
      var results = new Array();
      var a = 0;
      for (var i = 0; i < result.length; i++) {
        if (result[i].functionType == funUse.ft) {
          results[a] = result[i];
          a++;
        }
      }
      for (var i = 0; i < results.length; i++) {
        var t = 0;
        for (var b = 0; b < funCheck.length; b++) {

          if (results[i].functionName == funCheck[b].fn && results[i].productId == funCheck[b].pid) {

            var funName = results[i].functionName + "(" + results[i].productAlias + ")";
            var funNames = funName.substr(0, 10);
            var addconts = "<div style='float:left;width:236px'><input type='checkbox' name='fun_checkbox" + k + "' value='" + results[i].functionName + "," + results[i].productId + "' onclick='funCheck(this.name," + i + "," + k + ")' checked='checked' style='float:left;margin-top:14px'><span title='" + funName + "' style='float:left'>" + funNames + "</span>";
            addconts += "<div style='float:right;margin-right:10px;'><select class='funType'>"
            if (funCheck[b].type == 3) {
              addconts += "<option value='3' selected='select'>></option>"
            } else {
              addconts += "<option value='3'>></option>"
            }
            if (funCheck[b].type == 1) {
              addconts += "<option value='1' selected='select'><</option>"
            } else {
              addconts += "<option value='1'><</option>"
            }
            if (funCheck[b].type == 2) {
              addconts += "<option value='2' selected='select'>=</option>"
            } else {
              addconts += "<option value='2'>=</option>"
            }
            addconts += "</select>" +
              "<input type='text' class='funTimes' maxlength='9' style='width:30px' value='" + funCheck[b].count + "' />次</div></div>";
            t = 1;
            if (results[i].productId == 3) {
              $("#left" + k).append(addconts);
            } else if (results[i].productId == 2) {
              $("#center" + k).append(addconts);
            } else if (results[i].productId == 5) {
              $("#right" + k).append(addconts);
            } else {
              $("#left" + k).append(addconts);
            }
          }
        }
        if (t == 0) {
          var funName = results[i].functionName + "(" + results[i].productAlias + ")";
          var funNames = funName.substr(0, 10);

          var addconts = "<div style='float:left;width:236px'><input type='checkbox' name='fun_checkbox" + k + "' value='" + results[i].functionName + "," + results[i].productId + "' onclick='funCheck(this.name," + i + "," + k + ")' style='float:left;margin-top:14px' ><span title='" + funName + "' style='float:left'>" + funNames + "</span>";
          addconts += "<div style='float:right;margin-right:10px;'><select class='funType'>" +
            "<option value='3' selected='select'>></option>" +
            "<option value='1'><</option>" +
            "<option value='2'>=</option>" +
            "</select>" +
            "<input type='text' class='funTimes' maxlength='9' style='width:30px' />次</div></div>";
          if (results[i].productId == 3) {
            $("#left" + k).append(addconts);
          } else if (results[i].productId == 2) {
            $("#center" + k).append(addconts);
          } else if (results[i].productId == 5) {
            $("#right" + k).append(addconts);
          } else {
            $("#left" + k).append(addconts);
          }
        }

      }
    }
  })
};

var acList = function acList(url, ac, k, condition) {

  mycomm_queryJsonData({
    url: url,
    data: {},
    success: function (result) {
      var addcont = "";
      if (ac == 1) {
        addcont += "<input type='radio' class='isActive' name='isActive" + k + "' value='2'>活跃用户（一周至少登陆" + result +
          "次）&nbsp;<input type='radio' class='isActive' name='isActive" + k + "' value='1'  checked>非活跃用户 ";
        addcont += "<input type='hidden' value='" + result + "' class='activeCon' />";
      } else {
        addcont += "<input type='radio' class='isActive' name='isActive" + k + "' value='2' checked>活跃用户（一周至少登陆" + result +
          "次）&nbsp;<input type='radio' class='isActive' name='isActive" + k + "' value='1'>非活跃用户 ";
        addcont += "<input type='hidden' value='" + result + "' class='activeCon' />";
      }
      addLeft("isActive", k, condition, addcont);
    }
  });

};
