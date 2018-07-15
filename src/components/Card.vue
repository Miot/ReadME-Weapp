<template>
<a :href="detailUrl">
    <div class="book-card">
        <div class="thumb" @click.stop="preview">
            <img :src="book.image" class="image" mode="aspectFit">
        </div>
        <div class="detail text-primary">
            <div class="row">
                <div class="right" style="color:#EA5149">
                    {{book.rate}}<Rate :value='book.rate'></Rate>
                </div>
                <div class="left" style="font-weight:600">
                    {{book.title}}
                </div>
            </div>
            <div class="row">
                <div class="right">
                    人气: {{book.count}}
                </div>
                <div class="left">
                    By: {{book.author===''?'（无）':book.author}}
                </div>
            </div>
            <div class="row">
                <div class="right">
                    Up: {{book.user_info.nickName}}
                </div>
                <div class="left">
                    {{book.publisher}}
                </div>
            </div>
        </div>
    </div>
</a>
</template>
<script>
import Rate from '@/components/Rate'

export default {
  components: {
    Rate
  },
  props: ['book'],
  computed: {
    detailUrl () {
      return '/pages/detail/main?id=' + this.book.id
    }
  },
  methods: {
    preview () {
      wx.previewImage({
        urls: [this.book.image]
      })
    }
  }
}
</script>
<style lang='scss' scoped>
    .book-card{
        padding: 5px;
        overflow: hidden;
        margin: 5px 0;
        font-size: 13.5px;
        .thumb{
            width: 90px;
            height: 90px;
            float: left;
            margin:0 auto;
            overflow: hidden;
            .image{
                max-width: 100%;
                max-height: 100%;
            }
        }
        .detail{
            margin-left: 100px;
            .row{
                line-height: 20px;
                margin-bottom: 3px;
            }
        }
        .right{
            float: right;
        }
        .left{
            margin-right: 80px;
        }
    }
</style>
