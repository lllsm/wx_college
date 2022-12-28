// pages/content/content.js
import { AppBase } from "../../appbase";
import {CollegeApi} from "../../apis/college.api.js";
import Notify from '@vant/weapp/notify/notify';
import {
  ApiUtil
} from "../../apis/apiutil.js";
var WxParse = require('../../wxParse/wxParse');
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    super.onLoad(options);
    this.Base.setMyData({
    });
    const { height, top } = wx.getMenuButtonBoundingClientRect();
    this.Base.setMyData({
      margintop: top,
      funcrowheight: height
    })
  }
  onMyShow() {
    var that = this;
    let keyword = this.Base.getMyData().keyword;
    var collegeapi = new CollegeApi();
    collegeapi.collegeclass({keyword:keyword||"",checkstate:'B',isd:"all"},(classlist)=>{
      this.Base.setMyData({
        classlist:classlist.data
      })
    })
    let cont = wx.getStorageSync("content")||this.Base.getMyData().instinfo.content;
   
   let content = ApiUtil.HtmlDecode(cont);
    WxParse.wxParse('content', 'html',content, that, 10);
    this.Base.setMyData({})
  }
  search(e){
    let keyword = e.detail.value;
    this.Base.toast(keyword)
    this.Base.setMyData({
      keyword 
    })
    this.onMyShow();
  }


}


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)