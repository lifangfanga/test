<!--
    /**
     * 表单组件
     * 调用说明：
     * label                      名称
     * prop                       关联字段
     * propStart                  类型为daterange时，关联开始时间字段
     * propEnd                    类型为daterange时，关联结束时间字段
     * must                       是否必填验证
     * dict                       选择框及树形下拉框的字典：格式{label: '字典名称', code: '01'}
     * defaultProps               树形下拉框 树结构的props
     * type                       类型
     *      -text                 输入框
     *      -number               数字输入框
     *      -textarea             文本域
     *      -radio                单选框
     *      -radio                单选框
     *      -switch               下拉选择框
     *      -select-tree          树形下拉选择框
     *      -date                 日期选择
     *      -datetime             日期带时分秒
     *      -daterange            日期范围选择
     *      -row-slot             整行自定义插槽
     *      -slot                 局部自定义插槽（保留了label)
     * dateFormat                 日期的格式化，默认yyyy-MM-dd
     * methods
     *      -validate(callback)   表单验证
     *      -getForm()            返回表单数据
     *      -reset()              重置表单
     */
-->
<template>
  <el-form :inline="inline"
           :model="form"
           :rules="rules"
           :label-position="labelPosition"
           :ref="refName"
           size="mini"
           style="margin-bottom: -18px;"
           :validate-on-rule-change="false">
    <template v-for="(item, i) in filterData">
      <!-- 整行自定义插槽 -->
      <div v-if="item.type === 'row-slot'"
           :key="item.prop || i">
        <slot v-if="$slots[item.prop]"
              :name="item.prop" />
      </div>
      <!-- 表单默认类型 -->
      <el-form-item v-else
                    :key="item.prop || i"
                    :ref="'form_item_' + item.prop"
                    :label="item.labelHide === true ? '' : item.label"
                    :label-width="item.labelWidth || labelWidth "
                    :prop="item.prop"
                    :style="{width: `${item.width||'auto'}`}">
        <!-- 文本框\文本域 -->
        <el-input v-if="['text','textarea', 'number'].indexOf(item.type) !== -1"
                  :type="item.type"
                  :maxlength="item.maxlength"
                  :readonly="item.readonly"
                  :style="{width: _defaultWidth(item)}"
                  :autosize="item.autosize"
                  :placeholder="item.placeholder || item.label"
                  v-model="form[item.prop]"
                  clearable
                  @change="_handleChange(item)" />
        <!-- 单选框 -->
        <el-radio-group v-if="item.type === 'radio'"
                        v-model="form[item.prop]"
                        @change="_handleChange(item)">
          <el-radio v-for="v in item.dict"
                    :key="v.code"
                    :label="v.code"
                    :disabled="item.readonly">{{v.label}}</el-radio>
        </el-radio-group>
        <!-- 下拉框 -->
        <el-select v-if="item.type === 'select'"
                   :multiple="!!item.multiple"
                   :collapse-tags="!!item.collapseTags"
                   :disabled="item.readonly"
                   :placeholder="item.placeholder"
                   :clearable="item.clearable"
                   :popper-class="item.class"
                   :style="{width: _defaultWidth(item)}"
                   v-model="form[item.prop]"
                   @change="_handleChange(item)">
          <el-option v-if="item.all"
                     label="全部"
                     value></el-option>
          <el-option v-for="(val, i) in (dicts[item.prop] || [])"
                     :key="`${item.prop}_${val.code}` || i"
                     :label="val.label"
                     :value="val.code"></el-option>
        </el-select>
        <!-- 开关你 -->
        <el-switch v-if="item.type ==='switch'"
                   v-model="form[item.prop]"
                   :active-color="item.activeColor"
                   :inactive-color="item.inactiveColor"
                   :active-value="item.activeValue"
                   :inactive-value="item.inactiveValue"
                   @change="_handleChange(item)">
        </el-switch>
        <!-- 日期选择 -->
        <el-date-picker v-if=" ['date','datetime', 'year'].indexOf(item.type) !== -1"
                        :type="item.type"
                        :readonly="item.readonly"
                        :placeholder="item.placeholder"
                        :value-format="item.dateFormat"
                        :picker-options="item.pickerOptions || {}"
                        :clearable="item.clearable"
                        :popper-class="item.class"
                        :style="{width: _defaultWidth(item)}"
                        v-model="form[item.prop]"
                        @change="_handleChange(item)" />
        <!-- 年度选择 -->
        <!-- <el-date-picker v-if="item.type === 'yearSelect'"
                        type="year"
                        :readonly="item.readonly"
                        placeholder="选择年"
                        :value-format="item.dateFormat ||'yyyy'"
                        :clearable="item.clearable"
                        :style="{width: `${item.inputWidth || '192px'}`}"
                        v-model="form[item.prop]"
                        @change="_handleChange(item)" /> -->
        <!-- 日期级联选择 -->
        <el-date-picker v-if="item.type === 'daterange'"
                        :type="item.type"
                        :readonly="item.readonly"
                        :clearable="item.clearable"
                        :popper-class="item.class"
                        :value-format="item.dateFormat"
                        :picker-options="item.pickerOptions || {}"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :style="{width: _defaultWidth(item, '220px')}"
                        v-model="daterange[i]"
                        @change="_daterangeChange($event, item)"></el-date-picker>
        <!-- 月份级联选择 -->
        <el-date-picker v-if="item.type === 'monthrange'"
                        :type="item.type"
                        :readonly="item.readonly"
                        :clearable="item.clearable"
                        :popper-class="item.class"
                        :picker-options="item.pickerOptions || {}"
                        range-separator="至"
                        start-placeholder="开始月份"
                        end-placeholder="结束月份"
                        :style="{width: _defaultWidth(item, '220px')}"
                        v-model="monthrange[i]"
                        @change="_monthrangeChange($event, item, i)"></el-date-picker>

        <!-- 下拉树形结构,默认树形结构返回id -->
        <tree-select v-if="item.type === 'select-tree'"
                     style="display:inline-block"
                     ref="tree_select"
                     :clearable="item.clearable"
                     :readonly="item.readonly"
                     :data="dicts[item.prop]"
                     :size="item.size||'mini'"
                     :width="item.treeWidth"
                     :multiple="!!item.multiple"
                     :checkStrictly="!!item.checkStrictly"
                     :defaultProps="item.defaultProps"
                     :style="{width: _defaultWidth(item)}"
                     :nodeKey="item.nodeKey"
                     :checkedKeys="_matchTree(form[item.prop])"
                     @popoverHide="_bindTreeSelect($event, item)"
                     @change="_bindTreeSelectChange($event, item)" />
        <!-- 另一种日期选择器 -->
        <div v-if="item.type==='dateSplitRange'">
          <el-date-picker type="date"
                          :style="{width:_defaultWidth(item, '220px')}"
                          :readonly="item.readonly"
                          :clearable="item.clearable"
                          :popper-class="item.class"
                          placeholder="起始时间"
                          :value-format="item.dateFormat"
                          :picker-options="item.pickerOptions || {}"
                          v-model="form[item.propStart]"
                          @change="_handleChange(item)" />
          <span class="mar-l mar-r"> {{item.centre||'-'}}</span>
          <el-date-picker type="date"
                          :style="{width:_defaultWidth(item, '220px')}"
                          :readonly="item.readonly"
                          :clearable="item.clearable"
                          :popper-class="item.class"
                          placeholder="结束时间"
                          :value-format="item.dateFormat"
                          :picker-options="item.pickerOptions || {}"
                          v-model="form[item.propEnd]"
                          @change="_handleChange(item)" />
        </div>
        <span v-if="item.unit"
              style="font-size: 12px"
              v-html="item.unit"></span>
        <!-- 自定义结构 -->
        <template v-if="item.type === 'slot'">
          <slot :name="item.label"></slot>
        </template>
      </el-form-item>
    </template>
    <!-- 自定义的按钮行 -->
    <el-form-item v-if="$slots.btns"
                  :class="footNewline ? 'mar-t text-c' : ''"
                  :style="{display: `${footNewline ? 'block' : 'inline-block'}`}">
      <slot name="btns" />
    </el-form-item>
    <!-- 默认的按钮 -->
    <template v-if="btnShow">
      <el-form-item :class="footNewline ? 'mar-t text-c' : ''"
                    :style="{display: `${footNewline ? 'block' : 'inline-block'}`}">
        <!-- --------------------废弃slot，如果有其他按钮使用slot：btns------------------- -->
        <slot name="btn-prev" />
        <!-- 确认 -->
        <el-button type="primary"
                   size="mini"
                   @click="_handleComfirm"
                   v-text="confirmBtnName" />

        <!-- --------------------废弃slot & reserveBtns，如果有其他按钮使用slot：btns------------------- -->
        <slot name="btn-center" />
        <el-button size="mini"
                   type="primary"
                   v-for="(item, i) in reserveBtns"
                   :key="i"
                   @click="$emit('reserveBtnClick', item)"
                   v-text="item" />
        <!-- 重置 -->
        <el-button size="mini"
                   @click="reset();$emit('cancel')"
                   v-text="cancelBtnName" />
        <!-- --------------------废弃，如果有其他按钮使用slot:btns------------------- -->
        <slot name="btn-last" />
      </el-form-item>
    </template>
  </el-form>
</template>
<script>
import { treeSelect } from '@/components/tree'
import { getKyDcits } from '@/utils/dicts'
// 验证
const getRules = (data = []) => {
  return data.reduce((res, item) => {
    if (item.validator) {
      res[item.prop] = [{ required: item.must, validator: item.validator, trigger: 'blur' }]
    } else {
      // 必填验证
      if (item.must === true) {
        res[item.prop] = [
          {
            required: true,
            message: `${item.label}不能为空`,
            trigger: 'blur'
          }
        ]
      }
      // 使用内置验证类型
      if (item.validType) {
        if (item.validType === 'custom') {
          res[item.prop] = [
            { required: true, pattern: item.pattern, message: `请正确输入${item.label}`, trigger: 'blur' }
          ]
        } else {
          res[item.prop] = [
            { required: true, type: item.validType, message: `请正确输入${item.label}`, trigger: 'blur' }
          ]
        }
      }
      // 使用外部验证规则
    }
    return res
  }, {})
}
export default {
  name: 'yk-form',
  components: {
    treeSelect
  },
  props: {
    // 是否只读
    readonly: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    formData: {
      type: Object,
      default () {
        return {}
      }
    },
    btnShow: {
      type: Boolean,
      default: true
    },
    // 默认确定按钮名称
    confirmBtnName: {
      type: String,
      default: '查询'
    },
    // 默认重置按钮名称
    cancelBtnName: {
      type: String,
      default: '重置'
    },
    // ------废弃属性：预留按钮集合----------
    reserveBtns: {
      type: Array,
      default () {
        return []
      }
    },
    inline: {
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    // 按钮是否另起一行
    footNewline: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      refName: `form_${Date.now()}`,
      daterange: {},
      monthrange: {},
      form: {},
      // 字典存放
      dicts: {},
      // 验证函数
      rules: {},
      inputWidth: '192px',
      // 默认的数据
      defaultData: {
        text: {
          maxlength: 100
        },
        textarea: {
          maxlength: 100,
          autosize: { minRows: 2, maxRows: 4 }
        },
        number: {
          maxlength: 100
        },
        select: {
          placeholder: '请选择'
        },
        switch: {
          activeColor: '#13ce66',
          inactiveColor: '#ff4949',
          activeValue: true,
          inactiveValue: false
        },
        date: {
          placeholder: '请选择日期',
          dateFormat: 'yyyy-MM-dd'
        },
        datetime: {
          placeholder: '请选择时间',
          dateFormat: 'yyyy-MM-dd'
        },
        year: {
          placeholder: '请选择年',
          dateFormat: 'yyyy'
        },
        daterange: {
          dateFormat: 'yyyy-MM-dd'
        },
        dateFormat: {
          dateFormat: 'yyyy-MM-dd'
        },
        dateSplitRange: {
          dateFormat: 'yyyy-MM-dd'
        }
      }
    }
  },
  computed: {
    // 筛选出需要显示的表单类型
    filterData () {
      return this.data.filter(v => v.hide !== true).map(v => {
        // 修正年度选择类型，强制将yearSelect修改为year
        // -----------yearSelect废弃---------------
        if (v.type === 'yearSelect') { v.type = 'year' }
        const { type, readonly } = v
        // const keys = Object.keys(this.defaultData)
        // 设置是否只读，当自身属性为false或缺省时，采用当前表单只读属性
        v.readonly = !!readonly || this.readonly
        // 取默认属性
        const copyData = this.$cloneDeep(this.defaultData[type] || {})
        // 合并所有的属性
        Object.assign(copyData, v)
        return copyData
      })
    }
  },
  methods: {
    // 表单项验证
    validate (callback) {
      this.$refs[this.refName].validate(valid => {
        callback(valid, this.getForm())
      })
    },
    // 获取表单数据
    getForm () {
      return this.$cloneDeep(this.form)
    },
    // 手动更改表单单行的prop关联值
    setFormData (value, prop) {
      this.$set(this.form, prop, value)
    },
    /**
   * 手动更新数据字典
   * @param {Array | String} dict 字典内容或type
   * @param {String} prop 关联字段名称
   */
    setDict (dict, prop) {
      // 先重置为空
      this.$set(this.dicts, prop, [])
      // 重新请求字典
      this._getDicts({ dict, prop })
    },
    // 清除单个表单验证
    clearValidate (prop) {
      if (prop) {
        const vNode = this.$refs[`form_item_${prop}`]
        vNode[0].clearValidate()
      } else {
        this.$refs['form'].clearValidate()
      }
    },
    // 清除表单数据，组件外可调用
    reset () {
      const $form = this.$refs[this.refName]
      this.form = {}
      this.daterange = {}
      this.monthrange = {}
      // 表单重置
      $form && $form.resetFields()
      this._setDefaultFrom()
    },
    _handleChange (row) {
      this.$emit('change', {
        row,
        data: this.getForm()
      })
    },
    /**
   * 表单初始化赋值
   */
    _setDefaultFrom () {
      // ----------------------覆盖默认值，为了兼容老的代码,与row.value互斥-------------------------------
      const keys = Object.keys(this.formData)
      // 当formData有值时，忽略value默认值
      if (keys.length) {
        this._formDataWatch()
      } else {
        this._dataValueWatch()
      }
    },
    // 当formData传入值时，初始化表单数据
    _formDataWatch () {
      this.form = this.$cloneDeep(this.formData)
      this.data.forEach((item, i) => {
        const { type, propStart, propEnd, dict, prop } = item
        if (type === 'select-tree') {
          (dict instanceof Array) && this.$set(this.dicts, prop, dict)
          return
        }
        // 请求字典
        if (type === 'select') {
          this._getDicts(item)
          return
        }
        // 日期级联回显
        if (type === 'daterange') {
          const start = this.formData[propStart] || ''
          const end = this.formData[propEnd] || ''
          this.$set(this.daterange, i, [start, end])
        }
      })
    },
    // 设置当前row.value为默认值
    _dataValueWatch () {
      // 取value的值最为默认值
      const form = {}
      // 设置传入data的默认值
      this.data.forEach((item, i) => {
        const { prop, value, type, dict } = item

        // 日期类型，单独处理
        if (type === 'daterange') {
          if (value instanceof Array) {
            this.$set(this.daterange, i, value)
            this._daterangeChange(value, item, false)
          }
          return
        }
        // 请求字典
        if (type === 'select') {
          this._getDicts(item)
        }
        if (type === 'select-tree') {
          (dict instanceof Array) && this.$set(this.dicts, prop, dict)
        }
        // 当value有值并且prop 有值，直接赋值
        if (value !== undefined && prop) {
          form[prop] = value
        }
      })
      // 重新组合赋值
      this.form = {
        ...this.form,
        ...form
      }
    },
    // 匹配树数据
    _matchTree (res) {
      if (res) {
        if (res instanceof Array) {
          return res
        } else {
          return [res]
        }
      }
      return []
    },
    // 触发确认按钮点击事件
    _handleComfirm () {
      this.$refs[this.refName].validate(valid => {
        if (valid) {
          this.$emit('confirm', this.getForm())
        }
      })
    },
    // 获取字典
    _getDicts ({ dict, prop }) {
      // 传入dict为数组，则直接作为字典
      if (dict instanceof Array) {
        this.$set(this.dicts, prop, dict)
      } else {
        // 没有传入，字典为空数组
        if (!dict) {
          this.$set(this.dicts, prop, [])
        } else {
          // 其他情况，当前组件没有字典时，请求字典
          getKyDcits(dict).then(res => {
            this.$set(this.dicts, prop, res)
          })
        }
      }
    },
    // 绑定树选择数据
    _bindTreeSelect ({ ids, data }, { prop, defaultProps }) {
      if (!data) return
      const { label = 'name' } = defaultProps || {}
      // 区分多选和单选
      const labels = data instanceof Array ? data.map(v => v[label]) : data[label]
      this.$set(this.form, `${prop}Name`, labels)
      this.$set(this.form, prop, ids)
      // 添加树数据
      this.$set(this.form, '_treeData', data)
    },
    // 下拉树清空
    _bindTreeSelectChange (data, row) {
      const { prop } = row
      // data为空代表清空选中
      if (!data) {
        this.$set(this.form, `${prop}Name`, '')
        this.$set(this.form, prop, '')
        // 添加树数据
        delete this.form['_treeData']
      }
      this._handleChange(row)
    },
    /**
   * 日期级联选择变动
   * @param {Array} v ['2020-08-05', '2020-08-20']
   * @param {Object} row 表单row
   * @param {Boolean} handlerChange 是否触发change事件，默认触发
   */
    _daterangeChange (v, row, handlerChange = true) {
      const [start = '', end = ''] = v || []
      this.form[row.propStart] = start
      this.form[row.propEnd] = end
      handlerChange && this._handleChange(row)
    },
    _monthrangeChange (v, item, i) {
      const [start = '', end = ''] = v || []
      this.form[item.propStart] = start.getMonth() + 1
      this.form[item.propEnd] = end.getMonth() + 1
      this._handleChange(item)
    },
    /**
   * @description 获取表单input的宽
   * @param {Object} row 表单row
   * @param {String} oWidth 宽度
   */
    _defaultWidth ({ inputWidth, unit }, oWidth) {
      const defaultWidth = this.inputWidth
      // 先取传入的
      return `${inputWidth || oWidth || (unit ? defaultWidth : '100%')}`
    }
    // _readonlySet ({ readonly }) {
    //   return !!readonly || this.readonly
    // }
  },
  watch: {
    data: {
      handler (val) {
        this.rules = getRules(val)
        this.reset()
      },
      immediate: true
    },
    formData () {
      this.reset()
    }
  }
}
</script>
