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
      flag:false,
      show: false,
      class_key:"",
      remind: '加载中',
      angle: 0,
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
  }
  onReady() {
    var that = this;
    setTimeout(function () {
      that.Base.setMyData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (that.Base.getMyData().angle !== angle) {
        that.Base.setMyData({
          angle: angle
        });
      }
    });
  }
  search(e){
    let keyword = e.detail.value;
    this.Base.toast(keyword)
    this.Base.setMyData({
      keyword 
    })
    this.onMyShow();
  }
  showPopup() {
    this.Base.setMyData({ show: true });
  }

  onClose() {
    this.Base.setMyData({ show: false });
  }
  btn_details(e){
    console.log(e.currentTarget.dataset.item);
    let item = e.currentTarget.dataset.item;
    if(item.is_pas_switch==1){
      this.Base.setMyData({ show: true,class_key: item.class_pas,class_id:item.id,class_name:item.class_name})
    }else{
      console.log(item.class_name)
    }
  }
  bin_key(e){
    console.log(e.detail.value)
    if(e.detail.value==this.Base.getMyData().class_key){
      // 成功通知
      Notify({ type: 'success', message: '口令通过' });
      this.Base.toast("口令通过");
          wx.navigateTo({
            url: '/pages/classdetails/classdetails?id='+this.Base.getMyData().class_id+'&title='+this.Base.getMyData().class_name,
           })
    }else{
      // 危险通知
      Notify({ type: 'danger', message: '口令错误',safeAreaInsetTop:true});
      this.Base.toast("口令错误");
    }
  }
}


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.search = content.search;
body.showPopup = content.showPopup;
body.onClose = content.onClose;
body.btn_details = content.btn_details;
body.bin_key = content.bin_key;
Page(body)