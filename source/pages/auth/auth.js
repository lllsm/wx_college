import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.needauth = false;
  }
  onMyShow() {
    var that = this;
  }
  checkPermission() {

  }

  getUserInfo(e) {
    console.log(666666666);
    wx.switchTab({
      url: '/pages/home/home',
    });
    //open-type="getUserInfo" bindgetuserinfo="getUserInfo"
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.getUserInfo = content.getUserInfo;
Page(body)