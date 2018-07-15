<template>
    <div class="bookinfo">
        <div class="thumb">
            <img :src="info.image" class="back" mode="aspectFill">
            <img :src="info.image" class="img" mode="aspectFit">
            <div class="info">
                <div class="title">{{info.title}}</div>
                <div class="author">{{info.author}}</div>
            </div>
        </div>
        <div class="detail">
            <img :src="userinfo.image" class="avatar" mode="aspectFit">
            {{userinfo.nickName}}
            <div class="right" style="color:#EA5149">
                {{info.rate}}分
                <Rate :value='info.rate'></Rate>
            </div>
        </div>
        <div class="detail">
            {{info.publisher}}
            <div class="right">
                {{info.price}}
            </div>
        </div>
        <div class="tags">
            <div class="badge" v-for="tag in info.tags" :key="tag">{{tag}}</div>
        </div>
        <div class="summary">
            <p v-for="(sum,i) in info.summary" :key="i">{{sum}}</p>
        </div>
    </div>
</template>

<script>
import Rate from '@/components/Rate'

export default {
  components: {
    Rate
  },
  props: ['info'],
  computed: {
    userinfo () {
      return this.info.user_info || {}
    }
  }
}
</script>

<style lang="scss">
.bookinfo{
    font-size: 13px;
    font-family:Microsoft YaHei;
    .badge{
        display: inline-block;
        margin: 3px 6px;
        border-radius: 6px;
        border: 1px solid rgb(230, 206, 165);
        color: rgb(175, 154, 119);
        padding: 5px;
        font-weight: 500;
    }
    .summary{
        margin: 15px 8px 10px 8px;
        &:first-letter{
            font-size: 40px;
            color: #D1C7B7;
        }
        p{
            text-indent: 2em;
            line-height: 1.8em;
        }
    }
    .thumb{
        width: 750rpx;
        height: 500rpx;
        overflow: hidden;
        position: relative;
        .back{
            width:100%;
            filter: blur(10px);
        }
        .img{
            position: absolute;
            height: 300rpx;
            width: 100%;
            left: 0;
            top: 30rpx;
        }
        .info{
            color:white;
            position: absolute;
            width: 100%;
            left: 0;
            top: 330rpx;
            text-align: center;
            .title{
                margin: 8px 0;
                font-size: 20px;
                font-weight: 600;
            }
            .author{
                font-size: 15px;
            }
        }
    }
    .right{
        float: right;
    }
    .detail{
        padding: 5px 10px;
        font-size: 13px;
       
        .avatar{
            height: 20px;
            width: 20px;
            border-radius: 50%;
            vertical-align: middle;
            position: relative;
            bottom: 1px;
        }
    }
}

</style>
