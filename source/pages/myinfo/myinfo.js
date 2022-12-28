import {
  AppBase
} from "../../appbase";
import {
  MemberApi
} from "../../apis/member.api";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    super.onLoad(options);

    let list =  [{
      id: 0,
      value: '未知',
    },{
      id: 1,
      value: '男',
    }, {
      id: 2,
      value: '女'
    }]
    let nickName = this.Base.options.nickName;
    this.Base.setMyData({
      gender:list,
      avatarUrl:"",
      nickName
    });
    
  }
  onMyShow() {
  }
  getUserProfile(e){
    console.log(e.detail.value)
    var str = `是否确认修改`;
    var memberapi = new MemberApi();
    var that = this;
    wx.showModal({
      title:'修改提示',
      content:str,
      success: (res) => {
        console.log(res);
          if(res.confirm){
            memberapi.updateuser({
              openid:this.Base.getMyData().UserInfo.openid,
              nickName:this.Base.getMyData().nickName||this.Base.getMyData().memberinfo.nickName,
              avatarUrl:this.Base.getMyData().avatarUrl||this.Base.getMyData().memberinfo.avatarUrl,
            }, (e) => {
              if(e.code=="1"){
                wx.switchTab({
                  url: '/pages/wode/wode'
                })
                this.Base.toast("修改成功")
              }else{
                this.Base.toast("修改失败")
              }
            });
          }
      },
      fail: (res) => {
        
      },
    });
  }

  bindpic(e) {
    var that = this;
    // let uploadpath = this.Base.getMyData().uploadpath;
    // console.log(e.detail.avatarUrl)
    // if(!e.detail.avatarUrl){
    //   this.Base.uploadOneImage("member", (ret) => { 
    //     that.Base.setMyData({
    //       avatarUrl: uploadpath+'member/'+ret
    //     }); 
    //   }, undefined);
    // }
    const { avatarUrl } = e.detail 
    this.Base.setMyData({
      avatarUrl
    })
      console.log("进来了")
      let uploadpath = this.Base.getMyData().uploadpath;
      this.Base.uploadAvatarUrl("member",avatarUrl, (ret) => { 
        console.log(ret)
        that.Base.setMyData({
          avatarUrl: uploadpath+ret
        }); 
      }, undefined);



  }
  bin_inp(e){
    console.log(e)
    this.Base.setMyData({
      nickName:e.detail.value
    })
  }

}


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.getUserProfile = content.getUserProfile;
body.bindpic = content.bindpic;
body.bin_inp = content.bin_inp;
Page(body)