// 此处代码为axios第二层封装(封装接口请求功能函数)----以下为示例代码，如果有错误或者需要优化的地方，请联系作者。

import request from '@/request/request.js';  // request 请求
import upload from '@/upload/upload.js';	// upload 请求

// 以下接口仅为示例代码,您在使用时一定要替换成自己的接口(包括url、method、data、isToken)

// 修改用户信息 
export function modifyUserInfoApi(param) {
	return request({
		url: '/base_info_client_api/wxapp_user_edit',
		headers: {
			isToken: false,
		},
		method: 'PUT',
		data: param
	})
}

// 修改用户信息 
export function modifyUserInfoApiBypost(param) {
	return request({
		url: '/base_info_client_api/wxapp_user_edit',
		headers: {
			isToken: false,
		},
		method: 'post',
		data: param
	})
}

// 知乎热榜测试接口(刷新) 
export function zhiHuHotListApi(param){
	return request({
		url:'/api/v3/feed/topstory/hot-lists/total'+'?'+param,
		headers: {
			isToken: false,
		},
		method: 'get',
	})
}
// 头像上传 
export function headerImageUploadApi(param) {
	return upload({
		url: '/base_info_client_api/uploadAvatar',
		headers: {
			isToken: false,
		},
		name :param.name ,
		filePath: param.avatarfile,
	})
}
