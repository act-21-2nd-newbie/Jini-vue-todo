<template>
  <div class="todo">
    <input id="toggle" type="checkbox" v-model="todo.status" @change="updateTodo" true-value="done" false-value="active">
    <input class="edit" v-model="todo.details" @dblclick="changeIsReadOnly" @blur="updateTodo" @keyup.enter="updateTodo" @keyup.esc="cancelUpdateTodo" style="[text-decoration: line-through" :readonly="isReadOnly">
    <button class="delete" @click="deleteTodo">x</button>
  </div>
</template>

<script>
export default {
  name: "Todo",
  props:{
    number: Number,
    todo:{
      id: String,
      details: String,
      status: String,
    }
  },
  data() {
    return{
      cachedTodoDetails:"",
      isReadOnly: true,
    }
  },
  methods:{
    changeIsReadOnly(){
      this.cachedTodoDetails=this.todo.details
      this.isReadOnly=false
    },
    updateTodo(){
      this.$emit('update-todo',this.todo);
      this.isReadOnly=true
    },
    cancelUpdateTodo(){
      this.todo.details=this.cachedTodoDetails
      this.cachedTodoDetails=""
      this.isReadOnly=true
    },
    deleteTodo(){
      this.$emit('delete-todo-clicked', this.todo.id)
    }
  }
}
</script>

<style scoped>
</style>