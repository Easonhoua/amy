//index.js
//获取应用实例
const app = getApp()
const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
let demo2_days_style= [];

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showModal: false,
    year: new Date().getFullYear(),      // 年份
    month: new Date().getMonth() + 1,    // 月份
    day: new Date().getDate(),
    str: MONTHS[new Date().getMonth()],  // 月份字符串
    showLogin: false,
    demo4_days_style: [{month: 'current', day: new Date().getDate(), color: 'black', background: '#ffffff'}],
  },
 
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    const days_count = new Date(this.data.year, this.data.month, 0).getDate();
    let demo4_days_style = new Array;
    for (let i = 1; i <= days_count; i++) {
      if(i==new Date().getDate()){
        demo4_days_style.push({
          month: 'current', day: i, color: 'white',background:'red'
        });
      }else{
        demo4_days_style.push({
          month: 'current', day: i, color: 'black'
        });
      } 
    }
    this.setData({
      demo4_days_style
    });

  },

  godakanext() {
    var that = this
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //用户已经授权过
              wx.navigateTo({
                url: '/pages/selcontent/selcontent',
              })
            }
          });
        }else{
          that.setData({
            showLogin: true
          })
        }
      }
    })
  },

  tuijianhaoyou(){
   this.setData({
    showModal: true
   })
  },

  preventTouchMove(){
    this.setData({
      showModal: false
    })
  },
  goother(){
    wx.navigateToMiniProgram({
      appId: 'wx28d905b80620a1f3',
      success(res) {
        // 打开成功
      }
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      showLogin: false
    })
  }
})
