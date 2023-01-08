// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  CollegeApi
} from "../../apis/college.api.js";
import Notify from '@vant/weapp/notify/notify';
import {
  formateDate,
  getCurrWeekList
} from "../../utils/util"
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    super.onLoad(options);
    this.Base.setMyData({
      isadd:false,
      Startperiod:1,//开始课时
      Endperiod:1,//连续节数
      currentWeek: 0,//周数
      weeknum:1,//星期数
      ok_color:0,
      wList:[],
    //   wList: [   //第一周 
    //       { "id":1,"isToday": 1, "period": 7, "classNumber": 1, "name": "算法设计与分析","teacher":"李老师","address":"2306","text_color": '#fad0c4' },
    //       { "id":10,"isToday": 0, "period": 1, "classNumber": 2, "name": "数据库设计","teacher":"李老师","address":"2306","text_color": '#fad0c4' },
    //       { "id":2,"isToday": 1, "period": 1, "classNumber": 2, "name": "操作系统" ,"teacher":"李老师","address":"5409","text_color": '#fad0c4' },
    //       { "id":3,"isToday": 1, "period": 3, "classNumber": 2, "name": "毛概","teacher":"李老师","address":"6202","text_color": '#fad0c4'},
    //       { "id":4,"isToday": 2, "period": 3, "classNumber": 2, "name": "Matlab" ,"teacher":"李老师","address":"2306","text_color": '#fad0c4'},
    //       { "id":5,"isToday": 2, "period": 5, "classNumber": 2, "name": "数据库原理及应用" ,"teacher":"李老师","address":"1104","text_color": '#fad0c4'},
    //       {"id":7,"isToday": 2, "period": 1, "classNumber": 2, "name": "数学建模","teacher":"李老师","address":"1215","text_color": '#fad0c4'},
    //       { "id":6,"isToday": 3, "period": 3, "classNumber": 2, "name": "计算机网络" ,"teacher":"李老师","address":"5102","text_color": '#fad0c4'},
    //       { "id":2,"isToday": 3, "period": 1, "classNumber": 2, "name": "操作系统" ,"teacher":"李老师","address":"5409","text_color": '#fad0c4'},
    //       { "id":3,"isToday": 4, "period": 1, "classNumber": 2, "name": "毛概" ,"teacher":"李老师","address":"6202","text_color": '#fad0c4'},
    //       { "id":6,"isToday": 5, "period": 1, "classNumber": 2, "name": "计算机网络" ,"teacher":"李老师","address":"2304","text_color": '#fad0c4'},
    //       { "id":1,"isToday": 6, "period": 1, "classNumber": 2, "name": "算法设计与分析" ,"teacher":"李老师","address":"5506","text_color": '#fad0c4'},
    // ],
      time: [
          {index: 1,timeStart: '08:00',timeEnd: '08:45'},
          {index: 2,timeStart: '08:55',timeEnd: '09:40'},
          {index: 3,timeStart: '09:50',timeEnd: '10:35'},
          {index: 4,timeStart: '10:45',timeEnd: '11:30'},
          {index: 5,timeStart: '13:00',timeEnd: '13:45'},
          {index: 6,timeStart: '13:55',timeEnd: '14:40'},
          {index: 7,timeStart: '14:50',timeEnd: '15:35'},
          {index: 8,timeStart: '15:45',timeEnd: '16:30'},
          {index: 9,timeStart: '16:40',timeEnd: '17:25'},
          {index: 10,timeStart: '19:00',timeEnd: '19:45'},
          {index: 11,timeStart: '19:55',timeEnd: '20:40'},
          {index: 12,timeStart: '20:50',timeEnd: '21:35'},
        ],
        colorlist:[
          { "id":1,"name":"豆沙绿","value":"#C7EDCC" },
          { "id":2,"name":"蜜露橙","value":"#FCE6C9" },
          { "id":3,"name":"杏仁黄","value":"#FAF9DE" },
          { "id":4,"name":"秋叶褐","value":"#FFF2E2" },
          { "id":5,"name":"胭脂红","value":"#FDE6E0" },
          { "id":6,"name":"青草绿","value":"#E3EDCD" },
          { "id":7,"name":"海天蓝","value":"#DCE2F1" },
          { "id":8,"name":"葛巾紫","value":"#E9EBFE" },
          { "id":9,"name":"极光灰","value":"#EAEAEF" },
          { "id":10,"name":"苹果绿","value":"#B7E8BD" },
        ],
      weekList: [],
      isShow: false,
      current: {},
    });
    this.Base.toast("小技巧：长按某项可删除哦！");
  }
  onMyShow() {
    var value_s = wx.getStorageSync('wList') || [];
    this.Base.setMyData({
      wList:value_s
    })
    let time = new Date(),
      list = getCurrWeekList(time),
      weekList = []
    list.forEach(item => {
      weekList.push({
        day: [item.split('-')[1], item.split('-')[2]].join('-'),
        week: "星期" + "日一二三四五六".charAt((new Date(item)).getDay()),
        isCurr: formateDate(time) == item
      })
    });
    this.Base.setMyData({
      weekList,
    })

    // 算周
    const date = new Date(time.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    const week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
    // Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
    console.log(1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7))
    let weeknumber = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    this.Base.setMyData({currentWeek:weeknumber})

  }
  getDetail(e) {
    console.log(e)
    let {
      item
    } = e.currentTarget.dataset;
    this.Base.setMyData({
      current: item,
      isShow: true
    })
  }
  close() {
    this.Base.setMyData({
      isShow: false
    })
  }
  addmsg(){
    this.Base.setMyData({
      isadd:true
    })
  }
  // src 是 Date()
  weeknumber(src) {
    console.log(src)
    const date = new Date(src.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    const week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
    // Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
    console.log(1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7))
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }
  bind_color(e){
    console.log(e)
    this.Base.setMyData({ok_color:e.currentTarget.id})
  }
  closeadd(){
    this.Base.setMyData({ isadd: false });
  }
  bind_weeknum(e){
    console.log(e.detail)
    this.Base.setMyData({weeknum:e.detail})
  }
  bind_Startperiod(e){
    console.log(e.detail)
    this.Base.setMyData({Startperiod:e.detail})
  }
  bind_Endperiod(e){
    console.log(e.detail)
    this.Base.setMyData({Endperiod:e.detail})
  }
  submit(e){
    console.log(e)
    if(!e.detail.value.name){
      this.Base.toast("课程不能为空哦！");
      return;
    }
    let course_s = e.detail.value;
    var time1 = Date.parse(new Date());//时间戳
    course_s.id_s = time1;
    course_s.text_color=this.Base.getMyData().colorlist[this.Base.getMyData().ok_color].value;
    console.log(course_s)
    this.Base.getMyData().wList.push(course_s);
    console.log(this.Base.getMyData().wList)
    wx.setStorageSync('wList', this.Base.getMyData().wList)
    this.Base.toast("添加成功")
    this.Base.setMyData({
      isadd:false
    })
    this.onMyShow();
  }
  remove_submit(){
    wx.removeStorageSync('wList');
    this.Base.toast("清空完成！");
    this.Base.setMyData({
      isadd:false
    })
    this.onMyShow();
  }
  del_coures(e){
    var that  = this;
    let name = e.currentTarget.dataset.item.name;
    wx.showModal({
      title: '提示',
      content: '是否确认删除'+name,
      success (res) {
        if (res.confirm) {
          console.log(e.currentTarget.dataset.index);
          var value_s = wx.getStorageSync('wList') || [];
          value_s.splice(e.currentTarget.dataset.index, 1)
          console.log(value_s)
          that.Base.setMyData({
            wList:value_s
          })
          wx.setStorageSync('wList', that.Base.getMyData().wList)
          that.Base.toast("删除成功")
          that.onMyShow();
          console.log('用户点击确定')
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
body.getDetail = content.getDetail;
body.close = content.close;
body.weeknumber = content.weeknumber;
body.addmsg = content.addmsg;
body.bind_color = content.bind_color;
body.closeadd = content.closeadd;
body.bind_weeknum = content.bind_weeknum;
body.bind_Startperiod =content.bind_Startperiod;
body.bind_Endperiod = content.bind_Endperiod;
body.submit = content.submit;
body.remove_submit = content.remove_submit;
body.del_coures = content.del_coures;
Page(body)