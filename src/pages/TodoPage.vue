<template>
  <div class="todo-page">
    <h1>Todos</h1>
    <div class="container">
      <div>
        <button class="delete" @click="allTodoDone"></button>
        <input class="new-todo" placeholder="무슨일을 해야할까요?" v-model="newTodo" @keyup.enter="addTodo"/>
      </div>
      <div v-for="(todo, index) in todoList" :key="todo.id">
        <Todo class="item" :number="index" :id="todo.id" :details="todo.details" :status="todo.status"
              @delete-todo-clicked="deleteTodo"/>
      </div>
      <div>
        <button>
          
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Todo from "../components/Todo";

export default {
  name: "TodoPage",
  components: {
    Todo,
  },
  data() {
    return {
      newTodo: "",
      todoList: [
        {"id": "1", "details": "수업 내용 정리하기1", "status": "active"},
        {"id": "2", "details": "수업 내용 정리하기2", "status": "done"},
        {"id": "3", "details": "수업 내용 정리하기3", "status": "active"},
        {"id": "4", "details": "수업 내용 정리하기4", "status": "done"},
        {"id": "5", "details": "수업 내용 정리하기5", "status": "active"},
      ],
    }
  },
  methods: {
    addTodo() {
      this.todoList.push({"id": "1", "details": this.newTodo, "status": "active"})
    },
    deleteTodo(number) {
      this.todoList.splice(number, 1)
    },
    allTodoDone() {
      this.todoList.forEach(x => x.status = "done")
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  background-color: beige;
  flex-direction: column;
  justify-content: space-around;
  min-width: 230px;
  max-width: 550px;
  min-height: 230px;
  margin: 130px 0 40px 0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
  0 25px 50px 0 rgba(0, 0, 0, 0.1);
}
.item{
  flex : 1 1 8%;
}
</style>