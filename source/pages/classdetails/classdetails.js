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
      isclass_ewm:false,
      isadd:false,
      text_msg:"",
      imagelist:[]
    });
    const { height, top } = wx.getMenuButtonBoundingClientRect();
    this.Base.setMyData({
      margintop: top,
      funcrowheight: height
    })

    wx.setNavigationBarTitle({
      title: this.Base.options.title
    })
  }
  onMyShow() {
    var that = this;
    let keyword = this.Base.getMyData().keyword;
    var collegeapi = new CollegeApi();
    collegeapi.classdetails({id:this.Base.options.id},(classdetails)=>{
      this.Base.setMyData({
        classdetails:classdetails.data
      })
    })

    collegeapi.msglist({id:this.Base.options.id,checkstate:'B',keyword:this.Base.getMyData().keyword||""},(msglist)=>{
      this.Base.setMyData({
        msglist:msglist.data
      })
    })
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
  closeadd(){
    this.Base.setMyData({ isadd: false });
  }
  class_ewmbin(){
    this.Base.setMyData({isclass_ewm:true})
  }
  btn_details(e){
    console.log(e.currentTarget.dataset.item);
    let item = e.currentTarget.dataset.item;
    if(item.is_pas_switch==1){
      this.Base.setMyData({ show: true,class_key: item.class_pas })
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
    }else{
      // 危险通知
      Notify({ type: 'danger', message: '口令错误',safeAreaInsetTop:true});
      this.Base.toast("口令错误");
    }
  }
  previewImage(e){
    console.log(e)
    let imglist = [];
    let uploadpath = this.Base.getMyData().uploadpath;
    var current = uploadpath+e.currentTarget.dataset.url;
    imglist.push(current);
    console.log(current)
    wx.previewImage({
      current: current,//当前点击的图片链接
      urls: imglist//图片数组
     })
  }
  addmsg(){
    this.Base.setMyData({
      isadd:true
    })
  }
  deleteimg(e){
    var idx = e.currentTarget.id;
    var imagelist = this.Base.getMyData().imagelist;
    imagelist.splice(idx,1);
    this.Base.setMyData({
      imagelist
    })
  }
  uploadimg(e){

    var idx = e.currentTarget.id;
    console.log(idx)
    var imagelist = this.Base.getMyData().imagelist;
    this.Base.uploadImage("member",(ret)=>{
      if(idx>=0&&idx!=""){
        imagelist[idx].img = ret;
      }else {
        imagelist.push({
          img:ret
        })
      }
     console.log(ret)
      this.Base.setMyData({
        imagelist
      })
    },9)
  }
  msg_submit(){
    var collegeapi = new CollegeApi();
    let text_msg = this.Base.getMyData().text_msg||"";

    let imagelist = JSON.stringify(this.Base.getMyData().imagelist);
    let collegeclass_id = this.Base.options.id;
    if(text_msg==""){
      Notify({ type: 'danger', message: '请填写留言内容~',safeAreaInsetTop:true});
      this.Base.toast("请填写留言内容~");
      return;
    }
    if(imagelist.length==1){
      Notify({ type: 'danger', message: '请上传两张以上照片~',safeAreaInsetTop:true});
      this.Base.toast("请上传两张以上照片~");
      return;
    }
    collegeapi.addmsg({collegeclass_id,text_msg,imagelist:encodeURI(imagelist)},(addmsg)=>{
      if(addmsg.code==1){
        Notify({ type: 'success', message: '留言成功，请耐心等待审核通过~' });
        this.Base.toast("留言成功，请耐心等待审核通过~");
        this.onMyShow();
        this.Base.setMyData({
          isadd:false,
          text_msg:"",
          imagelist:[],
        })
      }else{
        Notify({ type: 'danger', message: '留言失败~',safeAreaInsetTop:true});
        this.Base.toast("留言失败~");
        this.Base.setMyData({
            isadd:false,
            text_msg:"",
            imagelist:[],
          })
      }
    })
    
  }
  join_exit(e){
    var that = this;
    var text  ;
    if(e.currentTarget.id=="A"){
     text = "是否加入该班级？"
    }else{
      text = "确定退出该班级？"
    }
    wx.showModal({
     title: '提示',
     content: text,
     success (res) {
       if (res.confirm) {
         console.log(e.currentTarget.id);
         var collegeapi = new CollegeApi();
         collegeapi.uptheir_class_id({collegeclass_id:that.Base.options.id,type:e.currentTarget.id,user_id:that.Base.getMyData().memberinfo.id},(uptheir_class_id)=>{
           that.Base.toast(uptheir_class_id.msg)
         })
        //  console.log(AppBase.onShow())
         that.onShow();
       } else if (res.cancel) {
         console.log('用户点击取消')
       }
     }
   })
 
 
  }
  bintext(e){
    console.log(e.detail.value)
    this.Base.setMyData({
      text_msg:e.detail.value
    })
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
body.class_ewmbin = content.class_ewmbin;
body.previewImage = content.previewImage;
body.addmsg = content.addmsg;
body.closeadd = content.closeadd;
body.uploadimg = content.uploadimg;
body.deleteimg = content.deleteimg;
body.msg_submit = content.msg_submit;
body.bintext = content.bintext;
body.join_exit = content.join_exit;
Page(body)