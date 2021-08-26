<template>
  <yk-container>
    <div slot="header">
      <van-nav-bar :title="$route.meta.title"
                   left-arrow
                   @click-left="$router.go(-1)">
      </van-nav-bar>
    </div>
    <div class="full-page"
         flex="dir:top">
      <div class="white-bg pad"
           flex-box="0">
        <div class="color-dark"
             style="font-weight:bold;font-size:15px;">现场环节工程总耗时：38.5天</div>
        <div style="font-size:13px;"
             class="mar-t color-light">此工程为35kV以上双电源功能，需在41天内完成</div>
      </div>
      <!--流程图-->
      <div class="mar-t white-bg full-wrap"
           flex-box="1">
        <ul class="state-wrap full-page full-auto">
          <li :class="item.spendTime ?'finished':'passed'"
              v-for="( item , i) in list"
              :key="i+''+item.id">
            <div class="li-line-bottom pad-b ">
              <div flex="main:justify">
                <div class="proj-state">{{item.label}}
                  <span v-if="item.spendTime===0">
                    <van-icon size="30"
                              :name="getIcon()"></van-icon>
                  </span>
                </div>
                <div :class="item.spendTime ?'color-theme':'color-danger'"
                     style="font-size: 12px;">{{item.title}}： {{item.prop}}</div>
              </div>
              <div class="color-sty mar-t spend-time ">标准时长： {{item.prop}}
              </div>
              <div :class="item.spendTime ?'color-theme':'color-danger'">{{item.link}}
                <span class="color-sty spend-time"> 操作人：{{item.prop}}</span>
              </div>
              <div class="color-light  mar-t spend-time ">开始时间： {{item.prop}}
              </div>
              <div class="color-light  mar-t spend-time ">完成时间：{{item.prop}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </yk-container>
</template>

<script>

export default {
  name: 'gaoya-cost',
  data () {
    return {
      list: [
        { label: '现场勘察', prop: '28天', spendTime: 0, title: '已停留', link: '未完成,' },
        { label: '现场勘察', prop: '28天', spendTime: 1, title: '耗时', link: '勘察完成,' }
      ]
    }
  },
  methods: {
    getIcon (name) {
      return `${this.$baseUrl}image/jingdian/icon/warn.png`
    }
  }
}
</script>

<style lang="scss" scoped>
ul.state-wrap > li {
  font-size: 10px;
  padding: 8px 10px 0px 40px;
  position: relative;
}
.li-line-bottom {
  border-bottom: 1px solid #cccccc;
}
// ul.state-wrap > li.unfinished::after,
ul.state-wrap > li.finished::after,
ul.state-wrap > li.passed::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 8px;
  border-radius: 50%;
  z-index: 2;
}
ul.state-wrap > li.finished::after,
ul.state-wrap > li.passed::after {
  width: 18px;
  height: 18px;
}
// 未完成
ul.state-wrap > li.finished::after {
  width: 8px;
  height: 8px;
  background: #ffffff;
  border: 4px solid #3a89fd;
  // content: "";
  // position: absolute;
  // left: 5px;
  // top: 8px;
  // border-radius: 50%;
  // z-index: 2;
}
// 已完成
// ul.state-wrap > li.finished::after {
//   background: lightblue;
// content: "";
// position: absolute;
// left: 5px;
// top: 8px;
//   border-radius: 50%;
// z-index: 2;
// width: 18px;
// height: 18px;
// }
// 逾期
ul.state-wrap > li.passed::after {
  // background: $red;
  width: 8px;
  height: 8px;
  background: #ffffff;
  border: 4px solid red;
  // content: "";
  // position: absolute;
  // left: 5px;
  // top: 8px;
  // border-radius: 50%;
  // z-index: 2;
  // width: 18px;
  // height: 18px;
}
// 线
ul.state-wrap > li::before {
  content: "";
  position: absolute;
  top: 0.6rem;
  bottom: -7%;
  left: 0.3rem;
  width: 0;
  border-right: 2px solid #3a89fd;
  // top: -2rem;
  // bottom: 90%;
  // left: 13px;
}
// ul.state-wrap > li:first-child::before {
//   border: none;
// }
.color-sty {
  color: #666666;
}
.spend-time {
  font-size: 12px;
}
.color-danger {
  color: red;
  margin-top: 8px;
  font-size: 12px;
}
.color-theme {
  color: $theme;
  margin-top: 8px;
  font-size: 12px;
}
.proj-state {
  font-size: 15px;
  font-weight: bold;
}
</style>
