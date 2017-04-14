/**
 * waterfall: v1.0.0
 * require: jquery 1.9+
 * time: 2017/04/12
 * 
 * author: zhaoman
 * layout:
 *          <div id="waterfall">
 *              <div>
 *                  ...
 *             </div>
 *             <div>
 *                  ...
 *             </div>
 *          </div>
 *
 */

;(function($,window,document,undefined){

	$.fn.waterfall = function(options){
        if(this.length<1){return false;}
        var $this = this,
            waterfallLists = $this.children(),
            containerW = $this.width(),
            eleW = waterfallLists.eq(0).width(),
            num = Math.floor(containerW/eleW),
            imgLen = 0;
        
        var layout = function(){
            var pinHArr=[];
            waterfallLists.each(function(index, value ){
                var pinH = waterfallLists.eq(index).outerHeight(true);
                if( index < num ){
                    pinHArr[index] = pinH; //第一行中的num个块框pin 先添加进数组pinHArr
                }else{
                    var minH = Math.min.apply( null, pinHArr );//数组pinHArr中的最小值minH
                    var minHIndex = $.inArray( minH, pinHArr );//数组pinHArr中的最小值索引
                    $(value).css({
                        'position': 'absolute',
                        'top': minH,
                        'left': waterfallLists.eq(minHIndex).position().left
                    });
                    //数组 最小高元素的高 + 添加上的aPin[i]块框高
                    pinHArr[minHIndex] += waterfallLists.eq(index).outerHeight(true);//更新添加了块框后的列高
                }
            });
            var boxH = waterfallLists.last().position().top+waterfallLists.last().outerHeight(true);
            $this.css({'height':boxH+'px'});
        };

        var init=function(){
            waterfallLists.find('img').load(function(){
                imgLen++;
                if(imgLen == waterfallLists.length){
                    layout();
                }
            })
        }; 

        init();       

        return $this;
	}

})(jQuery,window,document)