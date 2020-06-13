var app = getApp();
const Monohttps = app.globalData.Monohttps;
var dataarr = new Array;
Page({
  data: {
    orangehook: true,
    imagelist: [
      {url:'../../images/1@2x.png',val:'The Washing Maching'},
      {url:'../../images/2@2x.png',val:'The Bath'},
      {url:'../../images/3@2x.png',val:'The Blender'},
      {url:'../../images/4@2x.png',val:'On the Farm'},
      {url:'../../images/5@2x.png',val:'At the Playground'},
      {url:'../../images/6@2x.png',val:'At the Toy Shop'},
      {url:'../../images/7@2x.png',val:'Vacuum Cleaner'},
      {url:'../../images/8@2x.png',val:'At the Zoo'},
      {url:'../../images/9@2x.png',val:'The Cooker'},
      {url:'../../images/10@2x.png',val:'At the Toy Vet'}
  ],
  renwulist:[
      {txt:"游戏娱乐",img:'../../images/game.png'},
      {txt:"手工任务",img:'../../images/shougong.png'},
      {txt:"唱歌跳舞  ",img:'../../images/singsong.png'},
      {txt:"艾米和我",img:'../../images/amyme.png'}
  ],
    curdeta: '',
    currentIndex1: 'none',
    val1:'游戏娱乐',
    currentIndex2: 'none',
    val2:'游戏娱乐',
    maskHidden: true,
    imagePath:'',
    imgurl :'',
    textval:'',
    palhd:'记录和分享今日的学习笔记！'
  },
  onLoad() {
    let that = this;
    var myDate = new Date();
    var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    var month = myDate.getMonth() + 1 > 9 ? myDate.getMonth() + 1 : '0' + (myDate.getMonth() + 1); //获取当前月份(0-11,0代表1月)
    var date = myDate.getDate() > 9 ? myDate.getDate() : '0' + (myDate.getDate()); //获取当前日(1-31)
    that.setData({
      curdeta: year + "年" + month + "月" + date + "日"
    })

    wx.getImageInfo({
      src: app.globalData.userInfo.avatarUrl,
      success: function (res) {
        that.setData({
          imgurl: res.path,
        })
      }
    })
  },
  selstudycon(e) {
    this.setData({
      currentIndex1: e.currentTarget.dataset.index,
      val1: e.currentTarget.dataset.val
    })
  },

  selstudycon2(e){
    this.setData({
      currentIndex2: e.currentTarget.dataset.index,
      val2: e.currentTarget.dataset.val
    })
  },

  bindTextAreaChange(e){
    this.setData({
      textval: e.detail.value
    })
  },

  bindFormSubmit(e) {
    var that = this;
    var bijicontent = that.data.textval||'无'
    wx.setStorageSync('bijicontent', bijicontent)
    if(that.data.val1 ==''){
      wx.showToast({
        title: '请选择学习主题',
        icon:'none'
      })
      return;
    }
    if(that.data.val2 ==''){
      wx.showToast({
        title: '请选择活动主题',
        icon:'none'
      })
      return;
    }
    that.setData({
      maskHidden: false,
      textval: '',
      palhd:''
    });
    wx.showLoading({
      title: '图片生成中...',
    });
    setTimeout(function() {
      wx.hideToast()
      that.createNewImg();
      that.setData({
        maskHidden: false
      });
    }, 1000)
  },

  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg() {
   var that = this;
   var bijicontent = wx.getStorageSync('bijicontent')
    var txt1 = that.data.val1 
    var txt2 = that.data.val2
    var context = wx.createCanvasContext('mycanvas');
    var qrCode = "../../images/amyqrCode.jpg";
    var path = "../../images/newbg.jpg";
    context.drawImage(path, 0, 0, 375, 667);
    //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
    
    context.setFontSize(20);
    context.setFillStyle('#000000');
    context.setTextAlign('center');
    context.fillText("我的艾米学习记录", 187.5, 60);

    context.setFontSize(14);
    context.setFillStyle('#000000');
    context.fillText("我今天学习了《" + txt1 + "》EMYS主题课程，", 187.5, 100);

    context.setFontSize(14);
    context.setFillStyle('#000000');
    context.fillText("坚持学习，每一天都是新起点。", 187.5, 120)

    var draw = function (x, y, width, height, radius, color, type) {
      context.beginPath();
      context.moveTo(x, y + radius);
      context.lineTo(x, y + height - radius);
      context.quadraticCurveTo(x, y + height, x + radius, y + height);
      context.lineTo(x + width - radius, y + height);
      context.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
      context.lineTo(x + width, y + radius);
      context.quadraticCurveTo(x + width, y, x + width - radius, y);
      context.lineTo(x + radius, y);
      context.quadraticCurveTo(x, y, x, y + radius);
      context[type + 'Style'] = color || params.color;
      context.closePath();
      context[type]();
    }
    draw(15, 380, 341, 147, 15, '#ffffff', 'fill')

    context.setFontSize(18);
    context.setTextAlign('left');
    context.setFillStyle('#000000');
    context.fillText(app.globalData.userInfo.nickName, 100, 416);

    context.setFontSize(12);
    context.setFillStyle('#555555');
    context.fillText("刚刚在艾米的监督下完成学习打卡", 100, 436);


    context.setFontSize(12);
    context.setFillStyle('#555555');
    context.fillText("伙伴们加入艾米一起学习吧", 100, 456);

    context.setFontSize(14);
    context.setTextAlign('center');
    context.setFillStyle('#000000');
    context.fillText("我的留言", 187.5, 480);

    context.setFontSize(12);
    context.setFillStyle('#555555');
    context.fillText(bijicontent, 187.5, 510);

    draw(15, 540, 341, 99, 15, '#ffffff', 'fill')

    context.setFontSize(16);
    context.setTextAlign('left');
    context.setFillStyle('#000000');
    context.fillText("【艾米英语玩伴】", 32, 574);

    context.setFontSize(16);
    context.setFillStyle('#000000');
    context.fillText("玩益智游戏,说纯正英语", 32, 596);

    draw(28, 608, 120, 20, 10, '#eb5a28', 'fill');

    context.setFontSize(12);
    context.setFillStyle('#ffffff');
    context.fillText("长按识别二维码", 36, 622);

    context.save()
    context.beginPath()
    context.arc(55, 420, 30, 0, 2 * Math.PI) //画出圆
    context.clip(); //裁剪上面的圆形
    context.drawImage(that.data.imgurl, 25, 390, 60, 60); // 在刚刚裁剪的园上画图
    context.restore()

    context.save()
    context.beginPath()
    context.arc(300, 590, 40, 0, 2 * Math.PI); //画出圆
    context.clip(); //裁剪上面的圆形
    context.drawImage(qrCode, 260, 550, 80, 80); // 在刚刚裁剪的园上画图
    context.restore()
    context.draw()

    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    setTimeout(function() {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          that.setData({
            imagePath: tempFilePath,
          });
          wx.hideLoading();
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 200);
  },
  baocun () {
    let that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              /* 该隐藏的隐藏 */
              that.setData({
                maskHidden: true
              })
            }
          }, fail: function (res) {
            console.log('保存失败')
          }
        })
      }
    })
  }
})