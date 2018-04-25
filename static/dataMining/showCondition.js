/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//分页对象
var LBSMSSendInnerTestAccountMgt = {};
LBSMSSendInnerTestAccountMgt.pagebar = new Array();
var basePath = 'http://192.168.3.121:8084/crm/'
// console.log(window.parent.miningId)
$(document).ready(function () {
  // var mid = $("#mid").val();
  var mid = window.parent.miningId
  //挖掘条件列表
  var showCondition = function () {
    $.ajax({
      url: basePath + "rest/dataming/condition/" + mid,
      datatype: 'json',
      type: 'get',
      success: function (res) {
        var result = res.data
        var onlyRead = "readonly='readonly'";

        for (var i = 0; i < result.length; i++) {

          //功能使用日期（废弃）
          if (result[i].ct == 1) {
            var tr = $("<tr>").appendTo($("#cenditionList"));
            $("<td>").attr({
              "width": "14%"
            }).html("功能使用日期:").appendTo(tr);
            var useTime_cont = "";
            useTime_cont += "<input class='Wdate startDate' value='" + result[i].dc1.st + "'  " + onlyRead + "  type='text' size='12'>" +
              " ~ <input type='text' value='" + result[i].dc1.et + "' " + onlyRead + " size='12' class='Wdate endDate'> ";
            $("<td>").attr({
              "width": "80%",
              "align": "left"
            }).html(useTime_cont).appendTo(tr);
            var tr = $("<tr>").appendTo($("#cenditionList"));
            $("<td>").attr({
              "colspan": "2",
              "height": "10px"
            }).appendTo(tr);
          }

          //用户注册时间
          if (result[i].ct == 2) {
            var tr = $("<tr>").appendTo($("#cenditionList"));
            $("<td>").attr("width", "14%").html("用户注册时间:").appendTo(tr);
            var userRegisterTime_cont = "";
            if (result[i].dc2.type == 4) {
              userRegisterTime_cont += "<input class='Wdate startDate' value='" + result[i].dc2.st + "'  " + onlyRead + "  type='text' size='12'>" +
                " ~ <input type='text' value='" + result[i].dc2.et + "' " + onlyRead + " size='12' class='Wdate endDate'> ";
            } else {
              if (result[i].dc2.type == 1) {
                type = "小于";
              } else if (result[i].dc2.type == 2) {
                type = "等于";
              } else {
                type = "大于";
              }
              userRegisterTime_cont += "<select " + onlyRead + " > <option value='1'>" + type + "</option> </select> " +
                "<input type='text'  value='" + result[i].dc2.days + "' size='6' " + onlyRead + " />天";
            }
            $("<td>").attr({
              "width": "86%",
              "align": "left"
            }).html(userRegisterTime_cont).appendTo(tr);
            var tr = $("<tr>").appendTo($("#cenditionList"));
            $("<td>").attr({
              "colspan": "2",
              "height": "10px"
            }).appendTo(tr);
          }

          //登录地区
          if (result[i].ct == 3) {

            var pid = result[i].dc3;
            var st = result[i].st;
            var et = result[i].et;
            var url = basePath + "rest/common/area";
            areaList(url, pid, st, et);

          }

          //登录产品
          if (result[i].ct == 4) {
            var tr = $("<tr>").appendTo($("#cenditionList"));
            $("<td>").attr("width", "14%").html("登录产品:").appendTo(tr);
            var pid = result[i].dc4;
            var product_cont = "";
            product_cont += "<input class='Wdate startDate' value='" + result[i].st + "'  " + onlyRead + "  type='text' size='12'>" +
              " ~ <input type='text' value='" + result[i].et + "' " + onlyRead + " size='12' class='Wdate endDate'> ";
            for (var j = 0; j < pid.length; j++) {
              if (pid[j] == 2) {
                product_cont += "<input type='checkbox' disabled='disabled'  checked='checked' />钢筋 ";
              } else if (pid[j] == 3) {
                product_cont += "<input type='checkbox' disabled='disabled'  checked='checked' />土建 ";
              } else {
                product_cont += "<input type='checkbox' disabled='disabled'  checked='checked' />安装 ";
              }
            }
            $("<td>").attr({
              "width": "86%",
              "align": "left"
            }).html(product_cont).appendTo(tr);
            var tr = $("<tr>").appendTo($("#cenditionList"));
            $("<td>").attr({
              "colspan": "2",
              "height": "10px"
            }).appendTo(tr);
          }

          //个人套餐购买情况
          if (result[i].ct == 5) {
            var tr = $("<tr>").appendTo($("#cenditionList"));
            $("<td>").attr("width", "14%").html("个人套餐购买情况:").appendTo(tr);
            var buyType_cont = "";
            var buyInfo = result[i].dc5;
            if (buyInfo.bt == 1) {
              buyType_cont += "<select " + onlyRead + " > <option value='1'>已拥有</option> </select> ";
            }
            if (buyInfo.bt == 2) {
              buyType_cont += "<select " + onlyRead + " > <option value='2'>未购买过</option> </select> ";
            }
            if (buyInfo.bt == 3) {
              buyType_cont += "<select " + onlyRead + " > <option value='3'>N天内到期</option> </select> ";
            }
            if (buyInfo.bt == 4) {
              buyType_cont += "<select " + onlyRead + " > <option value='4'>过期N天内未续费</option> </select> ";
            }

            var buyPro = buyInfo.param;
            var isAll = true;
            for (var a = 0; a < buyPro.length; a++) {
              if (buyPro[0].day != buyPro[a].day) {
                isAll = false;
                break;
              }
            }
            if (isAll && buyPro.length == 6 && buyPro[0].day) {
              buyType_cont += "<input type='checkbox' disabled='disabled'  checked='checked' />全部（N=<input type='text'  value='" + buyPro[0].day + "' size='3' " + onlyRead + " />）";
            } else {
              for (var j = 0; j < buyPro.length; j++) {
                buyType_cont += "<input type='checkbox' disabled='disabled'  checked='checked' />";
                if (buyPro[j].pt == 2 && buyPro[j].pid == 2) {
                  buyType_cont += "钢筋云功能  ";
                }
                if (buyPro[j].pt == 2 && buyPro[j].pid == 3) {
                  buyType_cont += "土建云功能  ";
                }
                if (buyPro[j].pt == 2 && buyPro[j].pid == 5) {
                  buyType_cont += "安装云功能  ";
                }
                if (buyPro[j].pt == 12 && buyPro[j].pid == 2) {
                  buyType_cont += "钢筋BIM  ";
                }
                if (buyPro[j].pt == 12 && buyPro[j].pid == 3) {
                  buyType_cont += "土建BIM  ";
                }
                if (buyPro[j].pt == 12 && buyPro[j].pid == 5) {
                  buyType_cont += "安装BIM  ";
                }
                if (buyInfo.bt == 3 || buyInfo.bt == 4) {
                  buyType_cont += "（N=<input type='text'  value='" + buyPro[j].day + "' size='3' " + onlyRead + " />）";
                }
              }
            }
            $("<td>").attr({
              "width": "86%",
              "align": "left"
            }).html(buyType_cont).appendTo(tr);
            var tr = $("<tr>").appendTo($("#cenditionList"));
            $("<td>").attr({
              "colspan": "2",
              "height": "10px"
            }).appendTo(tr);
          }

          //功能使用情况
          if (result[i].ct == 6) {
            var tr = $("<tr>").appendTo($("#cenditionList"));
            $("<td>").attr("width", "14%").html("功能使用情况:").appendTo(tr);
            var functionUseTimes_cont = "";
            functionUseTimes_cont += "<div style='float:left'>时间范围：<input class='Wdate startDate' value='" + result[i].dc6.st + "'  " + onlyRead + "  type='text' size='12'>" +
              " ~ <input type='text' value='" + result[i].dc6.et + "' " + onlyRead + " size='12' class='Wdate endDate'>";
            functionUseTimes_cont += "<select  style='float:left;height:40px;line-height40px;border-radius:4px'    " + onlyRead + " > <option value='1'>" + result[i].dc6.ft + "</option> </select></div>";
            functionUseTimes_cont += "<div style='width:780px;margin-left:440px'>";
            var ftInfo = result[i].dc6.param;
            for (var j = 0; j < ftInfo.length; j++) {
              if (ftInfo[j].type == 1) {
                type = "<";
              } else if (ftInfo[j].type == 2) {
                type = "=";
              } else {
                type = ">";
              }
              if (ftInfo[j].pid == 3) {
                pa = "(土)";
              } else if (ftInfo[j].pid == 2) {
                pa = "(钢)";
              } else if (ftInfo[j].pid == 5) {
                pa = "(安)";
              } else {
                pa = "";
              }
              functionUseTimes_cont += "<div style='float:left;width:260px;line-height:40px'><input style='float:left; margin-top:14px' type='checkbox' disabled='disabled'  checked='checked' />" + ftInfo[j].fn + pa +
                "<div style='float:right;margin-right:10px;'><select " + onlyRead + " > <option value='1'>" + type + "</option> </select>" +
                "<input type='text' style='width:50px' value='" + ftInfo[j].count + "' size='2' " + onlyRead + " />次</div></div>";
            }
            functionUseTimes_cont += "</div>";
            $("<td>").attr({
              "width": "86%",
              "align": "left"
            }).html(functionUseTimes_cont).appendTo(tr);
            var tr = $("<tr>").appendTo($("#cenditionList"));
            $("<td>").attr({
              "colspan": "2",
              "height": "10px"
            }).appendTo(tr);
          }

          //活跃度（废弃）
          if (result[i].ct == 7) {
            var tr = $("<tr>").appendTo($("#cenditionList"));
            $("<td>").attr("width", "14%").html("活跃度:").appendTo(tr);
            var isActive_cont = "";

            if (result[i].dc7.ia == 1) {
              isActive_cont += "<input type='radio' disabled='disabled'  checked='checked' />非活跃用户 ";
            } else {
              isActive_cont += "<input type='radio' disabled='disabled'  checked='checked' />活跃用户（一周至少登陆" + result[i].dc7.wlc + "次）";
            }
            $("<td>").attr({
              "width": "86%",
              "align": "left"
            }).html(isActive_cont).appendTo(tr);
            var tr = $("<tr>").appendTo($("#cenditionList"));
            $("<td>").attr({
              "colspan": "2",
              "height": "10px"
            }).appendTo(tr);
          }

          //账号登陆次数
          if (result[i].ct == 8) {
            var tr = $("<tr>").appendTo($("#cenditionList"));
            $("<td>").attr({
              "width": "14%"
            }).html("账号登陆次数:").appendTo(tr);
            var cont = "";
            cont += "<input class='Wdate startDate' value='" + result[i].dc8.st + "'  " + onlyRead + "  type='text' size='12'>" +
              " ~ <input type='text' value='" + result[i].dc8.et + "' " + onlyRead + " size='12' class='Wdate endDate'> ";
            if (result[i].dc8.type == 1) {
              type = "<";
            } else if (result[i].dc8.type == 2) {
              type = "=";
            } else {
              type = ">";
            }
            cont += "账号登陆次数：平均<select " + onlyRead + " > <option value='1'>" + type + "</option> </select> " +
              "<input type='text'  value='" + result[i].dc8.count + "' size='6' " + onlyRead + " />次/天";
            $("<td>").attr({
              "width": "86%",
              "align": "left"
            }).html(cont).appendTo(tr);
            var tr = $("<tr>").appendTo($("#cenditionList"));
            $("<td>").attr({
              "colspan": "2",
              "height": "10px"
            }).appendTo(tr);
          }

          //账号在线时长
          if (result[i].ct == 9) {
            var tr = $("<tr>").appendTo($("#cenditionList"));
            $("<td>").attr({
              "width": "14%"
            }).html("账号在线时长:").appendTo(tr);
            var cont = "";
            cont += "<input class='Wdate startDate' value='" + result[i].dc9.st + "'  " + onlyRead + "  type='text' size='12'>" +
              " ~ <input type='text' value='" + result[i].dc9.et + "' " + onlyRead + " size='12' class='Wdate endDate'> ";
            if (result[i].dc9.type == 1) {
              type = "<";
            } else if (result[i].dc9.type == 2) {
              type = "=";
            } else {
              type = ">";
            }
            cont += "账号在线时长：平均<select " + onlyRead + " > <option value='1'>" + type + "</option> </select> " +
              "<input type='text'  value='" + result[i].dc9.hour + "' size='6' " + onlyRead + " />小时/天";
            $("<td>").attr({
              "width": "86%",
              "align": "left"
            }).html(cont).appendTo(tr);
            var tr = $("<tr>").appendTo($("#cenditionList"));
            $("<td>").attr({
              "colspan": "2",
              "height": "10px"
            }).appendTo(tr);
          }
        }
      }
    });
  }

  showCondition();

});

var areaList = function areaList(url, pid, st, et) {
  $.ajax({
    url: basePath + 'rest/common/area',
    datatype: 'json',
    type: 'get',
    success: function (result) {
      var onlyRead = "readonly='readonly'";
      var useArea_cont = "";
      useArea_cont += "<div ><input class='Wdate startDate' value='" + st + "'  " + onlyRead + "  type='text' size='12'>" +
        " ~ <input type='text' value='" + et + "' " + onlyRead + " size='12' class='Wdate endDate'>&nbsp;</div>";
      proInfo = result.data;
      for (var j = 0; j < pid.length; j++) {
        useArea_cont += "<div style='float:left;width:71px;'><input type='checkbox' disabled='disabled'  checked='checked' />";
        for (var k = 0; k < proInfo.length; k++) {
          if (proInfo[k].provinceId == pid[j]) {

            useArea_cont += proInfo[k].province.replace("省", " ").replace("市", " ").replace("自治区", " ").replace("特别行政区", " ").replace("维吾尔自治", " ").replace("回族", " ").replace("壮族", " ").replace("未知区域", "其他") + "  ";
          }
        }
        useArea_cont += "</div>";
      }
      var tr = $("<tr>").appendTo($("#cenditionList"));
      $("<td>").attr("width", "14%").html("登录地区:").appendTo(tr);
      $("<td>").attr({
        "width": "86%",
        "align": "left"
      }).html(useArea_cont).appendTo(tr);
      var tr = $("<tr>").appendTo($("#cenditionList"));
      $("<td>").attr({
        "colspan": "2",
        "height": "10px"
      }).appendTo(tr);
    }
  });
};
