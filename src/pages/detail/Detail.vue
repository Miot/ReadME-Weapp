<template>
    <div class="container">
        <BookInfo :info='info'></BookInfo>
        <!-- <CommentList :comments='comments'></CommentList> 
        <div class="comment" v-if="showAdd">
            <textarea v-model="comment" class="textarea" :maxlength='100' placeholder='我的图书短评：' placeholder-class="phClass"></textarea>
            <div class="location">
                我的位置：
                <switch color='#D1C7B7' @change="getGeo" :checked="location"></switch>   
                <span class="text-primary">{{location}}</span>
            </div>
            <div class="phone">
                我的手机：
                <switch color='#D1C7B7' @change="getPhone" :checked="phone"></switch>   
                <span class="text-primary">{{phone}}</span>
            </div>
            <button class="btn" @click="addComment">提交</button>
        </div>
        <div v-else class="text-footer comment-footer">
            您未登录或者已经评论过啦
        </div> -->
        <button class="btn" open-type="share">转发给好友</button>
    </div>
</template>

<script>
import {get, post, showModal} from '@/util'
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'

export default {
  components: {
    BookInfo,
    CommentList
  },
  data () {
    return {
      userinfo: {},
      bookid: '',
      info: {},
      comment: '',
      location: '',
            // proLocation:'',
      phone: '',
      sameLocation: false,
      init: true,
      comments: []
    }
  },
  computed: {
    showAdd () {
      if (!this.userinfo.openId) {
        // 没登录
        return false
      } else if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
        // 已评论的
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    async getDetail () {
      const info = await get('/weapp/bookdetail', {id: this.bookid})
      wx.setNavigationBarTitle({
        title: info.title
      })
      this.info = info
    },

    getGeo (e) {
      let _this = this
      if (e.target.value) {
            // 选中
        if (this.init) {
          wx.getLocation({
            success: function (res) {
              var locationString = res.latitude + ',' + res.longitude
              wx.request({
                url: 'https://apis.map.qq.com/ws/geocoder/v1/',
                data: {
                  'key': 'FCKBZ-HQ3C6-5AUS7-M6YPA-7LSFT-CHFAG',
                  'location': locationString
                },
                method: 'GET',
                success: function (r) {
                  _this.location = r.data.result.ad_info.city
                                    // _this.proLocation = r.data.result;
                  try {
                    wx.setStorageSync('locationInfo', _this.location)
                  } catch (e) {
                    showModal(e)
                  }
                }
              })
            }
          })
          this.init = false
        } else {
          _this.location = wx.getStorageSync('locationInfo')
        }
      } else {
            // 没选中
        this.location = ''
      }
    },

    getPhone (e) {
      if (e.target.value) {
            // 选中
        this.phone = wx.getSystemInfoSync().model
      } else {
            // 没选中
        this.phone = ''
      }
    },

    async addComment () {
      if (!this.comment) {
        return
      }
      const data = {
        bookid: this.bookid,
        openid: this.userinfo.openId,
        comment: this.comment,
        location: this.location,
        phone: this.phone
      }
      try {
        await post('/weapp/addcomment', data)
        this.comment = ''
        this.getComments()
      } catch (e) {
        showModal('失败', e.msg)
      }
    },

    async getComments () {
      this.comments = (await get('/weapp/commentlist', {bookid: this.bookid})).list
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.phone = wx.getSystemInfoSync().model
    this.getDetail()
    // this.getComments()
        // wx.showShareMenu();
    wx.getStorageSync('locationInfo') === '' ? this.init = true : this.init = false
    if (wx.getStorageSync('userinfo')) {
      this.userinfo = wx.getStorageSync('userinfo')
    };
  },
  onShareAppMessage: function (res) {
    return showModal('', '已转发')
  }
}
</script>

<style lang='scss'>
.comment{
    font-size: 12px;
    padding: 10rpx;
    .textarea{
        width: 717rpx;
        height: 130rpx;
        border: 1px solid #D1C7B7;
        padding: 3px;
        font-size: 13px;
    }
    .phClass{
        color:#D1C7B7;
    }
    .location, .phone{
        margin: 5px;
        color:#a1a1a1;
        span{
            color:#a1a1a1;
        }
        switch{
            transform:scale(0.9) !important;
        }
    }
}
.comment-footer{
  margin-top: 10px;
}
.container{
  .btn{
    margin: 0 6px;
  }
}
</style>
