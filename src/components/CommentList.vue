<template>
    <div class="comment-list">
        <div class="page-title" v-if="comments.length">
            {{type === 'user'?'我的短评':'短评'}}
        </div>
        <div class="comment" v-for="comment in comments" :key="comment.id" @click="handleClick(comment)">
            <div class="user">
                <div class="left">
                    <img :src="comment.image" class="avatar" mode="aspectFit">
                    {{comment.title}}
                </div>
                <div class="right">
                    <img src="../../static/img/location.png" class="img" v-if="comment.location">{{comment.location}} 
                    <img src="../../static/img/phone.png" class="img" v-if="comment.phone">{{comment.phone}}
                </div>
            </div>
            <div class="content">
                {{comment.comment}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['comments', 'type'],
  methods: {
    handleClick (comment) {
      if (this.type === 'user') {
        wx.navigateTo({
          url: '/pages/detail/main?id=' + comment.bookid
        })
      } else {
        return
      }
    }
  }

}
</script>

<style lang='scss' scoped>
.comment-list{
    background-color: #eee;
    font-size: 12px;
    .comment{
        background-color: #fff;
        margin-top: 4px;
        padding: 5px 10px 8px;
        border-bottom: 1px solid #d1c7b7;
        .user{
            height: 20px;
            line-height: 20px;
            .left{
                float: left;
                vertical-align: middle;
                .avatar{
                    position: relative;
                    top: 4px;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                }
            }
            .right{
                .img{
                    position: relative;
                    top: 4px;
                    right: 2px;
                    width: 18px;
                    height: 18px;
                }
            }
        }
        .content{
            display: block;
            margin-top: 10px;
            font-size: 13px;
        }
    }
}
</style>
