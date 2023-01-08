// 此处代码为应用全局配置代码。如果有错误或者需要优化的地方，请联系作者。(baseUrl为必填项、appid最好填上(后面也许会有从config获取appid的函数功能));
module.exports = {
  baseUrl: 'https://www.zhihu.com',   // 模拟地址 测试下拉刷新(必填项)
  // 应用信息
  appInfo: {
    // 应用名称(可不填)
    name: "Akaixz",
	// APPID testing(必填项，若不填后面有can not read 'xxx' function of undefinde 报错，请联系作者解答疑惑)
	appid:'全局配置的appid', 
    // 应用版本(可不填)
    version: "1.0.0",
	// 小程序code(可不填)
	code:'uni.login所使用的code',
    // 应用logo(可不填)
    logo: "",
    // 官方网站(可不填)
    site_url: "xxxx",
    // 政策协议(可不填)
    agreements: [{
        title: "隐私政策",
        url: "htttp://akaixz.com"
      },
      {
        title: "用户服务协议",
       url: "htttp://akaixz.com"
      }
    ]
  }
}

