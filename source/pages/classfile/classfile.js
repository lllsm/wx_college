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
      keyword:'',
      checkstate:''
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
    collegeapi.filelist({id:this.Base.options.collegeclass_id,keyword:keyword||"",checkstate:'B',isd:"all"},(filelist)=>{
      this.Base.setMyData({
        filelist:filelist.data
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
  search(){
    let keyword = this.Base.getMyData().keyword;
    var collegeapi = new CollegeApi();
    collegeapi.filelist({id:this.Base.options.collegeclass_id,keyword:keyword||"",checkstate:'B'},(filelist)=>{
      this.Base.setMyData({
        filelist:filelist.data
      })
    })
  }
  choosefile(e) {
    var that = this;
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {

        console.log(res,'reschooseMessageFile');
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles[0];

        var name = tempFilePaths.name

        console.log(name,'reschooseMessageFile3');


        that.Base.uploadFile("mb", name,tempFilePaths.path, (ret) => {

          if (ret.indexOf(".pdf") != -1) {
            var filetype = 'A';
          } else if (ret.indexOf(".txt") != -1) {
            var filetype = 'B';
          } else if (ret.indexOf(".xlsx") != -1) {
            var filetype = 'C';
          } else {
            var filetype = 'D';
          }
          console.log(ret,'reschooseMessageFile2',name,ret,filetype);
          that.Base.setMyData({
            file: ret,
            filename: name,
            filetype: filetype
          });
          if(ret){
            //接口请求
            var collegeapi = new CollegeApi();
            let collegeclass_id = that.Base.options.collegeclass_id;
            collegeapi.addclassfile({collegeclass_id,classfile:ret,file_name:name,},(addclassfile)=>{
              that.Base.setMyData({
                addclassfile:addclassfile.data
              })
              if(addclassfile.code==1){
                Notify({ type: 'success', message: '上传成功，请耐心等待审核通过~' });
                that.Base.toast("上传成功，请耐心等待审核通过~");
                that.onMyShow();
              }else{
                Notify({ type: 'danger', message: '上传失败~',safeAreaInsetTop:true});
                this.Base.toast("上传失败~");
              }
            })
          }
        }, undefined);

      }
    })
  }
  downLoadfile(e){

    //建议封装 有空处理
    var that = this;
    console.log(e.currentTarget.dataset.file)
    let fileurl =  this.Base.getMyData().uploadpath+e.currentTarget.dataset.file.class_file;
    console.log(fileurl)
    let file_name = e.currentTarget.dataset.file.file_name;

    //下载PDF文件 

  wx.showModal({
     title: '温馨提示',
     content: '确认要打开此'+file_name+'文件吗？',
     showCancel: true,
     cancelText: '取消',
     confirmText: '确定',
     success: (result) => {
       if (result.confirm) {
         wx.downloadFile({
           url: fileurl,    //示例的url地址
           success: function (resinfo) {
            Notify({ type: 'success', message: '文件已下载~' });
            that.Base.toast("文件已下载~");
               console.log("pdf协议文件已下载")
               let path = resinfo.tempFilePath;
               console.log(path, resinfo)
               wx.openDocument({
                   filePath: path,
                   success: function (rest) {
                       console.log('打开文件成功')
                       console.log(rest);
                   },
                   fail: function (error) {
                       wx.showToast({
                           icon: 'none',
                           title: '打开文件失败'
                       });
                   },
               })
           },
           fail: function (err) {
               console.log('fail')
               console.log(err)
               wx.showToast({
                 icon: 'none',
                 title: '下载文件失败'
             });
           }
       })     
       }
     },
     fail: () => {},
     complete: () => {}
   })


  }



}


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bin_key = content.bin_key;
body.search = content.search;
body.choosefile = content.choosefile;
body.downLoadfile = content.downLoadfile;
Page(body)