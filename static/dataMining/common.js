//覆盖一些方法
/*window.alert=function(msg){
	window.confirm("This is alert!"+msg);
}*/



//native2ascii
function mycomm_native2ascii(n) {
    var regexp = /[^\x00-\xff]/g;
    var a = n;
    while (m = regexp.exec(n)) {
        a = a.split(m[0]).join(escape(m[0]).split("%").join("\\"));
    }
    return a;
}

//ascii2native    
function mycomm_ascii2native(a) {
    var n = a.replace(new RegExp("%", "gm"), "％");
    var n = unescape(n.split("\\").join("%"));
    n = n.replace(new RegExp("%", "gm"), "\\");
    return n;
}

//转换为unicode码
function mycomm_toUnicode(str) {
    var temp;
    var i;
    var rt = "";
    for (i = 0; i < str.length; i = i + 1) {
        temp = str.charCodeAt(i).toString(16);
        rt += "\\u" + new Array(5 - String(temp).length).join("0") + temp;
    }
    return rt;
}

/**
将字符串中的一些特殊字符用HTML转义或标签替换，如换行，单引号，双引号等
*/
function mycomm_htmlEncode(str) {
    var rt = str;
    rt = rt.replace(new RegExp("&", "gm"), "&amp;");
    rt = rt.replace(new RegExp("<", "gm"), "&lt;");
    rt = rt.replace(new RegExp(">", "gm"), "&gt;");
    rt = rt.replace(new RegExp("\"", "gm"), "&quot;");
    rt = rt.replace(new RegExp("'", "gm"), "&acute;");
    rt = rt.replace(new RegExp("\r\n", "gm"), "<br>");
    rt = rt.replace(new RegExp("\r", "gm"), "<br>");
    rt = rt.replace(new RegExp("\n", "gm"), "<br>");
    return rt;
}

/*仅执行换行符替换*/
function mycomm_hemlEncodeMin(str) {
    var rt = str;
    rt = rt.replace(new RegExp("\r\n", "gm"), "<br>");
    rt = rt.replace(new RegExp("\r", "gm"), "<br>");
    rt = rt.replace(new RegExp("\n", "gm"), "<br>");
    return rt;
}

/*为一些javascript的字符转义，避免出现js错误*/
function mycomm_jsEncode(str) {
    var rt = str;
    rt = rt.replace(new RegExp("'", "gm"), "\\'");
    rt = rt.replace(new RegExp("\"", "gm"), "\\\"");
    rt = rt.replace(new RegExp("\r\n", "gm"), "\n");
    rt = rt.replace(new RegExp("\r", "gm"), "\n");
    return rt;
}

/*
	请求格式化后的json数据,如果出现错误，弹出警告框提示错误信息
	props:参数，json格式
	{
		url:请求数据的地址(必须),
		data:发送的参数，json格式(必须),
		success:function(data){}, 成功获取数据后执行的操作，data为取得的数据(必须)
		error:function(){}, 请求出现异常后执行的方法
		before:function(){},提交请求前执行的方法
		complete:function(){}, 请求完成后执行的方法，在success或error方法执行完后执行
		cache:是否使用浏览器缓存，值为true 或 false,默认为false
		async:是否采用异步方法提交数据，值为true或 false,默认为true
		myError:出错时候的时候用的方法
	}
*/
function mycomm_queryJsonData(props) {
    var url = props.url;
    var data = props.data;
    var success = props.success;
    var error = props.error;
    var before = props.before;
    var complete = props.complete;
    var cache = props.cache;
    var async = props.async;
    var myError = props.myError;
    var repeatTimes = props.repeatTimes;
    if (!repeatTimes) {
        repeatTimes = 1;
        props.repeatTimes = 1;
    }
    if (!cache) {
        cache = false;
        //alert(cache);
    }
    if (!async) {
        async = true;
        //alert(async);
    }

    var done = false; //处理方法被反复调用问题


    $.ajax({
        url: url,
        type: "POST",
        cache: cache,
        async: async,
        contentType: "application/json;charset=utf-8",
        data: mycomm_ascii2native(JSON.stringify(data)),
        dataType: "json",
        processData: false,
        beforeSend: function (request) {
            request.setRequestHeader("RequestType", "request-in-script");
            request.setRequestHeader("x-requested-with", "XMLHttpRequest");
            if (before) {
                if (repeatTimes == 1) {
                    before();
                }
            }

            //alert("before");
        },
        success: function (obj) {
            //返回为空的情况下属于错误
            if (obj == null || !obj) {
                if (myError) {
                    myError();
                }
                repeatTimes = 3;
                return;
            }

            if ($.trim(obj).indexOf("lubanjson=") == 0) {
                //服务器出现超时或在别处登录等情况
                var json1 = obj.substring(obj.indexOf("=") + 1).replace(/\n|\r|\t/g, "");
                var sta = eval("[" + json1 + "]")[0];
                if (sta.satatuscode) {
                    //是期待中的数据格式
                    if (sta.info !== "") {
                        alert(sta.info);
                    }
                    if (sta.forward !== "") {
                        top.location.href = sta.forward;
                    }
                    repeatTimes = 3;
                    return false;
                }
            }
            var json = eval(obj)[0]; //数据转换为json对象
            if (json.type == "success") {
                //操作成功
                jdata = json.result;//获取结果数据
                if (success) {
                    success(jdata);
                }
            } else if (json.type == "error") {
                //服务器操作出现错误
                var msg = json.info;
                var idx = msg.indexOf("提示：");
                if (idx > -1) {
                    msg = msg.substring(idx + 3);
                }
                window.alert(msg);

                if (myError) {
                    myError();
                }
            } else if (json.type == "redirect") {
                if (json.info !== null && json.info !== undefined && json.info !== "") {
                    window.alert(json.info);
                }
                top.location.href = json.forward;
            } else {
                //意料外的错误
                window.alert(obj);
            }
            repeatTimes = 3;
        },
        error: function (request, textStatus, errorThrown) {
            //出现错误
            //alert(textStatus);
            var obj = request.responseText;
            if ($.trim(obj).indexOf("lubanjson=") == 0) {
                //服务器出现超时或在别处登录等情况

                var json = obj.substring(obj.indexOf("=") + 1).replace(/\n|\r|\t/g, "");
                try {
                    var sta = eval("[" + json + "]")[0];
                    if (sta.satatuscode) {
                        //是期待中的数据格式
                        if (sta.info !== "") {
                            alert(sta.info);
                        }
                        if (sta.forward !== "") {
                            top.location.href = sta.forward;
                        }
                        repeatTimes = 3;
                        return false;
                    }
                } catch (ex) {
                    repeatTimes = 3;
                    alert("处理接收到的数据出现异常，请重试。");
                    //alert(json);	
                }
            }
            //alert("error");
        },
        complete: function (request, textStatus) {
            //alert(textStatus+","+request.status+","+","+request.readyState);
            if (!done) {
                done = true;
                //alert(request.status+","+repeatTimes);
                if (request.status !== 200) {
                    //出现错误
                    if (repeatTimes < 3) {
                        //重试
                        //alert(repeatTimes);
                        repeatTimes = repeatTimes + 1;
                        props.repeatTimes = repeatTimes;
                        setTimeout(function () {
                            mycomm_queryJsonData(props);
                        }, 10);

                    } else {
                        alert("请求的资源暂时无法访问，请稍后再试。（错误代码：" + request.status + "）");
                        if (myError) {
                            myError();
                        }
                        if (error) {
                            error();
                        }
                    }
                }
                if (complete) {
                    if (repeatTimes >= 3) {
                        complete();
                    }
                }
            }

        }
    });
}

//模拟窗口
var win = {
    winIndex: 0,
    block: false,
    closed: {}, //存放窗口关闭后的操作
    init: function () { //初始化页面内的所有窗口
        $.each($(".win"), function () {
            win.winIndex = win.winIndex + 1;
            var winName = $(this).attr("winName");
            var width = $(this).attr("width");
            var centerType = $(this).attr("centerType");
            var height = $(this).attr("height");
            var title = $(this).attr("title");
            var showTitle = $(this).attr("showTitle");
            var xoffset = $(this).attr("xoffset");
            var yoffset = $(this).attr("yoffset");
            if (winName === undefined) {
                winName = "win" + win.winIndex;
            }
            if (width === undefined) {
                width = "";
            }
            if (height === undefined) {
                height = "";
            }
            if (title === undefined) {
                title = winName;
            }
            if (showTitle === undefined) {
                showTitle = true;
            } else if (showTitle === "false") {
                showTitle = false;
            } else {
                showTitle = true;
            }
            if (centerType === undefined || (centerType !== "window" && centerType !== "none")) {
                centerType = "document";
            }
            if (xoffset === undefined) {
                xoffset = 0;
            }
            if (yoffset === undefined) {
                yoffset = 0;
            }


            $(this).addClass("win_body");
            $(this).removeClass("hidden");
            $(this).removeAttr("winName");
            $(this).removeAttr("width");
            $(this).removeAttr("height");
            $(this).removeAttr("title");
            $(this).removeAttr("centerType");
            $(this).removeAttr("xoffset");
            $(this).removeAttr("yoffset");
            $(this).wrap("<div class=\"win_frame hidden\" id=\"" + winName + "\"></div>");
            if (showTitle) {
                $("#" + winName).prepend("<div class=\"win_title\"><div class=\"win_title_text\">" + title + "</div><div class=\"win_title_close\"></div><div class=\"clear\"></div></div>");
            }
            $("#" + winName).css("position", "absolute");
            if (width !== "") {
                $("#" + winName).css("width", width + "px");
            }
            if (height !== "") {
                $("#" + winName).css("height", height + "px");
            }
            $("#" + winName).data("centerType", centerType);
            $("#" + winName).data("xoffset", xoffset);
            $("#" + winName).data("yoffset", yoffset);

            $("#" + winName + " .win_title .win_title_close").bind("click", function () {
                win.close(winName);
            });

            $("#" + winName + " .closeWin").bind("click", function () {
                win.close(winName);
            });
        });
        //模拟窗口遮盖层
        $("body").append("<div class=\"win_mask hidden\"></div>");
        window.onresize = function () {
            $.each($(".win_frame:not(hidden)"), function () {
                //调整窗口位置
                var centerType = $(this).data("centerType");
                if (centerType !== "none") {
                    var dwidth;//当前页面宽度
                    var dhyeight;//当前页面高度
                    if (centerType === "window") {
                        dwidth = $(window).width();
                        dheight = $(window).height();
                    } else {
                        dwidth = $(document).width();
                        dheight = $(document).height();
                    }
                    var width = $(this).width(); //窗口宽度
                    var height = $(this).height(); //窗口高度
                    var left = parseInt(dwidth / 2 - width / 2);
                    var top = parseInt(dheight / 2 - height / 2);
                    $(this).css("left", left + "px");
                    $(this).css("top", top + "px");
                }
            });
            $(".win_mask").css("width", $(document).width());
            $(".win_mask").css("height", $(document).height());
        }
    },
    open: function (winName) {
        //调整窗口位置
        var centerType = $("#" + winName).data("centerType")
        var dwidth;//当前页面宽度
        var dhyeight;//当前页面高度
        if (centerType === "window") {
            dwidth = $(window).width();
            dheight = $(window).height();
        } else {
            dwidth = $(document).width();
            dheight = $(document).height();
        }
        var width = $("#" + winName).width(); //窗口宽度
        var height = $("#" + winName).height(); //窗口高度
        var left = parseInt(dwidth / 2 - width / 2);
        var top = parseInt(dheight / 2 - height / 2);
        if (centerType !== "none") {
            $("#" + winName).css("left", left + "px");
            $("#" + winName).css("top", top + "px");
        } else {
            $("#" + winName).css("left", $("#" + winName).data("xoffset") + "px");
            $("#" + winName).css("top", $("#" + winName).data("yoffset") + "px");
        }
        $("select").attr("disabled", "disabled");
        $("#" + winName + " select").attr("disabled", "");
        $("#" + winName).removeClass("hidden");
        $("#" + winName + " input:first").focus();
        $(".win_mask").css("width", $(document).width());
        $(".win_mask").css("height", $(document).height());
        $(".win_mask").removeClass("hidden");
        return false;
    },
    close: function (winName) {
        $("#" + winName).addClass("hidden");
        if ($(".win_frame").length <= $(".win_frame.hidden").length) {
            $(".win_mask").addClass("hidden");
        }
        $("select").attr("disabled", "");
        if (win.closed[winName]) {
            win.closed[winName]();
        }
        return false;
    }
	/*
	alert:function(msg){
		$("body").append("<div id=\"win_alertmask\" class=\"win_mask\" style=\"z-index:40;\"></div>");
		$("body").append("<div id=\"win_alert\" class=\"win-frame hidden\" style=\"z-index:80;width:300px;height:auto\"></div>");
		$("#win_alert").append("<div class=\"win_title\"><div class=\"win_title_text\">"+提示+"</div><div class=\"win_title_close\"></div><div class=\"clear\"></div></div>");
		$("#win_alert").append("<div class=\"win_body\"></div>");
	}*/
};

//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外  
function fnBanBackSpace(e) {
    var ev = e || window.event;//获取event对象
    var obj = ev.target || ev.srcElement;//获取事件源
    var t = obj.type || obj.getAttribute('type');//获取事件源类型
    //获取作为判断条件的事件类型
    var vReadOnly = obj.getAttribute('readonly');
    var vEnabled = obj.getAttribute('enabled');
    //处理null值情况
    vReadOnly = (vReadOnly == null) ? false : vReadOnly;
    vEnabled = (vEnabled == null) ? true : vEnabled;
    //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
    //并且readonly属性为true或enabled属性为false的，则退格键失效
    var flag1 = (ev.keyCode == 8 && (t == "password" || t == "text"
        || t == "textarea") && (vReadOnly == true || vEnabled != true))
        ? true : false;
    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
    var flag2 = (ev.keyCode == 8 && t != "password" && t != "text"
        && t != "textarea") ? true : false;
    //判断
    if (flag2) {
        return false;
    }
    if (flag1) {
        return false;
    }
}

$(document).ready(function () {
    //禁用backspace Key
    $(document).bind("keydown", function (e) {
        return fnBanBackSpace(e);
    });
    $(document).bind("keypress", function (e) {
        return fnBanBackSpace(e);
    });
});

/*
$(document).ready(function(){
	//标签样式
	
	$(".tabs .tab").live("mouseover",function(){
		$(this).addClass("focus");
	});
	$(".tabs .tab").live("mouseout",function(){
		$(this).removeClass("focus");
	});
	$(".tabs").append("<div class=\"clear\"><div>");
	
	//导航条样式
	$(".navs .nav").after("<div style=\"float:left;font-weight:bolder;\">|</div>");
	$(".navs .nav:first").before("<div style=\"float:left;font-weight:bolder;\">|</div>");
	$(".navs").append("<div class=\"clear\"></div>");
	
	//.button样式
	$(".button").live("mouseover",function(){
		$(this).addClass("button_hover");
	});
	$(".button").live("mouseout",function(){
		$(this).removeClass("button_hover");
	});
	
	//构成模拟窗口
	win.init();
	
});
*/