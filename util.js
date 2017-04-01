var util = {};

//时间转换t(ms)
util.conversionTime = function(t) {
	var secondTime = t / 1000;
	var days = Math.floor(secondTime / (60 * 60 * 24)),
		hours = Math.floor((secondTime - days * 24 * 60 * 60) / 3600),
		minutes = Math.floor((secondTime - days * 24 * 60 * 60 - hours * 3600) / 60),
		seconds = Math.floor(secondTime - days * 24 * 60 * 60 - hours * 3600 - minutes * 60);
	return {
		days: days,
		hours: hours,
		minutes: minutes,
		seconds: seconds
	}
}
//补零
util.zero = function(value) {
	return value < 10 ? '0' + value : value;
}