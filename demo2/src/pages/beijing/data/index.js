export const btns = [
  { id: 'add', label: '增加', type: 'primary' },
  { id: 'detail', label: '查看详情', type: 'primary' }
]

export const TEST_RESULT = [
  { label: '通过', code: '1' },
  { label: '不通过', code: '2' }
]

export const tranLabel = (code, dict, key) => {
  for (const value of dict) {
    if (value[key] === code) {
      return value
    }
  }
}
