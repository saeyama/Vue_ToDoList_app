const vm = new Vue({
  el: '#app',
  data: {
    item: '',
    editIndex: -1,
    memos: []
  },
  computed: {
    changeButtonText () {
      return this.editIndex === -1 ? '追加' : '完了'
    }
  },
  watch: {
    memos: {
      handler: function () {
        localStorage.setItem('memos', JSON.stringify(this.memos))
      },
      deep: true
    }
  },
  mounted: function () {
    this.memos = JSON.parse(localStorage.getItem('memos')) || []
  },
  methods: {
    addItem () {
      if (!this.item) return
      const item = { body: this.item }
      this.memos.push(item)
      this.item = ''
    },
    deletItem (index) {
      this.memos.splice(index, 1)
    },
    setItems () {
      if (!this.item) return
      if (this.editIndex === -1) {
        const item = { body: this.item }
        this.memos.push(item)
      } else {
        this.memos.splice(this.editIndex, 1, { body: this.item })
      }
      this.cancel()
    },
    cancel () {
      this.item = ''
      this.editIndex = -1
    },
    editItem (index) {
      this.editIndex = index
      this.item = this.memos[index].body
      this.$refs.editor.focus()
    }
  }
})
