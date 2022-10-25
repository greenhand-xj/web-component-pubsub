import PubSub from "../PubSub.js";
export default class MyStats extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.item = []
  }

  connectedCallback() {
    const template = document.createElement("template")
    template.innerHTML = `
      <div>学习清单：<span class="learning-count">0</span> 个</div>
      <div>代办清单：<span class="todo-count">0</span> 个</div>
      <style>
          @import 'components/MyStats/index.css';
      </style>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.learningCount = this.shadowRoot.querySelector('.learning-count')
    this.todoList = this.shadowRoot.querySelector('.todo-count')
    PubSub.subscribe('learning_list_updated',this.updateLearning.bind(this))
    PubSub.subscribe('todo_list_updated',this.updateTodo.bind(this))
  }
  updateLearning(list){
    this.learningCount.textContent = list.length
  }
  updateTodo(list){
    this.todoList.textContent = list.length
  }

}

customElements.define('my-stats',MyStats)
