// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  KaceApi
} from "../../apis/kace.api.js";
import {
  MemberApi
} from "../../apis/member.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      banben_name: "",
      danshu_name: "",
      banben_value_id: "",
      danshu_value_id: "",
      danshuindex: "",
      banbenindex: "",
      banben_id:"",
      danshu_id:"",
      keyword:"",
      index: -1,//全部
      isloading: true,
      yishouji: false,
      weshouji: false,
      iscarddetails: false,
      isgather:"",
      xiilefengmianka:[],
      pageIndex:1,//当前页
      pageSize:20,//每页条数
      totalpages:1,//数据总页数,
      kapiantotal:0,
    })
  }
  onMyShow() {
    var kaceapi = new KaceApi();
    var that = this;


    let info = new Promise(function (resolve, reject) {
      kaceapi.kapianxilieinfo({
        id: that.Base.options.id,
      }, (info) => {
        that.Base.setMyData({
          kapianxilieinfo: info, //系列详情
          banben_name: info.defbanben_name, //版本名称默认
          banben_id: info.defbanben, //版本id默认
          danshu_name: info.defdanshu_name, //弹数名称默认
          danshu_id: info.defdanshu, //弹数id默认
        })
        resolve(info);
      })
    });
    info.then((e) => {
      let banbenlistPromise = new Promise(function (resolve, reject) {
        let banben_value_id = that.Base.getMyData().banben_value_id;
        let banben_id = that.Base.getMyData().banben_id;
        kaceapi.refrebanben({
          xilie: that.Base.options.id,
          banben: banben_value_id || banben_id|| ""
        }, (list) => {
          resolve(list);
        })
      });
      banbenlistPromise.then((e) => {
        //异步处理版本列表，弹数列表，
        console.log(e)
        let cameraAll = {
          id: "",
          name: "全部"
        };
        if (e.banbenlist != '') e.banbenlist.unshift(cameraAll);
        if (e.danshulist != '') e.danshulist.unshift(cameraAll); //添加一组对象
        that.Base.setMyData({
          // kapianxilieinfo: e, //系列详情
          banbenlist: e.banbenlist, //版本列表
          danshulist: e.danshulist, //弹数列表
          // zhongleilist:e.zhongleilist//种类列表
        })
      }).then((e) => {
        //异步处理种类，
        let banben_value_id = that.Base.getMyData().banben_value_id;
        let danshu_value_id = that.Base.getMyData().danshu_value_id;
        let banben_id = that.Base.getMyData().banben_id;
        let danshu_id = that.Base.getMyData().danshu_id;
        kaceapi.refreshkazhong({
          xilie: this.Base.options.id,
          banben: banben_value_id  || banben_id || "",
          danshu: danshu_value_id  || danshu_id || "",
        }, (e) => {
          this.Base.setMyData({
            zhongleilist: e
          })
          this.getmianka()
        })

      })
    })



  }
  onUnload() {


  }
  onPullDownRefresh(){
    this.Base.setMyData({
      pageIndex:1,
    })
    this.getmianka(false)
  }

  onReachBottom() {//触底加载事件
    if (this.Base.getMyData().totalpages > this.Base.getMyData().pageIndex) {//判断当前也是否小于总页数
      this.Base.setMyData({
        pageIndex: this.Base.getMyData().pageIndex + 1//当前页加一
      });
    } else {
      wx.showToast({
        title: '到底了哦！',
        duration: 2000
      })
      return false;
    }
    this.getmianka(true);//调用方法
  }

  showinfo() { //显示隐藏种类筛选
    var isshow = this.Base.getMyData().isshow;
    isshow = !isshow;
    this.Base.setMyData({
      isshow
    })
  }
  keywordFn(e) { //搜索
    this.Base.setMyData({
      keyword: e.detail.value
    })
  }
  getmianka(reachBottom){//搜索
    if(reachBottom){
      if(reachBottom!=true&&reachBottom!=false){
        console.log(reachBottom.currentTarget.id)
        this.Base.setMyData({
          pageIndex:1,
          xiilefengmianka:[]
        })
      }
    }

    var kaceapi = new KaceApi();
    var that = this;
    let xilie = this.Base.options.id;
    let banben = this.Base.getMyData().banben_value_id || this.Base.getMyData().banben_id  || "";
    let danshu = this.Base.getMyData().danshu_value_id || this.Base.getMyData().danshu_id || "";
    let zhongleiid = this.Base.getMyData().zhonglei_id || ""; //种类id
    let pageIndex = this.Base.getMyData().pageIndex||"";
    let pageSize = this.Base.getMyData().pageSize || "";
    let keyword = this.Base.getMyData().keyword;
    let isgather; //是否收集

    if (this.Base.getMyData().yishouji) {
      isgather = -5;
    }
    if (this.Base.getMyData().weshouji) {
      isgather = -6;
    }
    if(!reachBottom){
      this.Base.setMyData({
        isloading: false,
      })
    }else{
      wx.showLoading({
        title: '加载中...',
      });
    }

    kaceapi.kapian({
      xilie,zhongleiid,keyword,banben,danshu,isgather,pageIndex,pageSize,
    }, (xiilefengmianka) => {
      var kapianlist = xiilefengmianka.list;
      if (reachBottom) {
        let xiilefengmianka = [...that.Base.getMyData().xiilefengmianka, ...kapianlist];//将新数据加入老数据中
        that.Base.setMyData({
          xiilefengmianka,
          isloading: true,
        })
        wx.hideLoading();
      }else{
        let xiilefengmianka = kapianlist;
        that.Base.setMyData({
          xiilefengmianka,
          isloading: true,
        })
        wx.hideLoading();
      }
      that.Base.setMyData({
        isloading: true,
        kapiantotal:xiilefengmianka.total,
        totalpages:xiilefengmianka.totalpages,
        totalgather:xiilefengmianka.totalgather
      })
          //计算比例
      let kapiantotal = xiilefengmianka.total;
      let totalgather = xiilefengmianka.totalgather;
      let proportion = Math.round((Number(totalgather) / Number(kapiantotal)) * 100, 2)
      this.Base.setMyData({
        proportion
      })
    })


  }
  switchtype(e){//选择种类
    this.Base.setMyData({
      pageIndex:1
    })
    if (e.currentTarget.id != "") {
      var index = e.currentTarget.id;
    } else {
      var index = e.currentTarget.dataset.index;
    }
    if (index == -2) {
      this.Base.setMyData({
        index: index,
        yishouji: !this.Base.getMyData().yishouji,
        weshouji: false
      })
      this.getmianka(false);
      return
    }
    if (index == -3) {
      this.Base.setMyData({
        index: index,
        weshouji: !this.Base.getMyData().weshouji,
        yishouji: false
      })
      this.getmianka(false);
      return
    }
    if (index == -1) {
      this.Base.setMyData({
        index: index,
        yishouji: false,
        weshouji: false,
        zhonglei_id:""
      })
      console.log(index);
      if (this.Base.getMyData().checkValue != "") {
        var item = this.Base.getMyData().zhongleilist;
        for (let index = 0; index < item.length; index++) {
          item[index].checked = false
        }
        console.log(item);
        this.Base.setMyData({
          zhongleilist: item
        })
      }

      if (index == -3) {
        this.Base.setMyData({
          isgather: index
        })
      }
      this.getmianka(false);
      return
    } else {
      var item = this.Base.getMyData().zhongleilist[index];
      item.checked = !item.checked;
      this.Base.setMyData({
        zhongleilist: this.Base.getMyData().zhongleilist,
        // zhonglei_id:this.Base.getMyData().zhongleilist[index].id
      })
      this.Base.setMyData({
        index: "",
      })
      this.getmianka(false);
    }
  }
  checkboxChange(e) {//选择的种类id
    console.log(e);
    var checkValue = e.detail.value;
    this.Base.setMyData({
      zhonglei_id: checkValue,
    });
  }
  reset(){//重置

    this.Base.setMyData({
      pageIndex:1
    })
    let zhongleis = this.Base.getMyData().zhongleilist
    for (const key in zhongleis) {
      if (zhongleis[key].id != "") {
        zhongleis[key].checked = false;
      }
    }
    this.Base.setMyData({
      zhongleilist: zhongleis,
      keyword: "",
      banben_name: "全部",
      danshu_name: "全部",
      banben_value_id: "",
      danshu_value_id: "",
      danshuindex: 0,
      banbenindex: 0,
      banben_id:"",
      danshu_id:'',
      index: -1,

    })
    this.Base.setMyData({
      pageIndex:1
    })
    this.getmianka(false);
  }
  bindimg(e){//点击卡册
    var idx = e.currentTarget.id;
    console.log(idx)
    this.Base.setMyData({
      imgidx: idx
    })
  }
  closeimg() {//关闭卡片
    this.Base.setMyData({
      imgidx: -1,
      iscarddetails: false
    })
    // this.getmianka();
  }
  chakan() {//查看详情
    this.Base.setMyData({
      iscarddetails: !this.Base.getMyData().iscarddetails
    })
  }
  dianliang(){//卡片点亮
    var imgidx = this.Base.getMyData().imgidx
    var xiilefengmianka = this.Base.getMyData().xiilefengmianka;
    var memberapi = new MemberApi();
    memberapi.dianliang({
      kapian_id: xiilefengmianka[imgidx].id,
      kapianxilie_id: this.Base.options.id,
      banben: xiilefengmianka[imgidx].banben,
      danshu: xiilefengmianka[imgidx].danshu,
      zhonglei: xiilefengmianka[imgidx].zhonglei,
      keywords: this.Base.getMyData().keyword || ""
    }, (ret) => {
      if (ret.code == 0) {
        let xiilefengmiankas = this.Base.getMyData().xiilefengmianka;
        xiilefengmiankas[imgidx].dlstatus='A';
        this.Base.setMyData({
          xiilefengmianka:xiilefengmiankas,
        })
        // this.getmianka(false)


        // this.updatestuats()
        // this.onMyShow();
        this.Base.toast('收集成功');
      } else if(ret.code == '-2'){
        let xiilefengmiankas = this.Base.getMyData().xiilefengmianka;
        xiilefengmiankas[imgidx].dlstatus='A';
        this.Base.setMyData({
          xiilefengmianka:xiilefengmiankas,
        })
        this.Base.toast('收集成功');
      }else {
        this.Base.toast('收集失败');
      }
    })
  }
  quxiaodl() {//取消点亮
    var imgidx = this.Base.getMyData().imgidx
    var xiilefengmianka = this.Base.getMyData().xiilefengmianka;
    var memberapi = new MemberApi();
    memberapi.quxiaodl({
      id: xiilefengmianka[imgidx].dl_id,
    }, (ret) => {
      if (ret == 0) {
        this.Base.toast('已取消收集');
        let xiilefengmiankas = this.Base.getMyData().xiilefengmianka;
        xiilefengmiankas[imgidx].dlstatus='B';
        this.Base.setMyData({
          xiilefengmianka:xiilefengmiankas,
        })
        // this.getmianka(false);
      }
    })
  }


  bindPickerdanshu(e) {
    this.Base.setMyData({
      pageIndex:1
    })
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var danshu_value_id = this.Base.getMyData().danshulist[e.detail.value].id;
    this.Base.setMyData({
      danshuindex: e.detail.value,
      danshu_value_id
    })
    if(e.detail.value==0){
      this.Base.setMyData({
        danshu_id:""
      })
    }
    // this.onMyShow();
    this.getmianka(false);
  }

  bindPickerChange(e) {
    this.Base.setMyData({
      pageIndex:1
    })
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var banben_value_id = this.Base.getMyData().banbenlist[e.detail.value].id;
    this.Base.setMyData({
      banbenindex: e.detail.value,
      banben_value_id
    })
    if(e.detail.value==0){
      this.Base.setMyData({
        banben_id:''
      })
    }
    // this.onMyShow();
    this.getmianka(false);
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.showinfo = content.showinfo;
body.bindPickerChange = content.bindPickerChange;
body.keywordFn = content.keywordFn;
body.bindPickerdanshu = content.bindPickerdanshu;
body.getmianka = content.getmianka;
body.reset = content.reset;
body.switchtype = content.switchtype;
body.bindimg = content.bindimg;
body.getmianka = content.getmianka;
body.checkboxChange = content.checkboxChange;
body.closeimg = content.closeimg;
body.chakan = content.chakan;
body.dianliang = content.dianliang;
body.quxiaodl = content.quxiaodl;


Page(body)