<template>
    <div class="container">
      <div class="userinfo">
        <img :src="userinfo.avatarUrl" alt="">
        <p>{{userinfo.nickName}}</p>
      </div>

      <YearProgress></YearProgress>

      <button v-if="userinfo.openId" class='btn' @click="scanBook">添加图书</button>
      <button v-else open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">立即登录</button>
    </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import YearProgress from '@/components/YearProgress'
import {showSuccess, showModal, post} from '@/util'
import config from '@/config'

export default {
  components: {
    YearProgress
  },
  data () {
    return {
      userinfo: {
        avatarUrl: 'http://image.shengxinjing.cn/rate/unlogin.png',
        nickName: ''
      }
    }
  },
  methods: {
    login (e) {
      let _this = this
      wx.showLoading({
        title: '登录中'
      })
      // 查看是否授权
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            // 检查用户登录是否过期
            // wx.checkSession({
            //   success: function () {
            //     wx.hideLoading()
            //     showSuccess('登录成功')
            //   },
            //   fail: function () {
                // 过期 重新登录 先清除登录的状态
            qcloud.clearSession()
                // 构造登录需要的加密信息
            var options = {
              encryptedData: e.mp.detail.encryptedData,
              iv: e.mp.detail.iv,
              userinfo: e.mp.detail.userInfo
            }
            _this.getWxLogin(options)
              // }
            // })
          } else {
            wx.hideLoading()
            showModal('用户未授权', e.mp.detail.errMsg)
          }
        }
      })
    },

    getWxLogin ({encryptedData, iv, userinfo}) {
      let _this = this
      wx.login({
        success: function (loginResult) {
          var loginParams = {
            code: loginResult.code,
            encryptedData: encryptedData,
            iv: iv
          }
          qcloud.setLoginUrl(config.loginUrl)
          qcloud.login({
            loginParams,
            success () {
              // 获取用户信息
              qcloud.request({
                url: config.userUrl,
                login: true,
                success (userRes) {
                  wx.hideLoading()
                  showSuccess('登录成功')
                  wx.setStorageSync('userinfo', userRes.data.data)
                  _this.userinfo = userRes.data.data
                }
              })
            },
            fail (error) {
              wx.hideLoading()
              showModal('登录失败', error)
            }
          })
        },
        fail: function (loginError) {
          wx.hideLoading()
          showModal('登录失败', loginError)
        }
      })
    },

    scanBook () {
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            this.addBook(res.result)
          }
        }
      })
    },

    async addBook (isbn) {
      const res = await post('/weapp/addbook', {
        isbn,
        openid: this.userinfo.openId
      })
      showModal('添加成功', `《${res.title}》`)
    }
  },
  onShow () {
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  }
}
</script>

<style lang='scss'>
  .container{ 
    padding:0 30rpx; 
  } 
  .userinfo{ 
    margin-top:100rpx; 
    text-align:center; 
    img{ 
      width: 150rpx; 
      height:150rpx; 
      margin: 20rpx; 
      border-radius: 50%; 
      border: 7rpx solid #d1c7b7;
    } 
  }
</style>


