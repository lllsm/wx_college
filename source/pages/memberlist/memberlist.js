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
    var collegeapi = new CollegeApi();
    collegeapi.classdetails({id:this.Base.options.collegeclass_id},(classdetails)=>{
      this.Base.setMyData({
        classdetails:classdetails.data
      })
    })
  }
  join_exit(e){
    console.log(e.currentTarget.dataset.id);
    // return
    var that = this;
    var text  ;
    if(e.currentTarget.id=="A"){
     text = "是否加入该班级？"
    }else{
      text = "确定移出改成员？"
    }
    wx.showModal({
     title: '提示',
     content: text,
     success (res) {
       if (res.confirm) {
         console.log(e.currentTarget.id);
         var collegeapi = new CollegeApi();
         collegeapi.uptheir_class_id({collegeclass_id:that.Base.options.collegeclass_id,type:e.currentTarget.id,user_id:e.currentTarget.dataset.id},(uptheir_class_id)=>{
           that.Base.toast("移出成功~~")
         })
        //  wx.navigateBack({
        //    delta: 1
        //  })
        that.onMyShow()
       } else if (res.cancel) {
         console.log('用户点击取消')
       }
     }
   })
 
 
  }

}


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.join_exit = content.join_exit;
Page(body)