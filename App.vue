<script>
	import Utils from './common/js/utils.js'
	export default {
		globalData: {
			
				
		},
		onLaunch: function() {
		  uni.getSetting({
		    success: (res) => {
		      if (!res.authSetting['scope.writePhotosAlbum']) {
		        uni.authorize({
		          scope: 'scope.writePhotosAlbum',
		          success: () => {
		            console.log('用户已授权')
		          },
		          fail: () => {
		            console.log('用户拒绝授权')
		          }
		        })
		      }
		    }
		  })
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
			uni.onTabItemTap = (item) => {
			  console.log(item.index, item.pagePath, item.text);
			  // 在这里发送你的请求
			  const followedList = uni.getStorageSync('followedList');
			  uni.request({
			      url: 'http://127.0.0.1:8080/myland/load',
			      method: 'POST',
			      data: {
			          userId: 'your-user-id', // 请将这里替换为你的用户ID
			          followid: followedList
			      },
			      success(res) {
			          console.log(res.data);
			          // 将返回的数组设置到本地存储的 followedList 键中
			      }
			  });
			}
		},
		globalData:{
			utils:  Utils
		},
	}
</script>

<style>
	/*每个页面公共css */
	@import url("app.css");
</style>
