/*******使用方法，下面两句复制到page的js文件的头部

import { ApiConfig } from '../../apis/apiconfig';
import { InstApi } from '../../apis/member.api';

var memberApi=new MemberApi();
*******/
import { ApiConfig } from 'apiconfig';
export class CollegeApi{

collegeclass(json, callback, showLoading = true) {

  if (showLoading)
      ApiConfig.ShowLoading();

  var header = ApiConfig.GetHeader();
  console.log(header);
  console.log(json);
  wx.request({
      url: ApiConfig.GetApiUrl() + 'College/collegeclass',
      data: json,
      method: 'POST',
      dataType: 'json',
      header: header,
      success: function (res) {
          if (callback != null) {
              callback(res.data);
          }
      },
      fail: function (res) {
          console.log(res);
          callback(false);
      },
      complete: function (res) {
          console.log(res);
      
          if (showLoading)
              ApiConfig.CloseLoading();
      }
  })
}
addclass(json, callback, showLoading = true) {

  if (showLoading)
      ApiConfig.ShowLoading();

  var header = ApiConfig.GetHeader();
  console.log(header);
  console.log(json);
  wx.request({
      url: ApiConfig.GetApiUrl() + 'College/addclass',
      data: json,
      method: 'POST',
      dataType: 'json',
      header: header,
      success: function (res) {
          if (callback != null) {
              callback(res.data);
          }
      },
      fail: function (res) {
          console.log(res);
          callback(false);
      },
      complete: function (res) {
          console.log(res);
      
          if (showLoading)
              ApiConfig.CloseLoading();
      }
  })
}
classdetails(json, callback, showLoading = true) {

  if (showLoading)
      ApiConfig.ShowLoading();

  var header = ApiConfig.GetHeader();
  console.log(header);
  console.log(json);
  wx.request({
      url: ApiConfig.GetApiUrl() + 'College/classdetails',
      data: json,
      method: 'POST',
      dataType: 'json',
      header: header,
      success: function (res) {
          if (callback != null) {
              callback(res.data);
          }
      },
      fail: function (res) {
          console.log(res);
          callback(false);
      },
      complete: function (res) {
          console.log(res);
      
          if (showLoading)
              ApiConfig.CloseLoading();
      }
  })
}
msglist(json, callback, showLoading = true) {

  if (showLoading)
      ApiConfig.ShowLoading();

  var header = ApiConfig.GetHeader();
  console.log(header);
  console.log(json);
  wx.request({
      url: ApiConfig.GetApiUrl() + 'College/msglist',
      data: json,
      method: 'POST',
      dataType: 'json',
      header: header,
      success: function (res) {
          if (callback != null) {
              callback(res.data);
          }
      },
      fail: function (res) {
          console.log(res);
          callback(false);
      },
      complete: function (res) {
          console.log(res);
      
          if (showLoading)
              ApiConfig.CloseLoading();
      }
  })
}
addmsg(json, callback, showLoading = true) {

  if (showLoading)
      ApiConfig.ShowLoading();

  var header = ApiConfig.GetHeader();
  console.log(header);
  console.log(json);
  wx.request({
      url: ApiConfig.GetApiUrl() + 'College/addmsg',
      data: json,
      method: 'POST',
      dataType: 'json',
      header: header,
      success: function (res) {
          if (callback != null) {
              callback(res.data);
          }
      },
      fail: function (res) {
          console.log(res);
          callback(false);
      },
      complete: function (res) {
          console.log(res);
      
          if (showLoading)
              ApiConfig.CloseLoading();
      }
  })
}
addclassfile(json, callback, showLoading = true) {

  if (showLoading)
      ApiConfig.ShowLoading();

  var header = ApiConfig.GetHeader();
  console.log(header);
  console.log(json);
  wx.request({
      url: ApiConfig.GetApiUrl() + 'College/addclassfile',
      data: json,
      method: 'POST',
      dataType: 'json',
      header: header,
      success: function (res) {
          if (callback != null) {
              callback(res.data);
          }
      },
      fail: function (res) {
          console.log(res);
          callback(false);
      },
      complete: function (res) {
          console.log(res);
      
          if (showLoading)
              ApiConfig.CloseLoading();
      }
  })
}
filelist(json, callback, showLoading = true) {

  if (showLoading)
      ApiConfig.ShowLoading();

  var header = ApiConfig.GetHeader();
  console.log(header);
  console.log(json);
  wx.request({
      url: ApiConfig.GetApiUrl() + 'College/filelist',
      data: json,
      method: 'POST',
      dataType: 'json',
      header: header,
      success: function (res) {
          if (callback != null) {
              callback(res.data);
          }
      },
      fail: function (res) {
          console.log(res);
          callback(false);
      },
      complete: function (res) {
          console.log(res);
      
          if (showLoading)
              ApiConfig.CloseLoading();
      }
  })
}
addclassimg(json, callback, showLoading = true) {

  if (showLoading)
      ApiConfig.ShowLoading();

  var header = ApiConfig.GetHeader();
  console.log(header);
  console.log(json);
  wx.request({
      url: ApiConfig.GetApiUrl() + 'College/addclassimg',
      data: json,
      method: 'POST',
      dataType: 'json',
      header: header,
      success: function (res) {
          if (callback != null) {
              callback(res.data);
          }
      },
      fail: function (res) {
          console.log(res);
          callback(false);
      },
      complete: function (res) {
          console.log(res);
      
          if (showLoading)
              ApiConfig.CloseLoading();
      }
  })
}
classimglist(json, callback, showLoading = true) {

  if (showLoading)
      ApiConfig.ShowLoading();

  var header = ApiConfig.GetHeader();
  console.log(header);
  console.log(json);
  wx.request({
      url: ApiConfig.GetApiUrl() + 'College/classimglist',
      data: json,
      method: 'POST',
      dataType: 'json',
      header: header,
      success: function (res) {
          if (callback != null) {
              callback(res.data);
          }
      },
      fail: function (res) {
          console.log(res);
          callback(false);
      },
      complete: function (res) {
          console.log(res);
      
          if (showLoading)
              ApiConfig.CloseLoading();
      }
  })
}
delclass(json, callback, showLoading = true) {

  if (showLoading)
      ApiConfig.ShowLoading();

  var header = ApiConfig.GetHeader();
  console.log(header);
  console.log(json);
  wx.request({
      url: ApiConfig.GetApiUrl() + 'College/delclass',
      data: json,
      method: 'POST',
      dataType: 'json',
      header: header,
      success: function (res) {
          if (callback != null) {
              callback(res.data);
          }
      },
      fail: function (res) {
          console.log(res);
          callback(false);
      },
      complete: function (res) {
          console.log(res);
      
          if (showLoading)
              ApiConfig.CloseLoading();
      }
  })
}
delmsg(json, callback, showLoading = true) {

  if (showLoading)
      ApiConfig.ShowLoading();

  var header = ApiConfig.GetHeader();
  console.log(header);
  console.log(json);
  wx.request({
      url: ApiConfig.GetApiUrl() + 'College/delmsg',
      data: json,
      method: 'POST',
      dataType: 'json',
      header: header,
      success: function (res) {
          if (callback != null) {
              callback(res.data);
          }
      },
      fail: function (res) {
          console.log(res);
          callback(false);
      },
      complete: function (res) {
          console.log(res);
      
          if (showLoading)
              ApiConfig.CloseLoading();
      }
  })
}
delfile(json, callback, showLoading = true) {

  if (showLoading)
      ApiConfig.ShowLoading();

  var header = ApiConfig.GetHeader();
  console.log(header);
  console.log(json);
  wx.request({
      url: ApiConfig.GetApiUrl() + 'College/delfile',
      data: json,
      method: 'POST',
      dataType: 'json',
      header: header,
      success: function (res) {
          if (callback != null) {
              callback(res.data);
          }
      },
      fail: function (res) {
          console.log(res);
          callback(false);
      },
      complete: function (res) {
          console.log(res);
      
          if (showLoading)
              ApiConfig.CloseLoading();
      }
  })
}
delclassimg(json, callback, showLoading = true) {

  if (showLoading)
      ApiConfig.ShowLoading();

  var header = ApiConfig.GetHeader();
  console.log(header);
  console.log(json);
  wx.request({
      url: ApiConfig.GetApiUrl() + 'College/delclassimg',
      data: json,
      method: 'POST',
      dataType: 'json',
      header: header,
      success: function (res) {
          if (callback != null) {
              callback(res.data);
          }
      },
      fail: function (res) {
          console.log(res);
          callback(false);
      },
      complete: function (res) {
          console.log(res);
      
          if (showLoading)
              ApiConfig.CloseLoading();
      }
  })
}
}
