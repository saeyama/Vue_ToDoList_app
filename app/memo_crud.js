const vm = new Vue({
  el: '#app',
  data: {
    item: '',
    editId: null,
    memos: []
  },
  computed: {
    changeButtonText () {
      return this.editId === null ? '追加' : '完了'
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
      const item = {
        id: this.memos.length,
        body: this.item
      }
      this.memos.push(item)
      this.item = ''
    },
    deleteItem (targetId) {
      this.memos.splice(targetId, 1)
      for (let i = targetId; i < this.memos.length; i++) {
        this.memos[i].id = i
      }
    },
    setItems () {
      if (!this.item) return
      if (this.editId === null) {
        const item = {
          id: this.memos.length,
          body: this.item
        }
        this.memos.push(item)
      } else {
        this.memos.splice(this.editId, 1, {
          id: this.editId,
          body: this.item
        })
      }
      this.cancel()
    },
    cancel () {
      this.item = ''
      this.editId = null
    },
    editItem (targetId) {
      this.editId = this.memos[targetId].id
      this.item = this.memos[targetId].body
      this.$refs.editor.focus()
    }
  }
})
