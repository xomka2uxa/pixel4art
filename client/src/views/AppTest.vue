<template>
  <div class="main">
    <span v-bind:title="message" v-if="seen"> Узри мой title! </span>
    <span v-once> {{ message }} </span>
    <ol>
      <app-li v-for="todo in todos" :message="todo.text" :key="todo.text" />
    </ol>
    <button v-on:click="addTodo">Добавить</button>
    <input v-model="message" />
  </div>
</template>

<script>
import AppLi from "@/components/AppLi.vue";
export default {
  components: {
    AppLi,
  },

  data() {
    return {
      message: "Пример",
      seen: true,
      todos: [
        { text: "Изучить JavaScript" },
        { text: "Изучить JavaScript" },
        { text: "Создать что-нибудь классное" },
      ],
    };
  },

  methods: {
    addTodo() {
      this.todos.push({ text: this.message });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  min-height: 500px;
  margin-top: 110px;
  padding: 50px;
  width: 100%;
  background-color: #000;
  color: white;
}
</style>
