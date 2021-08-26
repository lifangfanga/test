<template>
  <el-form :inline="true"
           :ref="refName"
           :model="form">
    <div v-for=" (item, i) in formData"
         :key="i">
      <el-form-item :label="item.label"
                    style="display:inline-block;"
                    :prop="item.prop"
                    :label-width="item.width">
        <el-input :type="item.type"
                  style="display:inline-block;"
                  v-model="form[item.prop]">
        </el-input>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  name: 'lf-form',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      formData: this.data,
      refName: '',
      form: {}
    }
  }
}
</script>
<style>
::v-deep.el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 305px;
}
.el-form el-form--inline {
  display: inline-block;
}
</style>
