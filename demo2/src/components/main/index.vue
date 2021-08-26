<template>
  <div class=""
       flex="dir:left">
    <div flex-box="0"
         class="left-city">
      <div v-for="item in cities"
           :key="item">
        <img src="@/assets/city.png"
             :class="['city',city.orgNo===search.actived?'search-actived':'']"
             :title="item.orgName"
             @click="citySelect" />
        <span class="city-name">{{item.orgName}}</span>
      </div>
    </div>
    <div flex-box="1"
         flex="dir:top">
      <div class="top-btn"
           flex="dir:left">
        <div v-for="btn in btns"
             :key="btn.code">
          <img src="@/assets/top_btn.png"
               class="btn" />
          <span class="btn-name">{{btn.label}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'main',
  data () {
    return {
      cities: [{ orgName: '国网湖南电力', orgNo: '0111' }, { orgName: '湖南省电力公司', orgNo: '0111' }, { orgName: '国网湖南电力', orgNo: '0111' }, { orgName: '湖南省电力公司' }, { orgName: '国网湖南电力' }, { orgName: '湖南省电力公司' }, { orgName: '国网湖南电力' }, { orgName: '湖南省电力公司' }, { orgName: '国网湖南电力' }, { orgName: '湖南省电力公司' }, { orgName: '国网湖南电力' }, { orgName: '湖南省电力公司' }],
      btns: [
        { label: '低压', code: 0 },
        { label: '高压有配套', code: 1 },
        { label: '低压有配套', code: 2 }
      ]
    }
  },
  methods: {
    citySelect () { }

  }
}
</script>

<style lang="scss" scoped>
.left-city {
  z-index: 99;
  width: 10%;
  // 绝对定位
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  max-height: 75%;
  overflow-y: scroll;
  .city {
    height: 30px;
    width: 90%;
    // background: url("./image/top_btn.png") no-repeat;
    cursor: pointer;
  }
  .search-actived {
  }
  .city-name {
    display: block;
    // 文字不换行
    white-space: nowrap;
    // 超过文本框的长度展示...
    text-overflow: ellipsis;
    font-size: 12px;
    // color: #fff;
  }
}
.top-btn {
  justify-content: center;
  .btn {
    height: 60px;
    width: 200px;
  }
  .btn-name {
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 12px;
  }
}
</style>
