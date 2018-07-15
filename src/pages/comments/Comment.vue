<template>
  <div class="container">
    <!-- <CommentList v-if="userinfo.openId" :comments="comments" type='user'></CommentList> -->
    <div v-if="userinfo.openId">
      <div class="page-title">我的图书</div>
      <Card v-for="book in books" :key="book.id" :book='book'></Card>
      <p class="text-footer" v-if="books.length">没有更多了</p>
      <div v-if="!books.length" class="tips"><p>暂时还未添加过书，快去添加几本吧</p></div>
    </div>
    <div v-else class="tips">
      <p>您还未登录，请前往登录</p>
      <div class="btn" @click="goLogin">前往登录</div>
    </div>
  </div>
</template>

<script>
import {get} from '@/util'
import CommentList from '@/components/CommentList'
import Card from '@/components/Card'

export default {
  data () {
    return {
      comments: [],
      books: [],
      userinfo: {}
    }
  },
  components: {
    CommentList,
    Card
  },
  methods: {
    async getComments () {
      const comments = await get('/weapp/commentlist', {openid: this.userinfo.openId})
      this.comments = comments.list
    },

    init () {
      wx.showNavigationBarLoading()
      // this.getComments()
      this.getBooks()
      wx.hideNavigationBarLoading()
    },

    async getBooks () {
      const books = await get('/weapp/booklist', {openid: this.userinfo.openId})
      this.books = books.list
    },

    goLogin () {
      wx.switchTab({url: '../me/main'})
    }
  },
  onShow () {
    if (!this.userinfo.openId) {
      let userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        this.userinfo = userinfo
        this.init()
      }
    }
  },
  onPullDownRefresh () {
    this.init()
    wx.stopPullDownRefresh()
  }
}
</script>

<style lang='scss'>
.container{
  height: 720rpx;
}
.tips{
  height: 20px;
  text-align: center;
  font-size: 13px;
  margin: 30px 10px;
  p{
    margin-bottom: 20px;
    color: #d1c7b7;
  }
}
</style>
