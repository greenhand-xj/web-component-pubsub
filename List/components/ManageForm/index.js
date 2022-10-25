import PubSub from "../PubSub.js";
export default class ManageForm extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    const template = document.createElement("template")
    template.innerHTML = `
      <div>
        <input type="text" name="learning" placeholder="请添加学习清单"/>
        <button class="learning">添加</button>
      </div>
      <div>
        <input type="text" name="todo" placeholder="请添加代办清单"/>
        <button class="todo">添加</button>
      </div>
      <style>
          @import 'components/ManageForm/index.css';
      </style>
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.querySelector('.learning').addEventListener('click',(e) => this.addItem(e,'learning_item_added'))
    this.shadowRoot.querySelector('.todo').addEventListener('click',(e) => this.addItem(e,'todo_item_added'))
  }
  addItem(e,eventName){
    const input = e.target.previousElementSibling
    const title = input.value
    if(!title.trim()) return alert('请输入内容')
    input.value = ''
    PubSub.publish(eventName,title)
  }
}

customElements.define('manage-form',ManageForm)
