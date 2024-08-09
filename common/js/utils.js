class Utils {
	constructor(){
		this.baseUrl = ""
	}
	getUserInfo(){
		uni.login({
			success :function(res){
				console.log(res)
			}
		})
	}
	request(option = {
		showLoading:false
	}) {
		if(!option.url){
			return false
		}
		uni.request({
			url: option.url
		})
	}
}
// 导出
export default new Utils()