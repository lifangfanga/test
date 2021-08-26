<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
-->

<template>
  <div class="order-box">
    <!-- 头部组件 -->
    <li-header :name="'我的订单'">
      <template v-slot:right>
        <van-icon size='15'
                  name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
      </template>
    </li-header>
    <!-- tab组件 -->
    <li-tab :tabsData="orderTabs"
            :type="'line'"
            :color="'#1baeae'"
            class="order-tab"
            :titleActivrColor="'#1baeae'"
            @tab-change="tabChange" />
    <van-pull-refresh v-model="refreshing"
                      @refresh="onRefresh"
                      class="order-list-refresh">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                @offset="300">
        <div v-for="(item,i) in list"
             :key="i"
             class="order-item-box">
          <div flex="cross:center main:center">
            <div class="time"
                 flex-box="1">订单时间：{{ item.createTime }}</div>
            <div class="time"
                 flex-box="0">{{item.orderStatusString}}</div>
          </div>
          <van-card v-for="one in item.newBeeMallOrderItemVOS"
                    :key="one.orderId"
                    :num="one.goodsCount"
                    :price="one.sellingPrice"
                    desc="全场包邮"
                    :title="one.goodsName"
                    :thumb="prefix(one.goodsCoverImg)" />
        </div>
        <!-- <div v-for="(item, index) in list"
               :key="index"
               class="order-item-box"
               @click="goTo(item.orderNo)">
            <div class="order-item-header">
              <span>订单时间：{{ item.createTime }}</span>
              <span>{{ item.orderStatusString }}</span>
            </div>
            <van-card v-for="one in item.newBeeMallOrderItemVOS"
                      :key="one.orderId"
                      :num="one.goodsCount"
                      :price="one.sellingPrice"
                      desc="全场包邮"
                      :title="one.goodsName"
                      :thumb="prefix(one.goodsCoverImg)" />
          </div> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// import sHeader from '@/components/SimpleHeader'
import { orderTabs } from './data'
import { getOrderList } from '../../service/order'
import { prefix } from '@/common/js/utils'

export default {
  data () {
    return {
      status: '',
      orderTabs: orderTabs,
      loading: false,
      finished: false,
      refreshing: false,
      list: [],
      page: 1
    }
  },
  components: {
    // sHeader
  },
  async mounted () {
    // this.loadData()
  },
  methods: {
    async loadData () {
      const { data, data: { list } } = await getOrderList({ pageNumber: this.page, status: this.status })
      this.list = this.list.concat(list)
      this.totalPage = data.totalPage
      this.loading = false;
      if (this.page >= data.totalPage) this.finished = true
    },
    // tab栏切换
    tabChange (name, title) {
      this.status = name
      this.onRefresh()
    },
    goTo (id) {
      this.$router.push({ path: `order-detail?id=${id}` })
    },
    goBack () {
      this.$router.go(-1)
    },
    onLoad () {
      if (!this.refreshing && this.page < this.totalPage) {
        this.page = this.page + 1
      }
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }
      this.loadData()
    },
    onRefresh () {
      this.refreshing = true
      this.finished = false
      this.loading = true
      this.page = 1
      this.onLoad()
    },
  }
}
</script>

<style lang="less" scoped>
@import "../../common/style/mixin";
.order-box {
  .order-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .order-name {
      font-size: 14px;
    }
  }
  .order-tab {
    margin-top: 42px;
    position: fixed;
    left: 0;
    z-index: 9000;
    width: 100%;
  }
  .order-list-refresh {
    margin-top: 68px;
    .van-card__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .van-pull-refresh__head {
      background: #f9f9f9;
    }
    .van-list {
      min-height: calc(100vh - 88px);
      background: #f9f9f9;
      margin-top: 20px;
    }
    // .order-item-box {
    //   margin: 20px 10px;
    //   background-color: #fff;
    //   .order-item-header {
    //     padding: 10px 20px 0 20px;
    //     display: flex;
    //     justify-content: space-between;
    //   }
    //   .van-card {
    //     background-color: #fff;
    //     margin-top: 0;
    //   }
    // }

    // 写在v-for的循环里面 margin 外边距上下20px,左右0px
    .order-item-box {
      margin: 20px 0;
      background-color: #fff;
      .time {
        // 内部文字可以给一个内边距
        margin: 10px;
        font-size: 12px;
      }
      .van-card {
        background-color: #fff;
      }
    }
  }
}
</style>
