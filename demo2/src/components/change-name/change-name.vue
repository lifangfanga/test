
<template>

  <el-form ref="form"
           :model="sizeForm"
           :rules="rules"
           label-width="80px"
           size="mini">
    <el-form-item label="名称"
                  prop="name">
      <el-input v-model="sizeForm.name"></el-input>
    </el-form-item>
    <el-form-item label="电源点类型"
                  prop="changename">
      <el-select v-model="sizeForm.changename"
                 placeholder="变电站"
                 @change="change">
        <!-- <el-option label="变电站"
                   value="01"></el-option>
        <el-option label="开闭站"
                   value="02"></el-option> -->
        <el-option v-for="(item,i) in options"
                   :key="i"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="项目属性"
                  prop="attribute">
      <el-select v-model="sizeForm.attribute"
                 @change="change">
        <el-option v-for="(item,j) in atturOption"
                   :key="j"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      sizeForm: {
        name: '',
        region: '',
        date1: '',
        changename: '',
        attribute: ''
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        changename: [{ required: true, message: '请输入电源点类型', trigger: 'change' }],
        attribute: [{ required: true, message: '请输入项目属性', trigger: 'change' }]
      },
      options: [{ label: '农网', value: '01' }, { label: '城网', value: '02' }],
      atturOption: [{ label: '中央预算', value: '11' }, { label: '自贡基金', value: '12' }]
    }
  },
  created () {
    this.arrFunction1()
    this.arrFunction2()
    this.arrFunction3()
    this.arrFunction4()
    this.arrFunction5()
    this.arrFunction6()
    this.jiantou()
    // this.fun()
    this.function10()
    this.result()
  },
  methods: {
    result () {
      const a = [1, 2, 3]
      console.log(!a.length, '!a.length')
      // return !a.length
    },
    change (data) {
      if (data === '01') {
        const text = [{ name: '城网', age: '18' }, { name: '农网', age: '20' }]
        const newText = text.map((v) => {
          return {
            dicLabel: v.name,
            divValue: v.age
          }
        })
        console.log(newText, 'NEW')
      }
      if (data === '12') {
        if (this.sizeForm.attribute) {
          this.rules.changename = [{}]
        }
      }
    },
    // push方法
    arrFunction1 () {
      var arr = [1, 2, 3]
      var newArr = arr.push(4, 5)
      console.log(newArr, 'push') // 返回的是新数组的长度  结果为 5
      console.log(arr)
    },
    // pop方法
    arrFunction2 () {
      var arr = [1, 2, 3]
      var newArr = arr.pop()
      console.log(newArr) // 返回的是删除项     最后一项  结果为3
      console.log(arr) // 结果为 1，2
    },
    // splice方法
    arrFunction3 () {
      var arr = [1, 2, 3]
      var newArr = arr.splice(1, 2) // 从数组索引1开始，删除2个数字
      var newArr1 = arr.splice(1)
      var newArr2 = arr.splice(0, 1, 3) // 从索引下标 1 开始，删除2个，把3插入到删除的位置
      console.log(newArr, '新数组1') // 以数组的形式返回删除项
      console.log(newArr1, '新数组2') // 从下标为1的索引开始，删除到最后一个
      console.log(arr, '原来的数组1') // 返回删除之后的数组
      console.log(arr, '从索引下标 1 开始，删除2个，把3插入到删除的位置')
      console.log(newArr2, '定义的新的数组')
    },
    arrFunction4 () {
      var arr = [1, 2, 3]
      var newArr = arr.splice(0)
      console.log(newArr, '新数组')
    },
    // slice方法
    arrFunction5 () {
      var arr = [1, 2, 3]
      var newArr = arr.slice(1, 2)
      console.log(newArr, '从索引1开始，查找到索引2处，不包含2处的数据，将查找到的以新数组返回，原数组不变') // 输出2
    },
    // 数组的拼接
    arrFunction6 () {
      var arr = [1, 2, 3]
      var newArr = arr.concat(4)
      console.log(newArr, '数组的拼接,不改变数组，返回最终连接好的新数组') // 输出 1,2,3,4
    },
    // 数组转字符串
    arrFunction7 () {

    },
    // 箭头函数
    jiantou () {
      const elements = ['qdvsf', 'hfudhfu', 'jjfj']
      elements.map(el => el.length)
    },
    function10 () {
      var a = [1, 334, 555, 5]
      for (var i in a) {
        if (a === 5) {
          console.log(a)
          console.log(i)
        }
      }
    }
    // fun () {
    //   var a = { name: 111, age: 2, ss: 33, tt: 555 }
    //   function sortArry (a) {
    //     var num = Object.keys(a).sort()
    //     var arr = {}
    //     for (var i = 0; i < num.length; i++) {
    //       arr[num[i]] = a[num[i]]
    //     }
    //     return arr
    //   }
    //   console.log(JSON.stringify((sortArry(a))
    // }
  }
  // toFixed(num) 保留小数点后num位小数
}
</script>
