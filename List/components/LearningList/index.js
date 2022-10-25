import PubSub from "../PubSub.js";
import {randomId} from '../utils/index.js'
export default class LearningList extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.items = []
  }

  connectedCallback() {
    const template = document.createElement("template")
    template.innerHTML = `
      <h2>Learning List (学习清单)</h2>
      <ul>
          
      </ul>
      <style>
          @import 'components/LearningList/index.css';
      </style>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.ul = this.shadowRoot.querySelector('ul')
    PubSub.subscribe('learning_item_added',this.add.bind(this))
    this.ul.addEventListener('dblclick',this.delete.bind(this))
  }
  add(title){
    this.items.push({title,id:randomId()})
    this.renderLearningList()
    PubSub.publish('learning_list_updated',this.items)
  }

  renderLearningList(){
    this.ul.innerHTML = ''
    this.items.map(item => {
      const li = document.createElement('li')
      li.innerText = item.title
      li.id = item.id
      this.ul.appendChild(li)
    })
  }

  delete(e){
    const li = e.target.closest('li')
    const id = li.id
    this.items = this.items.filter(item => item.id !== id)
    //this.renderLearningList()
    li.remove()
    PubSub.publish('learning_list_updated',this.items)
  }
}

customElements.define('learning-list',LearningList)
