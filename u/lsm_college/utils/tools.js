//common.js 

//消息提示
 const msg = (str) => {
  return new Promise((resolve, reject) => {
    uni.showToast({
      title: str,
      icon: "none",
      duration: 2000,
      position: "bottom",
      success: () => {
        resolve;
      },
    });
  });
};

// 成功提示框
 const successToast = (str) => {
  return new Promise((resolve, reject) => {
    uni.showToast({
      title: str,
      icon: "success",
      duration: 2000,
      success: () => {
        resolve();
      },
    });
  });
};

// 显示loading 需要配合hideLoading关闭
 const showLoading = (str) => {
  return new Promise((resolve, reject) => {
    uni.showLoading({
      title: str,
      success: () => {
        resolve();
      },
    });
  });
};

// 隐藏loading
 const hideLoading = () => {
  return new Promise((resolve, reject) => {
    uni.hideLoading({
      success: () => {
        resolve();
      },
    });
  });
};

//获取缓存
 const getStorage = (key, sync = true) => {
  try {
    if (sync) {
      return uni.getStorageSync(key);
    } else {
      let data = "";
      uni.getStorage({
        key: key,
        success: function (res) {
          data = res.data;
        },
      });
      return data;
    }
  } catch (e) {
    return false;
  }
};

//设置缓存
 const setStorage = (key, value, sync = true) => {
  try {
    if (sync) {
      return uni.setStorageSync(key, value);
    } else {
      uni.setStorage({
        key: key,
        data: value,
      });
    }
  } catch (e) {}
};

//移除缓存
 const delStorage = (key, sync = true) => {
  try {
    if (sync) {
      return uni.removeStorageSync(key);
    } else {
      uni.removeStorage({
        key: key,
      });
    }
  } catch (e) {
    return false;
  }
};

//清空缓存
 const clearStorage = (sync = true) => {
  try {
    if (sync) {
      return uni.clearStorageSync();
    } else {
      uni.clearStorage();
    }
  } catch (e) {
    return false;
  }
};

/**
 * 
 * @param {Arr} imgList 传入图片数组 | 单张图片也要传数组perviewImage([url])
 * @param {Number} index 不传默认从第一张开始显示
 * 
 */
const perviewImage = (imgList, index) => {
  uni.previewImage({
    current: index,
    urls: imgList,
    indicator: "number",
    success: function (res) {},
    fail: function (err) {
      console.log(err);
    },
  });
};


export default{
 msg ,
 successToast,
 showLoading,
 hideLoading,
 getStorage,
 setStorage,
 delStorage,
 clearStorage,
 perviewImage
}
