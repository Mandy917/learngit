/*
Ajax 三级省市联动
日期：2017-4-7

settings 参数说明
-----
url:省市数据josn文件路径
prov:默认省份
city:默认城市
dist:默认地区（县）
------------------------------ */
(function($){
	$.fn.citySelect=function(settings){
		if(this.length<1){return;};

		// 默认值
		settings=$.extend({
			url:"libs/city.min.js",
			prov:null,
			city:null,
			dist:null
		},settings);

		var box_obj=this,
			prov_obj=box_obj.find(".prov"),
			prov_res = box_obj.find('.prov-res'),
			city_obj=box_obj.find(".city"),
			city_res = box_obj.find('.city-res'),
			dist_obj=box_obj.find(".dist"),
			dist_res = box_obj.find('.dist-res'),
			btn = box_obj.find('.j-btn');

		var data={},
			temp_html='',
			prov_id=0,
			city_id = 0;

		var distList = function(){
			if(!data.citylist[prov_id].c[city_id].a){
				dist_res.html('无').addClass('disabled');
			}else{
				dist_res.removeClass('disabled');
				$.each(data.citylist[prov_id].c[city_id].a,function(i,distItem){
					temp_html+="<li data-value='"+distItem.s+"'>"+distItem.s+"</li>";
				});
				dist_obj.html(temp_html);
				dist_res.html(dist_obj.find('li').eq(0).html());
				temp_html="";
			}
		}	

		var cityList = function (obj){
			var text = obj.html();
			var parent = obj.parent();
			parent.prev().html(text);
			parent.slideUp();

			if(parent.hasClass('prov')){
				prov_id = obj.index();
				city_id = 0;
				$.each(data.citylist[prov_id].c,function(i,cityItem){
					temp_html+="<li data-value='"+cityItem.n+"'>"+cityItem.n+"</li>";
				});
				city_obj.html(temp_html);
				temp_html='';
				city_res.html(city_obj.find('li').eq(0).html()).removeClass('disabled');
			}else if(parent.hasClass('city')){
				city_id = obj.index();
			}else{
				return false;
			}
			if(dist_obj.length==0){
				return;
			}
			distList();
		}

		var init=function(){
			// 遍历赋值省份下拉列表
			$.each(data.citylist,function(i,provItem){
				temp_html+="<li data-value='"+provItem.p+"'>"+provItem.p+"</li>";
			});
			prov_obj.html(temp_html);
			temp_html='';

			// 若有传入省份与市级的值，则选中。
			if(settings.prov!=null){
				$.each(data.citylist,function(i,provItem){
					var prov_txt = provItem.p;
					if(settings.prov == prov_txt){
						city_res.removeClass('disabled');
						cityList(prov_obj.find('li').eq(i));
						if(settings.city!=null){
							$.each(data.citylist[i].c,function(j,cityItem){
								var city_txt = cityItem.n;
								if(settings.city == city_txt){
									cityList(city_obj.find('li').eq(j));
									if(settings.dist!=null){
										$.each(data.citylist[i].c[j].a,function(m,distItem){
											var dist_txt = distItem.s;
											if(settings.dist == dist_txt){
												dist_res.html(settings.dist);
												return;
											}
										})
									};
									return;
								}
							})
						};
						return;
					}
				})	
			};
		};

		btn.on('click',function(){
            if($(this).hasClass('disabled')){
                return;
            }
            $(this).next().slideToggle();
            $(this).parent().siblings().find('ul').slideUp();
        })
		
		box_obj.on("click",'li',function(){
			var $this = $(this);
			cityList($this);
		});

		// 设置省市json数据
		if(typeof(settings.url)=="string"){
			$.getJSON(settings.url,function(json){
				data=json;
				init();
			});
		}else{
			data=settings.url;
			init();
		};
	};
})(jQuery);