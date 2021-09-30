<template>
  <div class="todo-page">
    <h1>Todos</h1>
    <div class="container">
      <div>
        <button class="delete" @click="allTodoDone">❯</button>
        <input class="new-todo" placeholder="무슨일을 해야할까요?" v-model="newTodo" @keyup.enter="addTodo"/>
      </div>
      <div v-for="(todo, index) in filteredTodoList" :key="todo.id">
        <Todo class="item" :number="index" :todo="todo"
              @update-todo="updateTodo" @delete-todo-clicked="deleteTodo"/>
      </div>
      <div class="btn-group">
        {{ numberOfLeftTodo }} item left
        <button @click="visibility=`showAll`">All</button>
        <button @click="visibility=`showActive`">Active</button>
        <button @click="visibility=`showCompleted`">Completed</button>
        <button @click="clearCompleted" v-show="todoList.length > numberOfLeftTodo">Clear completed</button>
      </div>
    </div>
  </div>
</template>

<script>
import Todo from "../components/Todo";
import {
  getTodoList,
  createTodoItem,
  updateTodoItemById,
  patchTodoItemById,
  deleteTodoItemById
} from "@/service/todo-service";

export default {
  name: "TodoPage",
  components: {
    Todo,
  },
  data() {
    return {
      newTodo: "",
      todoList: [],
      visibility: "showAll",
      filters: {
        showAll(todoList) {
          return todoList;
        },
        showActive(todoList) {
          return todoList.filter(x => x.status === "active")
        },
        showCompleted(todoList) {
          return todoList.filter(x => x.status === "done")
        },
      }
    }
  },
  async mounted() {
    await this.loadTodoList();
  },
  computed: {
    filteredTodoList() {
      return this.filters[this.visibility](this.todoList);
    },
    numberOfLeftTodo() {
      return this.todoList.filter(e => e.status === "active").length
    },
  },
  methods: {
    async loadTodoList() {
      const response = await getTodoList();
      console.log(response);
      this.todoList = response;
    },
    async addTodo() {
      await createTodoItem(this.newTodo);
      await this.loadTodoList();
      this.newTodo = "";
    },
    async updateTodo(todo) {
      await updateTodoItemById(todo.id, todo.details, todo.status);
      await this.loadTodoList();
    },
    async deleteTodo(id) {
      await deleteTodoItemById(id);
      await this.loadTodoList();
    },
    async allTodoDone() {
      const promises = this.numberOfLeftTodo ? this.todoList.map(todoItem => patchTodoItemById(todoItem.id, {"status": "done"}))
          : this.todoList.map(todoItem => patchTodoItemById(todoItem.id, {"status": "active"}));
      await Promise.all(promises);
      await this.loadTodoList();
    },
    async clearCompleted() {
      const promises = this.todoList.filter(todoItem => todoItem.status === "done").map(completedTodoItem => deleteTodoItemById(completedTodoItem.id));
      await Promise.all(promises);
      await this.loadTodoList();
    },
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
  align-items: center;
  min-width: 500px;
  max-width: 550px;
  min-height: 500px;
  margin: 130px 0 40px 0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
  0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.item {
  flex: 1 1 8%;
}
</style>