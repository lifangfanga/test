<template>
  <yk-container>
    <div slot="header">
      <div class="">
        <!-- 后台数据 -->
        <div v-for="(item,i) in list"
             :key="i"
             @click="route()">
          <!-- 前端数据 -->
          <div v-for="(child,i) in meterData"
               :key="i">
            <template v-for="list in child"
                      class="box:mean">
              <div :key="list.prop"
                   v-if="item[list.prop]">{{list.title}}:{{item[list.prop]}}

              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </yk-container>
</template>

<script>
import { meterData } from '@/diya/data'
export default {
  data () {
    return {
      components: {
        comment
      },
      list: [],
      meterData: meterData(),
      desingFiles: {
        filename: '设计图纸'
      },
      materFiles: {
        filename: '物资清单'
      }
    }
  },
  methods: {
    // 点击跳转日志
    view () {
      getView(this.proId).then(res => {
        if (res.status === 200) {
          if (res.data.length !== 0) {
            this.$router.push('diya/design/log')
          } else {
            this.$dialog.alert({ message: '暂未生成日志' })
          }
        } else {
          this.$dialog.alert({ message: res.msg || '暂未生成日志' })
        }
      }).catch(() => {
        this.$dialog.alert({ message: '暂未生成日志' })
      })
    }

  }
}
</script>

<style>
</style>
