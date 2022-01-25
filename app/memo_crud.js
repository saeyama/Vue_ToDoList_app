let vm = new Vue({
  el:'#app',
  data: {
    item: '',
    memos: []
  },
  watch: {
    memos: {
      handler: function() {
        localStorage.setItem('memos', JSON.stringify(this.memos));
      },
      deep: true
    }
  },
  mounted: function() {
    this.memos = JSON.parse(localStorage.getItem('memos')) || [];
  },
  methods: {
    addItem(){
      if(!this.item) return
      let item = {body: this.item}
      this.memos.push(item)
      this.item = ''
    },
    deletItem(index){
      this.memos.splice(index, 1)
    }
  }
});