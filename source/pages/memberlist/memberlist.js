// pages/content/content.js
import { AppBase } from "../../appbase";
import {CollegeApi} from "../../apis/college.api.js";
import Notify from '@vant/weapp/notify/notify';
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    super.onLoad(options);
    this.Base.setMyData({
    });

  }
  onMyShow() {

  }

}


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)