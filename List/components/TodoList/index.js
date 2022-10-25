import PubSub from "../PubSub.js";
import {randomId} from '../utils/index.js'

export default class TodoList extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.items = []
  }

  connectedCallback() {
    const template = document.createElement("template")
    template.innerHTML = `
      <h2>Todo List (代办清单)</h2>
      <ul>
          
      </ul>
      <style>
          @import 'components/TodoList/index.css';
      </style>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.ul = this.shadowRoot.querySelector('ul')
    PubSub.subscribe('todo_item_added', this.add.bind(this))
    this.ul.addEventListener('dblclick', this.delete.bind(this))
  }

  add(title) {
    this.items.push({title, id: randomId()})
    this.renderTodoList()
    PubSub.publish('todo_list_updated', this.items)
  }

  renderTodoList() {
    this.ul.innerHTML = ''
    this.items.map(item => {
      const li = document.createElement('li')
      li.innerText = item.title
      li.id = item.id
      this.ul.appendChild(li)
    })
  }

  delete(e) {
    const li = e.target.closest('li')
    const id = li.id
    this.items = this.items.filter(item => item.id !== id)
    //this.renderTodoList()
    li.remove()
    PubSub.publish('todo_list_updated', this.items)
  }
}

customElements.define('todo-list', TodoList)
