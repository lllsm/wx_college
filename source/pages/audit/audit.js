// pages/content/content.js
import { AppBase } from "../../appbase";
import { CollegeApi } from "../../apis/college.api.js";
import Notify from '@vant/weapp/notify/notify';
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    super.onLoad(options);
    this.Base.setMyData({
      checkstate: "A"
    });
    let type = this.Base.options.type;
    wx.setNavigationBarTitle({
      title: type == "A" ? "我的班级" : type == "B" ? "我的留言" : type == "C" ? "我的文件" : "我的相册"
    })
  }
  onMyShow() {
    var that = this;
    this.getdata()
  }
  search(e) {
    let keyword = e.detail.value;
    this.Base.toast(keyword)
    this.Base.setMyData({
      keyword
    })
    this.onMyShow();
  }
  tabbtn(e) {
    console.log(e.detail.name)
    this.Base.setMyData({
      checkstate:e.detail.name
    })
    this.getdata();
  }
  getdata(){
    var that = this;
    var checkstate = this.Base.getMyData().checkstate;
    let keyword = this.Base.getMyData().keyword;
    var collegeapi = new CollegeApi();
    collegeapi.collegeclass({ keyword: keyword || "", checkstate }, (classlist) => {
      this.Base.setMyData({
        classlist: classlist.data
      })
    })

    collegeapi.msglist({ type: 'my', checkstate,}, (msglist) => {
      this.Base.setMyData({
        msglist: msglist.data
      })
    })
    collegeapi.filelist({ id: this.Base.options.collegeclass_id, keyword: keyword || "", checkstate }, (filelist) => {
      this.Base.setMyData({
        filelist: filelist.data
      })
    })
    collegeapi.classimglist({ type: 'my', checkstate }, (classimglist) => {
      var list = classimglist.data;
      console.log(list)
      var classimglist = [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].class_images) {
          list[i]["classimglist"] = list[i].class_images.split(",")
        }

      }

      this.Base.setMyData({
        classimglist: list
      })

    })
  }
  class_submit(e){
    var that = this;
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    var collegeapi = new CollegeApi();
    collegeapi.delclass({id}, (delclass) => {
      if(delclass.code==1){
        Notify({ type: 'success', message: '已删除' });
        that.Base.toast("已删除");
        that.getdata()
      }
    })
  }
  msg_submit(e){
    var that = this;
    var collegeapi = new CollegeApi();
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    collegeapi.delmsg({id}, (delmsg) => {
      if(delmsg.code==1){
        Notify({ type: 'success', message: '已删除' });
        that.Base.toast("已删除");
        that.getdata()
      }
    })
  }
  file_submit(e){
    var that = this;
    var collegeapi = new CollegeApi();
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    collegeapi.delfile({id}, (delfile) => {
      if(delfile.code==1){
        Notify({ type: 'success', message: '已删除' });
        that.Base.toast("已删除");
        that.getdata()
      }
    })
  }
  img_submit(e){
    var that = this;
    var collegeapi = new CollegeApi();
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    collegeapi.delclassimg({id}, (delclassimg) => {
      if(delclassimg.code==1){
        Notify({ type: 'success', message: '已删除' });
        that.Base.toast("已删除");
        that.getdata()
      }
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.search = content.search;
body.tabbtn = content.tabbtn;
body.getdata = content.getdata;
body.class_submit = content.class_submit;
body.msg_submit =content.msg_submit;
body.img_submit = content.img_submit;
body.file_submit = content.file_submit;
Page(body)