// pages/content/content.js
import { AppBase } from "../../appbase";
import {CollegeApi} from "../../apis/college.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    super.onLoad(options);
    this.Base.setMyData({
      flag:false,
      checked:false,
      headimg:""
    });
  }
  onMyShow() {
    var that = this;

    

  }
  mymember(e) {
    let list = e.currentTarget.dataset.list;
    console.log(list.name)
    wx.navigateTo({
      url: '/pages/mymember/mymember?id=' + list.id + "&nickName=" + list.nickName,
    })
  }
  mycourse(e) {
    let list = e.currentTarget.dataset.list;
    console.log(list.name)
    wx.navigateTo({
      url: '/pages/mycourse/mycourse?id=' + list.id + "&nickName=" + list.nickName,
    })
  }
  lxkfbin(e){
    this.Base.setMyData({
      flag:true
    });
  }
  binoff(){
    this.Base.setMyData({
      flag:false
    });
  }
  advertising(){
    console.log(this.Base.getMyData().myadvertising[0].address);
    wx.navigateTo({
      url: `/${this.Base.getMyData().myadvertising[0].address}`
    })
    
  }
  hh(e){
    var url = e.target.dataset.src;
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  }
  btn_add(){
    
  }
  onChange(){
    this.Base.setMyData({
      checked:!this.Base.getMyData().checked,
    })
  }
  formSubmit(e){
    let class_list = e.detail.value;
    let is_pas_switch = this.Base.getMyData().checked ? 1 : 0;
    var collegeapi = new CollegeApi();
    if(this.Base.getMyData().memberinfo == null){
      this.Base.toast("登录有误！")
      return;
    }
    if(this.Base.getMyData().headimg == ''){
      this.Base.toast("请上传班级头像！")
      return;
    }
    if(class_list.class_name==""){
      this.Base.toast("班级名称不能为空！")
      return;
    }
    if(class_list.college_name==""){
      this.Base.toast("学院名称不能为空！");
      return;
    }
    if(is_pas_switch==1&&class_list.class_key==''){
      this.Base.toast("班级口令不能为空！");
      return;
    }

    collegeapi.addclass({
      class_name:class_list.class_name,
      college_name:class_list.college_name,
      class_intro:class_list.class_intro||'',
      college_intro:class_list.college_intro||'',
      class_pas:class_list.class_key||'',
      college_image:this.Base.getMyData().headimg,
      user_id:this.Base.getMyData().memberinfo.id,
      is_pas_switch
    },(addclass)=>{
      if(addclass.code==1){
        this.Base.toast("恭喜你，创建成功，请耐心等待审核！");
        wx.redirectTo({
          url: '/pages/audit/audit?type=A',
        })
      }else{
        this.Base.toast("创建失败，不要灰心！");
      }
    })

  }
  uploadimg(){
    var that =this;
    this.Base.uploadImage("member", (ret) => { 
     that.Base.setMyData({
       headimg: ret
     }); 
   }, undefined);
 }
}


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.btn_add = content.btn_add;
body.onChange = content.onChange;
body.formSubmit = content.formSubmit;
body.uploadimg = content.uploadimg;
Page(body)