<template>
  <div>
    <TopSwiper :tops='tops'></TopSwiper>
    <Card v-for="book in books" :key="book.id" :book='book'></Card>
    <p class="text-footer" v-if="!more">没有更多数据</p>
  </div>
</template>


<script>

import {get} from '@/util.js'
import Card from '@/components/Card'
import TopSwiper from '@/components/TopSwiper'

export default {
  components: {
    Card,
    TopSwiper
  },

  data () {
    return {
      tops: [],
      books: [],
      page: 0,
      more: true
    }
  },

  methods: {
    async getList (init) {
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      const books = await get('/weapp/booklist', {page: this.page})
      if (books.list.length < 10 && this.page > 0) {
        this.more = false
      }
      if (init) {
        this.books = books.list
        wx.stopPullDownRefresh()
      } else {
        // 上拉加载更多
        this.books = this.books.concat(books.list)
      }
      wx.hideNavigationBarLoading()
    },

    async getTop () {
      const tops = await get('/weapp/top')
      this.tops = tops.list
    }
  },
  // 下拉刷新
  onPullDownRefresh () {
    this.getList(true)
    this.getTop()
  },
  // 触底加载
  onReachBottom () {
    if (!this.more) {
      // 没有更多
      return false
    } else {
      this.page = this.page + 1
      this.getList(false)
    }
  },
  mounted () {
    this.getList(true)
    this.getTop()
  }
}
</script>