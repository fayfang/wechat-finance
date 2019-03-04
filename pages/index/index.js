//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    titleList: ['当前值', '涨跌值', '涨跌幅', '涨跌值#5', '涨跌幅#5'],
    stockData: {},
    loading: false
  },
  onLoad: function () {
    this.getStockData()
  },
  handleSubmit (e) {
    let formId = e.detail.formId
    this.subcribe(formId)
  },
  subcribe (formId) {
    this.setData({
      loading: true
    })
    wx.login({
      success: (res) => {
        let code = res.code
        let url = `${app.preUrl}/wechat/message/subcribe?code=${code}&formId=${formId}`
        wx.request({
          url: url,
          success: (res) => {
            this.setData({
              loading: false
            })
            wx.showToast({
              title: '订阅成功',
              icon: 'success'
            })
          }
        })
      }
    })
  },
  getStockData () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let url = `${app.preUrl}/wechat/message/stockData`
    wx.request({
      url: url,
      success: (res) => {
        // this.stockData = res.data
        wx.hideLoading()
        this.setData({
          stockData: res.data
        })
      }
    })
  }
})
