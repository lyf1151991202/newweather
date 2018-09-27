/*
* @Author: Administrator
* @Date:   2018-09-26 15:06:28
* @Last Modified by:   Administrator
* @Last Modified time: 2018-09-27 17:24:43
*/
	// 获取当前城市
	let city
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/city/",
		dataType:"jsonp",
		success:function(obj){
			city = obj.data;
			updataCity(city);
			// console.log(city)
		}
	})
	function updataCity(city){
		for(let i in city){
		 	let hotCity_top=document.createElement("h1");
		 	hotCity_top.className="hotCity_top";
		 	hotCity_top.innerHTML=i;
		 	let hotCity=document.querySelector(".hotCity");
		 	hotCity.appendChild(hotCity_top);

			// hotCity_box
			let hotCity_box=document.createElement("div");
			hotCity_box.className="hotCity_box";
			hotCity.appendChild(hotCity_box);

		 	for(let j in city[i]){
			 	let hotCity_son=document.createElement("div");
			 	hotCity_son.className="hotCity_son";
			 	hotCity_son.innerHTML=j;
			 	hotCity_box.appendChild(hotCity_son);
		 	}
				
		}
	}
	

	function updata(weather){
		// 获取当前城市
		$(".city").html(weather.city_name);
		$(".wuran h2").html(weather.quality_level)
		$(".temperature").html(weather.current_temperature+"°");
		$(".weather").html(weather.current_condition);
		$(".humid_right").html(weather.wind_direction + weather.wind_level+"级");
		// 今天天气渲染
		$(".today .high").html(weather.dat_high_temperature);
		$(".today .low").html(weather.dat_low_temperature+"°");
		$(".today .bottom_left").html(weather.dat_condition);
		$("#dat_weather_icon_id").css("background","url(img/"+weather.dat_weather_icon_id+".png) no-repeat center/cover");
		// 明天天气渲染
		$(".tomorrow .high").html(weather.tomorrow_high_temperature);
		$(".tomorrow .low").html(weather.tomorrow_low_temperature+"°");
		$(".tomorrow .bottom_left").html(weather.tomorrow_condition);
		$("#tomorrow_weather_icon_id").css("background","url(img/"+weather.tomorrow_weather_icon_id+".png) no-repeat center/cover");
		// 未来24小时天气
		let hoursWeather = weather.hourly_forecast;
		hoursWeather.forEach(function(v){
			let str = `
				<div class="now">
					<h2 class="now_time">${v.hour}:00</h2>
					<div class="now_icon" style="background-image:url(img/${v.weather_icon_id}.png)"></div>
					<h2 class="now_temp">${v.temperature}°</h2>
				</div>
			`
			$(".wrap").append(str);
		})
		let future = weather.forecast_list;
		future.forEach(function(v){
			let str1 = `
				<div class="con">
					<div class="con_date">${v.date.slice(5,7)}/${v.date.slice(8)}</div>
					<div class="con_weaH">${v.condition}</div>
					<div class="con_picH" style="background-image:url(img/${v.weather_icon_id}.png)"></div>
					<div class="con_high">${v.high_temperature}°</div>
					<div class="con_low">${v.low_temperature}°</div>
					<div class="con_picL" style="background-image:url(img/${v.weather_icon_id}.png)"></div>
					<div class="con_weaL">${v.condition}</div>
					<div class="con_wind">${v.wind_direction}</div>
					<div class="con_level">${v.wind_level}</div>
				</div>
			`
			$(".wrap1").append(str1);
		})
	}
// 1.获取当前城市的天气信息
	function ajax(str){
		let url1 = `https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`;
		$.ajax({
			type:"get",
			url:url1,
			dataType:"jsonp",
			success:function(obj){
				let weather = obj.data.weather;
				updata(weather);
				$(".location").css({"display":"none"});
				$(".bg").addClass('block');
				console.log(weather);
			},
		})
	}

	window.onload=function(){

		$(".hotCity_son").click(function(){
			$(".wrap").html("");
			$(".wrap1").html("");
			ajax($(this).html());
		});
		$("#city").click(function(){
			$("#location").css("display","block");
		});
 		$(".bot").focus(function(){
 			$("#quxiao").html("搜索");
 		})
 		$(".search_right").click(function(){
 			if($(".search_right").html() == "取消"){
 				$("#location").css("display","none");
 				$(".bg").addClass('block');
 			}else{
 				for(let i in city){
 					for(let j in city[i]){
 						if($(".bot").val() == j){
 							$(".wrap").html("");
							$(".wrap1").html("");
 							ajax($(".bot").val());
 							return;
 						}
 					}
 				}
 				alert("没有该城市！")
 				}
 		})

	}
