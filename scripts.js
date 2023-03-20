const { createApp } = Vue;

var tasks = [
]

createApp({
  data() {
    return {
      tasks: window.tasks || []
    }
  },

  methods: {
    addTask: function () {
      const { task } = this.tasks;

      if (!task) return alert('Escreva uma tarefa');

      const taskStorage = {
        name: task,
        done: false
      }

      this.tasks.push(taskStorage)
      localStorage.setItem('tasks',JSON.stringify(this.tasks))
      document.location.reload();
    },
    addDone: function (task) {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      const arrTasks = [...tasks];

      const indexTask = arrTasks.findIndex(item => item.name === task.name)

      const name = arrTasks[indexTask].name
      let done = arrTasks[indexTask].done ? false : true

      tasks[indexTask].name = name;
      tasks[indexTask].done = done;

      localStorage.setItem('tasks',JSON.stringify(tasks))
      document.location.reload()
    },

    clearAll: function () {
      localStorage.setItem('tasks',[])
      document.location.reload()
    }
  },

  mounted: function () {
    if (!localStorage.getItem('tasks')) return localStorage.setItem('tasks',JSON.stringify(this.tasks))

    const tasks = JSON.parse(localStorage.getItem('tasks'));

    this.tasks.push(...tasks)
  }
}).mount('#app')