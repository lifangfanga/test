/*
*
* 自定义组件
*
*/
// import Vue from 'vue'
// Vue.component('yk-pagination', () => import('./yk-pagination/index.vue'))

import ykPagination from '@/components/yk-pagination/index.vue'
import ykTable from '@/components/yk-table/index.vue'
import ykTableColumn from '@/components/yk-table/yk-table-column.vue'
import lfForm from '@/components/lf-form/index.vue'
import liDialog from '@/components/li-dialog/index.vue'
// 组件安装
function vComponent (Vue) {
  // 组件是否已安装
  if (vComponent.installed) {
    return
  }
  Vue.component('ykPagination', ykPagination)
  Vue.component('ykTable', ykTable)
  Vue.component('ykTableColumn', ykTableColumn)
  Vue.component('lfForm', lfForm)
  Vue.component('liDialog', liDialog)
}
// 导出组件
export default vComponent
