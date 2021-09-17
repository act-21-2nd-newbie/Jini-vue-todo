<template>
  <div class="todo">
    <input id="toggle" type="checkbox" v-model="status" true-value="done" false-value="active">
    <input class="edit" type="text" v-model="details">
    <button class="delete" @click="deleteTodo"></button>
  </div>
</template>

<script>
export default {
  name: "Todo",
  props:{
    number: Number,
    id: String,
    details: String,
    status: String,
  },
  methods:{
    deleteTodo(){
      this.$emit('delete-todo-clicked', this.number);
    }
  }
}
</script>

<style scoped>

</style>