/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var basePath = window.parent.basePath

$(document).ready(function () {
  $(".fdd").hide();
  var condition = {
    "product": "登录产品",
    "userRegisterTime": "用户注册时间",
    "useArea": "登录地区",
    "buyType": "个人套餐购买情况",
    "functionUseTimes": "功能使用情况",
    "loginCount": "账号登陆次数",
    "onlineTime": "账号在线时长"
  };

  //增加条件
  $("#add").click(function () {
    var k = $("#tr_count").val();


    var newTr = "<tr style='line-height: 20px;padding:20px;' class='ctr' id='ctr" + k + "'>" +
      "<td width='14%' style='background: white;'>" +
      "<select class='condition  el-input__inner' id='condition_id" + k + "' onchange='cdnChange(this," + k + ")' style='margin:0px 10px;width:calc(100% - 20px);'> ";


    for (var cn in condition) {
      newTr += "<option value='" + cn + "' >" + condition[cn] + "</option>";
    }
    var prevSD = $("input[class='Wdate startDate']:last").val() ? $("input[class='Wdate startDate']:last").val() : "";
    var prevED = $("input[class='Wdate endDate']:last").val() ? $("input[class='Wdate endDate']:last").val() : "";
    newTr += "</select><i class='el-icon-caret-bottom' style='position:absolute; top:25px;right:15px'></i>" +
      "</td>" +
      "<td width='80%' style='background: white;padding-left:15px!important;text-align: left;'>" +
      "时间范围：<input class='Wdate startDate' value='" + prevSD + "' id='sd" + k + "' type='text' size='12' onClick=WdatePicker({errDealMode:1,readOnly:true,isShowClear:false,maxDate:'#F{$dp.$D(ed" + k + ")||\\'%y-%M-%d\\'}'})> ~ " +
      "<input   type='text' size='12' value='" + prevED + "' id='ed" + k + "' class='Wdate endDate' onClick=WdatePicker({isShowClear:false,readOnly:true,minDate:'#F{$dp.$D(sd" + k + ")}',maxDate:'%y-%M-%d'})> <br/>" +
      "<input type='checkbox' name='pdt_checkbox" + k + "' onclick='checkAll(this.name)' value=''>全部" +
      "&nbsp;&nbsp;<input type='checkbox' name='pdt_checkbox" + k + "' value='3'>土建" +
      "&nbsp;&nbsp;<input type='checkbox' name='pdt_checkbox" + k + "' value='2'>钢筋" +
      "&nbsp;&nbsp;<input type='checkbox' name='pdt_checkbox" + k + "' value='5'>安装" +
      "</td>" +
      "<td width='6%'  style='padding-left:15px!important;'>" +
      "<input type='button' onclick='cdndelete(this)' class='fdd el-button el-button--primary' value='删除'/>" +
      "</td> </tr>";

    //        $("#fd").html("<input type='button' onclick='cdndelete(0)'  value='删除'/>");
    k++;
    $("#tr_count").val(k);
    $("#cenditionList").append(newTr);
    $(".fdd").show();
  });

  //开始挖掘
  $("#start").click(function () {

    var mid;
    var taskName = $("#task_name").val();
    var data = new Array();
    var condtitions = new Array();
    var w = 0;
    btc = 0;
    var tr_count = $("#tr_count").val() + 100;
    var err = "";
    var lt = parseInt($.trim($("#timeLimit").val()));
    //验证表单
    for (var i = 0; i < tr_count; i++) {
      if ($("#ctr" + i).length > 0) {
        w++;
        var cons = $("#ctr" + i).find(".condition").val();
        //				if(cons == "useTime"){
        //					if($("#ctr"+i).find(".startDate").val()=="" || $("#ctr"+i).find(".endDate").val()=="" ){
        //						err="功能使用日期不能为空";
        //					}
        //					z++;
        //				}
        if (cons == "userRegisterTime") {
          var type = $("#ctr" + i).find(".userRegister").val();
          if (type == 4) {
            if ($("#ctr" + i).find(".register_startDate").val() == "" || $("#ctr" + i).find(".register_endDate").val() == "") {
              err = "用户注册时间不能为空";
            }
          } else {
            var days = $("#ctr" + i).find(".registerday").val();
            if ($("#ctr" + i).find(".registerday").val() == "" || !(/^(\+|-)?\d+$/.test(days)) || days < 0) {
              err = "请正确填写用户注册时间";
            }
          }
        }
        if (cons == "useArea") {
          var t = 0;
          $("#ctr" + i).find("input[name=pro_checkbox" + i + "]").each(function () {
            if ($(this).attr("checked")) {
              t = 1;
            }
          });
          if ($("#ctr" + i).find(".startDate").val() == "" || $("#ctr" + i).find(".endDate").val() == "") {
            err = "登录日期不能为空";
          }
          if (t == 0) {
            err = "登录地区不能为空";
          }
          var bt = DateDiff($("#ctr" + i).find(".startDate").val(), $("#ctr" + i).find(".endDate").val());
          if (bt > lt) {
            err = "登录地区时间范围超出限制时间范围";
          }
        }
        if (cons == "product") {
          var t = 0;
          $("#ctr" + i).find("input[name=pdt_checkbox" + i + "]").each(function () {
            if ($(this).attr("checked")) {
              t = 1;
            }
          });
          if ($("#ctr" + i).find(".startDate").val() == "" || $("#ctr" + i).find(".endDate").val() == "") {
            err = "登录产品时间范围不能为空";
          }
          if (t == 0) {
            err = "请选择登录产品";
          }
          var bt = DateDiff($("#ctr" + i).find(".startDate").val(), $("#ctr" + i).find(".endDate").val());
          if (bt > lt) {
            err = "登录产品时间范围超出限制时间范围";
          }
        }
        if (cons == "buyType") {
          btc++;
          var t = 0,
            p = 0;
          var type = $("#ctr" + i).find(".isbuy").val();
          $("#ctr" + i).find("input[name=btp_checkbox" + i + "]").each(function () {
            if ($(this).attr("checked")) {
              t++;
              if (type == 3 || type == 4) {
                var count = $(this).next('.nbuy').val();
                if (count == "" || !(/^(\+|-)?\d+$/.test(count)) || count < 0) {
                  p = 1;
                }
              }
            }
          });
          if (p == 1) {
            err = "请输入正确的值";
          }
          if (t == 0) {
            err = "请选择套餐";
          }
        }
        if (cons == "functionUseTimes") {
          var t = 0,
            p = 0,
            c = 0;
          $("#ctr" + i).find("input[name=fun_checkbox" + i + "]").each(function () {
            if ($(this).attr("checked")) {
              c++;
              var count = $(this).next().next().find('.funTimes').val();
              if (count != "") {
                t = 1;
              }
              if (count == "" || !(/^(\+|-)?\d+$/.test(count)) || count < 0) {
                p = 1;
              }
            }
          });
          if ($("#ctr" + i).find(".startDate").val() == "" || $("#ctr" + i).find(".endDate").val() == "") {
            err = "功能使用时间范围不能为空";
          }

          if (t == 0 || p == 1) {
            err = "请输入正确的值";
          }
          if (c == 0) {
            err = '请选择功能';
          }
          var bt = DateDiff($("#ctr" + i).find(".startDate").val(), $("#ctr" + i).find(".endDate").val());
          if (bt > lt) {
            err = "功能使用时间范围超出限制时间范围";
          }
        }
        //				if(cons == "isActive"){
        //					y++;
        //				}
        if (cons == "loginCount") {
          var p = 0;
          var count = $.trim($("#ctr" + i).find(".lgCount").val());
          if (count == "" || isNaN(count) || count < 0) {
            p = 1;
          }
          if (p == 1) {
            err = "请输入正确的值";
          }
          if ($("#ctr" + i).find(".startDate").val() == "" || $("#ctr" + i).find(".endDate").val() == "") {
            err = "账号登录时间范围不能为空";
          }
          var bt = DateDiff($("#ctr" + i).find(".startDate").val(), $("#ctr" + i).find(".endDate").val());
          if (bt > lt) {
            err = "账号登录时间范围超出限制时间范围";
          }
        }
        if (cons == "onlineTime") {
          var p = 0;
          var hour = $.trim($("#ctr" + i).find(".onlineHour").val());
          if (hour == "" || isNaN(hour) || hour < 0) {
            p = 1;
          }
          if (p == 1) {
            err = "请输入正确的值";
          }
          if ($("#ctr" + i).find(".startDate").val() == "" || $("#ctr" + i).find(".endDate").val() == "") {
            err = "账号在线时间范围不能为空";
          }
          var bt = DateDiff($("#ctr" + i).find(".startDate").val(), $("#ctr" + i).find(".endDate").val());
          if (bt > lt) {
            err = "账号在线时间范围超出限制时间范围";
          }
        }
      }
    }
    if (taskName == "") {
      alert("请填写任务名称");
    } else if (w == 0) {
      alert("条件不能为空");
    } else if (btc > 1) {
      alert("个人套餐购买情况条件只能选择一个");
    } else if (err != "") {
      alert(err);
    } else if (lt == "" || isNaN(lt) || lt <= 0) {
      alert("请正确填写时间范围限制");
    } else {

      $("#start").attr({
        "disabled": true
      });
      setTimeout("$('#start').attr({'disabled':false})", 3000);
      tr_count = $("#tr_count").val() + 100;
      for (var i = 0; i < tr_count; i++) {
        if ($("#ctr" + i).length > 0) {
          var cons = $("#ctr" + i).find(".condition").val();
          if (cons == "useTime") {
            var startDate = $("#ctr" + i).find(".startDate").val();
            var endDate = $("#ctr" + i).find(".endDate").val();
            var datas = "ct:1,dc1:{st=" + startDate + "_et=" + endDate + "}";
            condtitions.push(datas);
            //    				alert(data[0].dc1);
          }
          if (cons == "userRegisterTime") {
            var type = $("#ctr" + i).find(".userRegister").val();
            if (type == 4) {
              var startDate = $("#ctr" + i).find(".register_startDate").val();
              var endDate = $("#ctr" + i).find(".register_endDate").val();
              var datas = "ct:2,dc2:{type=" + type + "_days=0_st=" + startDate + "_et=" + endDate + "}";
              condtitions.push(datas);
              //    					alert(data[0].dc2);
            } else {
              var days = $.trim($("#ctr" + i).find(".registerday").val());
              var datas = "ct:2,dc2:{type=" + type + "_days=" + days + "_st=null_et=null}";
              condtitions.push(datas);
              //    					alert(data[0].dc2);	
            }
          }

          if (cons == "useArea") {
            var text = "";
            var startDate = $("#ctr" + i).find(".startDate").val();
            var endDate = $("#ctr" + i).find(".endDate").val();
            $("#ctr" + i).find("input[name=pro_checkbox" + i + "]").each(function () {
              if ($(this).attr("checked")) {

                if ($(this).val() != 0) {
                  if (text == "") {
                    text += $(this).val();
                  } else {
                    text += "_" + $(this).val();
                  }
                }
              }
            });
            var datas = "ct:3,dc3:[" + text + "],st:" + startDate + ",et:" + endDate;
            condtitions.push(datas);
          }

          if (cons == "product") {
            var text = "";
            var startDate = $("#ctr" + i).find(".startDate").val();
            var endDate = $("#ctr" + i).find(".endDate").val();
            $("#ctr" + i).find("input[name=pdt_checkbox" + i + "]").each(function () {
              if ($(this).attr("checked")) {
                if ($(this).val() != 0) {
                  if (text == "") {
                    text += $(this).val();
                  } else {
                    text += "_" + $(this).val();
                  }
                }
              }
            });
            var datas = "ct:4,dc4:[" + text + "],st:" + startDate + ",et:" + endDate;
            condtitions.push(datas);
            //    				alert(data[0].dc4);
          }

          if (cons == "buyType") {
            var type = $("#ctr" + i).find(".isbuy").val();
            var text = "";
            $("#ctr" + i).find("input[name=btp_checkbox" + i + "]").each(function () {
              if ($(this).attr("checked")) {
                if ($(this).val() == 1) {
                  if (text == "") {
                    text += "pt=2_pid=3";
                  } else {
                    text += "&pt=2_pid=3";
                  }
                }
                if ($(this).val() == 2) {
                  if (text == "") {
                    text += "pt=2_pid=2";
                  } else {
                    text += "&pt=2_pid=2";
                  }
                }
                if ($(this).val() == 3) {
                  if (text == "") {
                    text += "pt=2_pid=5";
                  } else {
                    text += "&pt=2_pid=5";
                  }
                }
                if ($(this).val() == 4) {
                  if (text == "") {
                    text += "pt=12_pid=3";
                  } else {
                    text += "&pt=12_pid=3";
                  }
                }
                if ($(this).val() == 5) {
                  if (text == "") {
                    text += "pt=12_pid=2";
                  } else {
                    text += "&pt=12_pid=2";
                  }
                }
                if ($(this).val() == 6) {
                  if (text == "") {
                    text += "pt=12_pid=5";
                  } else {
                    text += "&pt=12_pid=5";
                  }
                }
                if (type == 3 || type == 4) {
                  var count = $.trim($(this).next('.nbuy').val());
                  if ($(this).val() == 0) {
                    text += "pt=2_pid=3_day=" + count + "&pt=2_pid=2_day=" + count + "&pt=2_pid=5_day=" + count + "&pt=12_pid=3_day=" + count + "&pt=12_pid=2_day=" + count + "&pt=12_pid=5_day=" + count;
                  } else {
                    text += "_day=" + count;
                  }
                }
              }
            });
            var datas = "ct:5,dc5:{bt~" + type + "#param~[" + text + "]}";
            condtitions.push(datas);

          }

          if (cons == "functionUseTimes") {
            var ft = $("#ctr" + i).find(".functionType").val();
            var startDate = $("#ctr" + i).find(".startDate").val();
            var endDate = $("#ctr" + i).find(".endDate").val();
            var text = "";
            $("#ctr" + i).find("input[name=fun_checkbox" + i + "]").each(function () {
              if ($(this).attr("checked")) {
                if ($(this).val() != 0) {
                  var pname = $(this).val().split(",");
                  var type = $(this).next().next().find('.funType').val();
                  var count = $.trim($(this).next().next().find('.funTimes').val());

                  if (text == "") {
                    text += "fn=" + pname[0] + "_pid=" + pname[1] + "_type=" + type + "_count=" + count;
                  } else {
                    text += "&fn=" + pname[0] + "_pid=" + pname[1] + "_type=" + type + "_count=" + count;
                  }

                }
              }
            });



            var datas = "ct:6,dc6:{ft~" + ft + "#st~" + startDate + "#et~" + endDate + "#param~[" + text + "]}";
            condtitions.push(datas);


          }

          if (cons == "isActive") {
            var ia = $("#ctr" + i).find("input[name='isActive" + i + "']:checked").val();
            var wlc = $("#ctr" + i).find(".activeCon").val();
            var datas = "ct:7,dc7:{ia=" + ia + "_wlc=" + wlc + "}";
            condtitions.push(datas);
            //    				alert(data[0].dc7);

          }

          if (cons == "loginCount") {
            var text = "";
            var startDate = $("#ctr" + i).find(".startDate").val();
            var endDate = $("#ctr" + i).find(".endDate").val();
            var type = $("#ctr" + i).find(".lgType").val();
            var count = $.trim($("#ctr" + i).find(".lgCount").val());
            var datas = "ct:8,dc8:{type=" + type + "_count=" + count + "_st=" + startDate + "_et=" + endDate + "}";
            condtitions.push(datas);
          }

          if (cons == "onlineTime") {
            var text = "";
            var startDate = $("#ctr" + i).find(".startDate").val();
            var endDate = $("#ctr" + i).find(".endDate").val();
            var type = $("#ctr" + i).find(".onlineType").val();
            var hour = $.trim($("#ctr" + i).find(".onlineHour").val());
            var datas = "ct:9,dc9:{type=" + type + "_hour=" + hour + "_st=" + startDate + "_et=" + endDate + "}";
            condtitions.push(datas);
          }

        }
      }

      $.ajax({
        url: basePath + "rest/dataming/task",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({conditions:condtitions,name:taskName}),
        success: function () {
          window.parent.location.href = "http://localhost:9528/#/resource-allocation/data-mining";
        }
      })   
    }
  });

  //重置条件
  $("#reset").click(function () {
    location.reload()
  });
});

//删除条件
var cdndelete = function cdndelete(delthis) {
  $(delthis).parents("tr").prev().remove();
  $(delthis).parents("tr").remove();
  if ($(".fdd").length == 1) {
    $(".fdd").hide();
  }

};

var cdnChange = function cdnChange(selthis, k) {
  var sc = $(selthis).val();

  //选择功能使用日期（已废弃）
  if (sc == "useTime") {
    var addcont = "<input class='Wdate startDate'  type='text' size='12' onClick='WdatePicker({errDealMode:1,readOnly:true,isShowClear:false})'> ~ " +
      "<input   type='text' size='12' class='Wdate endDate' onClick='WdatePicker({isShowClear:false,readOnly:true})'> ";
    $(selthis).parent().next().html(addcont);
    //        $.getScript("http://localhost:8080/business/common/My97DatePicker/WdatePicker.js",function(){});
  }
  //选择用户注册时间
  if (sc == "userRegisterTime") {
    var addcont = "&nbsp;&nbsp;<select class='userRegister' onchange='usrChange(this," + k + ")'>" +
      "<option value='2' selected='select'>等于</option>" +
      "<option value='1'>小于</option>" +
      "<option value='3'>大于</option>" +
      "<option value='4'>范围</option>" +
      "</select>" +
      "&nbsp;<span><input type='text' maxlength='9' class='registerday' size='6' />天</span>";
    $(selthis).parent().next().html(addcont);
  }
  //选择登录地区
  if (sc == "useArea") {
    $.ajax({
      url: basePath + "rest/common/area",
      datatype: 'json',
      type: 'get',
      success: function (result) {
        var prevSD = $("input[class='Wdate startDate']:last").val() ? $("input[class='Wdate startDate']:last").val() : "";
        var prevED = $("input[class='Wdate endDate']:last").val() ? $("input[class='Wdate endDate']:last").val() : "";
        var proInfo = result.data;
        var addcont = "时间范围：<input class='Wdate startDate' value='" + prevSD + "' id='sd" + k + "' type='text' size='12' onClick=WdatePicker({errDealMode:1,readOnly:true,isShowClear:false,maxDate:'#F{$dp.$D(ed" + k + ")||\\'%y-%M-%d\\'}'})> ~ " +
          "<input   type='text' size='12' value='" + prevED + "' id='ed" + k + "' class='Wdate endDate' onClick=WdatePicker({isShowClear:false,readOnly:true,minDate:'#F{$dp.$D(sd" + k + ")}',maxDate:'%y-%M-%d'})> <br/>"
        for (var i = 0; i < proInfo.length; i++) {
          if (i == 0) {
            addcont += "<div style='float:left;width:71px;'><input type='checkbox' value='" + proInfo[i].provinceId + "' name='pro_checkbox" + k + "' onclick='checkAll(this.name)'>" + proInfo[i].province + "</div>";
          } else {
            addcont += "<div style='float:left;width:71px;'><input type='checkbox' value='" + proInfo[i].provinceId + "' name='pro_checkbox" + k + "'>" +
              proInfo[i].province.replace("省", " ").replace("市", " ").replace("自治区", " ").replace("特别行政区", " ").replace("维吾尔自治", " ").replace("回族", " ").replace("壮族", " ").replace("未知区域", "其他") +
              "</div>";
          }
        }
        $(selthis).parent().next().html(addcont);
      }
    });
  }
  //选择登录产品
  if (sc == "product") {
    var prevSD = $("input[class='Wdate startDate']:last").val() ? $("input[class='Wdate startDate']:last").val() : "";
    var prevED = $("input[class='Wdate endDate']:last").val() ? $("input[class='Wdate endDate']:last").val() : "";
    var addcont = "时间范围：<input class='Wdate startDate' value='" + prevSD + "' id='sd" + k + "' type='text' size='12' onClick=WdatePicker({errDealMode:1,readOnly:true,isShowClear:false,maxDate:'#F{$dp.$D(ed" + k + ")||\\'%y-%M-%d\\'}'})> ~ " +
      "<input   type='text' size='12' value='" + prevED + "' id='ed" + k + "' class='Wdate endDate' onClick=WdatePicker({isShowClear:false,readOnly:true,minDate:'#F{$dp.$D(sd" + k + ")}',maxDate:'%y-%M-%d'})> <br/>" +
      "<input type='checkbox' name='pdt_checkbox" + k + "' onclick='checkAll(this.name)' value=''>全部" +
      "&nbsp;&nbsp;<input type='checkbox' name='pdt_checkbox" + k + "' value='3'>土建" +
      "&nbsp;&nbsp;<input type='checkbox' name='pdt_checkbox" + k + "' value='2'>钢筋" +
      "&nbsp;&nbsp;<input type='checkbox' name='pdt_checkbox" + k + "' value='5'>安装";
    $(selthis).parent().next().html(addcont);
  }
  //选择个人套餐购买情况
  if (sc == "buyType") {

    var buytype = ["全部", "土建云功能", "钢筋云功能", "安装云功能", "土建BIM", "钢筋BIM", "安装BIM"];
    var addcont = "<select class='isbuy' onchange='buyChange(this," + k + ")' style='float:left'>" +
      "<option value='1' selected='select'>已拥有</option>" +
      "<option value='2'>未购买过</option>" +
      "<option value='3'>N天内到期</option>" +
      "<option value='4'>过期N天内未续费</option>" +
      "</select>";
    addcont += "<div style='float:left;width:650px;'>";
    for (var i = 0; i < buytype.length; i++) {
      if (i == 0) {
        addcont += "<input type='checkbox' name='btp_checkbox" + k + "' onclick='checkAll(this.name)' value='" + i + "'>" + buytype[i] + "&nbsp;&nbsp;";
      } else {
        addcont += "&nbsp;<input type='checkbox' name='btp_checkbox" + k + "' value='" + i + "'>" + buytype[i];
      }
    }
    addcont += "</div>";
    $(selthis).parent().next().html(addcont);
  }
  //选择功能使用情况
  if (sc == "functionUseTimes") {
    $.ajax({
      url: basePath + "rest/dataming/functionType",
      type: 'get',
      success: function (res) {
        var result = res.data
        var functionTypes = new Array();
        for (var i = 0; i < result.length; i++) {
          functionTypes[i] = result[i].functionType;
        }
        unique(functionTypes);
        var prevSD = $("input[class='Wdate startDate']:last").val() ? $("input[class='Wdate startDate']:last").val() : "";
        var prevED = $("input[class='Wdate endDate']:last").val() ? $("input[class='Wdate endDate']:last").val() : "";
        prevSD = $("input[name='fst']:last").val() ? $("input[name='fst']:last").val() : prevSD;
        prevED = $("input[name='fet']:last").val() ? $("input[name='fet']:last").val() : prevED;
        var addcont = "时间范围：<input class='Wdate startDate' name='fst' value='" + prevSD + "' id='sd" + k + "' type='text' size='12' onChange='fstChange(this)' onClick=WdatePicker({errDealMode:1,readOnly:true,isShowClear:false,maxDate:'#F{$dp.$D(ed" + k + ")||\\'%y-%M-%d\\'}'})> ~ " +
          "<input   type='text' size='12' value='" + prevED + "' name='fet' id='ed" + k + "' class='Wdate endDate' onChange='fetChange(this)' onClick=WdatePicker({isShowClear:false,readOnly:true,minDate:'#F{$dp.$D(sd" + k + ")}',maxDate:'%y-%M-%d'})> <br/>" +
          "<select class='functionType' onchange='funChange(this," + k + ")' style='float:left' >";
        for (var i = 0; i < functionTypes.length; i++) {
          addcont += "<option value='" + functionTypes[i] + "' >" + functionTypes[i] + "</option>"
        }
        addcont += "</select>";
        addcont += "<div style='width:710px;float:right'>";
        addcont += "<div style='float:left;width:710px;'><div style='float:left;width:236px;'><input type='checkbox'  name='fun_checkbox" + k + "' onclick='unfunCheck(this.name," + k + ")' value='不限功能,0' style='float:left' ><span style='color:orange;float:left'>不限功能</span>";
        addcont += "<div style='float:right;margin-right:10px;'><select class='funType'>" +
          "<option value='3' selected='select'>></option>" +
          "<option value='1'><</option>" +
          "<option value='2'>=</option>" +
          "</select>" +
          "<input type='text' maxlength='9' class='funTimes' style='width:30px' />次</div></div></div>";
        addcont += "<div id='left" + k + "' style='float:left;width:236px;'></div><div id='center" + k + "' style='float:left;width:236px;'></div><div id='right" + k + "' style='float:left;width:236px;'></div>"
        addcont += "</div>";
        $(selthis).parent().next().html(addcont);
        var results = new Array();
        var a = 0;
        for (var i = 0; i < result.length; i++) {
          if (result[i].functionType == functionTypes[0]) {
            results[a] = result[i];
            a++;
          }
        }
        results.sort(function (x, y) {
          return (x.functionName).localeCompare(y.functionName);
        });
        for (var i = 0; i < results.length; i++) {
          var funName = results[i].functionName + "(" + results[i].productAlias + ")";
          var funNames = funName.substr(0, 10);
          var addconts = "<div style='float:left;width:236px'><input type='checkbox' name='fun_checkbox" + k + "' value='" + results[i].functionName + "," + results[i].productId + "' onclick='funCheck(this.name," + i + "," + k + ")' style='float:left' ><span title='" + funName + "' style='float:left;cursor:pointer' >" + funNames + "</span>";
          addconts += "<div style='float:right;margin-right:10px;'><select class='funType'>" +
            "<option value='3' selected='select'>></option>" +
            "<option value='1'><</option>" +
            "<option value='2'>=</option>" +
            "</select>" +
            "<input type='text' maxlength='9' class='funTimes' style='width:30px' />次</div></div>";
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
    });
  }




  //选择是不是活跃用户（已废弃）
  if (sc == "isActive") {
    mycomm_queryJsonData({
      url: basePath + "/essencesale/queryActiveUserParam.htm",
      data: {},
      success: function (result) {
        var addcont = "<input type='radio' name='isActive" + k + "' class='isActive' value='2' checked>活跃用户（一周至少登陆" + result +
          "次）&nbsp;<input type='radio' name='isActive" + k + "' class='isActive' value='1'>非活跃用户 ";
        addcont += "<input type='hidden' value='" + result + "' class='activeCon' />";
        $(selthis).parent().next().html(addcont);
      }

    })

  }

  //选择账号登陆次数
  if (sc == "loginCount") {
    var prevSD = $("input[class='Wdate startDate']:last").val() ? $("input[class='Wdate startDate']:last").val() : "";
    var prevED = $("input[class='Wdate endDate']:last").val() ? $("input[class='Wdate endDate']:last").val() : "";
    var addcont = "时间范围：<input class='Wdate startDate' value='" + prevSD + "' id='sd" + k + "' type='text' size='12' onClick=WdatePicker({errDealMode:1,readOnly:true,isShowClear:false,maxDate:'#F{$dp.$D(ed" + k + ")||\\'%y-%M-%d\\'}'})> ~ " +
      "<input   type='text' size='12' value='" + prevED + "' id='ed" + k + "' class='Wdate endDate' onClick=WdatePicker({isShowClear:false,readOnly:true,minDate:'#F{$dp.$D(sd" + k + ")}',maxDate:'%y-%M-%d'})>" +
      "&nbsp;&nbsp;账号登录次数：平均" +
      "&nbsp;<select class='lgType'>" +
      "<option value='3' selected='select'>></option>" +
      "<option value='1'><</option>" +
      "<option value='2'>=</option>" +
      "</select>" +
      "&nbsp;<span><input type='text' maxlength='9' class='lgCount' size='6' />次/天</span>";
    $(selthis).parent().next().html(addcont);

  }

  //选择账号在线时长
  if (sc == "onlineTime") {
    var prevSD = $("input[class='Wdate startDate']:last").val() ? $("input[class='Wdate startDate']:last").val() : "";
    var prevED = $("input[class='Wdate endDate']:last").val() ? $("input[class='Wdate endDate']:last").val() : "";
    var addcont = "时间范围：<input class='Wdate startDate' value='" + prevSD + "' id='sd" + k + "' type='text' size='12' onClick=WdatePicker({errDealMode:1,readOnly:true,isShowClear:false,maxDate:'#F{$dp.$D(ed" + k + ")||\\'%y-%M-%d\\'}'})> ~ " +
      "<input   type='text' size='12' value='" + prevED + "' id='ed" + k + "' class='Wdate endDate' onClick=WdatePicker({isShowClear:false,readOnly:true,minDate:'#F{$dp.$D(sd" + k + ")}',maxDate:'%y-%M-%d'})>" +
      "&nbsp;&nbsp;账号在线时长：平均" +
      "&nbsp;<select class='onlineType'>" +
      "<option value='3' selected='select'>></option>" +
      "<option value='1'><</option>" +
      "<option value='2'>=</option>" +
      "</select>" +
      "&nbsp;<span><input type='text' maxlength='9' class='onlineHour' size='6' />小时/天</span>";
    $(selthis).parent().next().html(addcont);

  }
};

//当选择用户注册时间中的范围时
var usrChange = function usrChange(usrthis, k) {
  var us = $(usrthis).val();
  if (us == "4") {
    var addcont = "<input class='Wdate register_startDate'  id='sd" + k + "' type='text' size='12' onClick=WdatePicker({errDealMode:1,readOnly:true,isShowClear:false,maxDate:'#F{$dp.$D(ed" + k + ")||\\'%y-%M-%d\\'}'})> ~ " +
      "<input   type='text' size='12'  id='ed" + k + "' class='Wdate register_endDate' onClick=WdatePicker({isShowClear:false,readOnly:true,minDate:'#F{$dp.$D(sd" + k + ")}',maxDate:'%y-%M-%d'})>";
    $(usrthis).next().html(addcont);
  }
  if (us == "1" || us == "2" || us == "3") {
    var addcont = "<input type='text' maxlength='9' class='registerday' size='6' />天";
    $(usrthis).next().html(addcont);
  }
};

//个人套餐购买情况 类型选择
var buyChange = function buyChange(bthis, k) {
  var bs = $(bthis).val();
  var buytype = ["全部", "土建云功能", "钢筋云功能", "安装云功能", "土建BIM", "钢筋BIM", "安装BIM"];
  var addcont = "";
  if (bs == "3" || bs == "4") {
    for (var i = 0; i < buytype.length; i++) {
      if (i == 0) {
        addcont += "<div style='width:150px;float:left'><input type='checkbox' name='btp_checkbox" + k + "' onclick='unfunCheck(this.name," + k + ")' value='" + i + "'>" + buytype[i] + "&nbsp;&nbsp;(N=<input type='text' maxlength='9' class='nbuy' size='2' />)</div>";
      } else {
        addcont += "<div style='width:165px;float:right'><input type='checkbox' name='btp_checkbox" + k + "' onclick='funCheck(this.name," + (i - 1) + "," + k + ")' value='" + i + "'>" + buytype[i] + "&nbsp;(N=<input type='text' maxlength='9' class='nbuy' size='2' />)</div>";
      }
    }
    $(bthis).next().html(addcont);
  }
  if (bs == "1" || bs == "2") {
    for (var i = 0; i < buytype.length; i++) {
      if (i == 0) {
        addcont += "<input type='checkbox' name='btp_checkbox" + k + "' onclick='checkAll(this.name)' value='" + i + "'>" + buytype[i] + "&nbsp;&nbsp;";
      } else {
        addcont += "&nbsp;<input type='checkbox' name='btp_checkbox" + k + "' value='" + i + "'>" + buytype[i];
      }
    }
    $(bthis).next().html(addcont);
  }
};


//功能使用情况选择
var funChange = function funChange(cthis, k) {
  $.ajax({
    url: basePath + "rest/dataming/functionType",
    type: 'get',
    success: function (res) {
      debugger
      var result = res.data
      var addcont = "<div style='width:710px;float:right'>";
      addcont += "<div style='float:left;width:710px;'><div style='float:left;width:236px'><input type='checkbox'  name='fun_checkbox" + k + "' onclick='unfunCheck(this.name," + k + ")' value='不限功能,0' style='float:left' ><span style='color:orange;float:left'>不限功能</span>";
      addcont += "<div style='float:right;margin-right:10px;'><select class='funType'>" +
        "<option value='3' selected='select'>></option>" +
        "<option value='1'><</option>" +
        "<option value='2'>=</option>" +
        "</select>" +
        "<input type='text' maxlength='9' class='funTimes' style='width:30px' />次</div></div></div>";
      addcont += "<div id='left" + k + "' style='float:left;width:236px;'></div><div id='center" + k + "' style='float:left;width:236px;'></div><div id='right" + k + "' style='float:left;width:236px;'></div>"
      addcont += "</div>";
      $(cthis).next().html(addcont);
      var results = new Array();
      var a = 0;
      for (var i = 0; i < result.length; i++) {
        if (result[i].functionType == $(cthis).val()) {
          results[a] = result[i];
          a++;
        }
      }
      results.sort(function (x, y) {
        return (x.functionName).localeCompare(y.functionName);
      });
      for (var i = 0; i < results.length; i++) {
        var funName = results[i].functionName + "(" + results[i].productAlias + ")";
        var funNames = "";
        funNames = funName.substr(0, 12);
        var addconts = "<div style='float:left;width:236px'><input type='checkbox' name='fun_checkbox" + k + "' value='" + results[i].functionName + "," + results[i].productId + "' onclick='funCheck(this.name," + i + "," + k + ")' style='float:left' ><span title='" + funName + "' style='float:left;cursor:pointer' >" + funNames + "</span>";
        addconts += "<div style='float:right;margin-right:10px;'><select class='funType'>" +
          "<option value='3' selected='select'>></option>" +
          "<option value='1'><</option>" +
          "<option value='2'>=</option>" +
          "</select>" +
          "<input type='text' maxlength='9' class='funTimes' style='width:30px' />次</div></div>";
        $.cookie("ckb" + (i), null)
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
  });
}


//不限功能check
var unfunCheck = function unfunCheck(name, k) {
  var checkbox = document.getElementsByName(name);
  if (checkbox[0].checked) {
    for (var i = 1; i <= checkbox.length; i += 1) {
      if (checkbox[i].checked) {
        $.cookie("ckb" + (k) + (i), 1);
      }
      checkbox[i].checked = false;
    }
  } else {
    for (var i = 1; i <= checkbox.length; i += 1) {
      if ($.cookie("ckb" + (k) + (i)) == 1) {
        checkbox[i].checked = true;
      }
    }
  }
};
//除不限功能外的check
var funCheck = function funCheck(name, fi, k) {
  var checkbox = document.getElementsByName(name);
  if (checkbox[fi + 1].checked) {
    $.cookie("ckb" + (k) + (fi + 1), 1);
  } else {
    $.cookie("ckb" + (k) + (fi + 1), null);
  }

  if (checkbox[0].checked) {
    for (var i = 1; i <= checkbox.length; i += 1) {
      $.cookie("ckb" + (k) + (i), null);
    }
    checkbox[0].checked = false;
  }
};

//复选框全选或全不选
var checkAll = function checkAll(name) {
  var checkbox = document.getElementsByName(name);
  if (checkbox[0].checked) {

    for (var i = 2; i <= checkbox.length; i += 1) {
      checkbox[i - 1].checked = true;
    }
  } else {
    for (var i = 2; i <= checkbox.length; i += 1) {
      checkbox[i - 1].checked = false;
    }
  }
};

//去除数组中的重复元素
function unique(data) {
  data = data || [];
  var a = {};
  for (var i = 0; i < data.length; i++) {
    var v = data[i];
    if (typeof (a[v]) == 'undefined') {
      a[v] = 1;
    }
  };
  data.length = 0;
  for (var i in a) {
    data[data.length] = i;
  }
  return data;
}


function fstChange(fthis) {
  var fst = $(fthis).val();
  $("input[name='fst']").val(fst);
}

function fetChange(fthis) {
  var fet = $(fthis).val();
  $("input[name='fet']").val(fet);
}
//获取日期相差天数
function DateDiff(startDate, endDate) {
  var d1 = new Date(startDate.replace(/-/g, "/"));
  var d2 = new Date(endDate.replace(/-/g, "/"));
  var time = d2.getTime() - d1.getTime();
  return parseInt(time / (1000 * 60 * 60 * 24)) + 1;
}
