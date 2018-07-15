<template>
    <div class="swiper">
        <swiper :indicator-dots="true" :autoplay="true" indicator-color='#D1C7B7' indicator-active-color='#eeeeee' :duration="1000" :circular="true">
            <div v-for="(top,imgindex) in imgUrls" :key="imgindex">
                <swiper-item>
                    <img mode='aspectFit' class="slide-image" v-for="(img,index) in top" :src="img.image" :key="index" @click="bookDetail(img.id)">
                </swiper-item>
            </div>
        </swiper>
        <div class="swiper_foot"> <img src="/static/img/read.png"> </div>
    </div>
</template>

<script>
export default {
  props: ['tops'],
  computed: {
    imgUrls () {
      let res = this.tops
      return [res.slice(0, 3), res.slice(3)]
    }
  },
  methods: {
    bookDetail (id) {
      wx.navigateTo({
        url: '/pages/detail/main?id=' + id
      })
    }
  }
}
</script>

<style lang='scss'>
.swiper{
    margin-top: 5px;
    .slide-image{
        width:33%;
        height: 250rpx;
    }
    .swiper_foot{
        width: 100%;
        height: 20px;
        text-align: center;
        position: relative;
        img{
            height: 20px;
            width: 20px;
            line-height: 20px;
            &:before , &:after{
                background: #D1C7B7;
                content: '';
                height: 2px;
                position: absolute;
                top: 50%;
                width: 46%;
            };
            &:before{
                left: 0;
            };
            &:after{
                right: 0;
            }
        }
    }
}
</style>
