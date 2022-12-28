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
      checkstate:'',
      isadd:false,
      imagelist:[],
      leftList:[],
      rightList:[]
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
    collegeapi.classimglist({id:this.Base.options.collegeclass_id,checkstate:'B',isd:"all"},(classimglist)=>{
      var list  =classimglist.data;
      console.log(list)
      var classimglist = [];
      for(var i = 0; i < list.length; i++){
        if(list[i].class_images){
          classimglist.push(...list[i].class_images.split(","));
        }
      }
      this.Base.setMyData({
        classimglist
      })

    })
  }
  bin_key(e){
    let keyword = e.detail.value;
    this.Base.toast(keyword)
    this.Base.setMyData({
      keyword 
    })
  }
  addmsg(){
    this.Base.setMyData({
      isadd:true
    })
  }
  onClose() {
    this.Base.setMyData({ isadd: false });
  }
  img_submit(){
    var collegeapi = new CollegeApi();
    let imagelist = JSON.stringify(this.Base.getMyData().imagelist);
    let collegeclass_id = this.Base.options.collegeclass_id;
    if(imagelist.length==1){
      Notify({ type: 'danger', message: '请上传两张以上照片~',safeAreaInsetTop:true});
      this.Base.toast("请上传两张以上照片~");
      return;
    }
    collegeapi.addclassimg({collegeclass_id,imagelist:encodeURI(imagelist)},(addclassimg)=>{
      if(addclassimg.code==1){
        Notify({ type: 'success', message: '上传成功，请耐心等待审核通过~' });
        this.Base.toast("上传成功，请耐心等待审核通过~");
        this.onMyShow();
        this.Base.setMyData({
          isadd:false,
          imagelist:[],
        })
      }else{
        Notify({ type: 'danger', message: '上传失败~',safeAreaInsetTop:true});
        this.Base.toast("上传失败~");
        this.Base.setMyData({
            isadd:false,
            imagelist:[],
          })
      }
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
  previewImage(e){
    console.log(e)
    let imglist = this.Base.getMyData().classimglist;
    let uploadpath = this.Base.getMyData().uploadpath;
    var idx = e.target.id;

    let imglists = [];
    for(let i=0;i<imglist.length;i++){
      imglists.push(uploadpath+imglist[0]);
    }
    console.log(imglists[idx])
    wx.previewImage({
      current:imglists[idx],//当前点击的图片链接
      urls: imglists//图片数组
     })
  }



}


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.addmsg = content.addmsg;
body.onClose = content.onClose;
body.img_submit = content.img_submit;
body.deleteimg = content.deleteimg;
body.uploadimg = content.uploadimg;
body.previewImage = content.previewImage;
Page(body)