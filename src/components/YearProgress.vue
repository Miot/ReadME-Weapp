<template>
    <div class="progressbar">
        <progress :percent='percent' activeColor='#d1c7b7'></progress> 
        <p>{{year}}已经过去了{{days}}天，{{percent}}%</p>
    </div>
</template>

<script>
export default {
  methods: {
    isLeapYear () {
      const year = new Date().getFullYear()
      return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)
    },
    getDayOfYear () {
      return this.isLeapYear() ? 366 : 365
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    days () {
            // 设置那年的第一天
      let start = new Date()
      start.setMonth(0)
      start.setDate(1)
            // 时间差
            // offset是毫秒
      let offset = new Date().getTime() - start.getTime()
      return parseInt(offset / 1000 / 3600 / 24) + 1
    },
    percent () {
      return (this.days * 100 / this.getDayOfYear()).toFixed(1)
    }
  }
}
</script>

<style lang='scss'>
.progressbar{
    text-align: center;
    width: 100%;
    margin-bottom: 40px;
    progress{
        margin: 10px 0;
    }
}
</style>

