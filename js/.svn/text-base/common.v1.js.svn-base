   
	/**
	 * 提示
	 * @param {[type]} str [提示文字]
	 */
    function Tip(str) {
        var inHtml = '<div class="tip">' + str + '</div>';
        $('body').append(inHtml);
        setTimeout(function() {
            $('.tip').remove();
        }, 3000);
    }

    
//获取哈希值
function localParam(search) {
    var search = search || window.location.search;
    var fn = function(str, reg) {
        if (str) {
            var data = {};
            str.replace(reg, function($0, $1, $2, $3) {
                data[$1] = $3;
            });
            return data;
        }
    }
    return (fn(search, new RegExp("([^?=&]+)(=([^&]*))?", "g")));
}


//模仿hover事件
document.addEventListener("touchstart", function() {}, true);