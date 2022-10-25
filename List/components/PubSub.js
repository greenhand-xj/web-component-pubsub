const PubSub = {
  events: {},
  subscribe: function (eventName, fn) {
    console.log(`PUBSUB: 一个组件已经开始订阅${eventName}事件`);
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  unsubscribe: function (eventName, fn) {
    console.log(`PUBSUB: 一个组件取消订阅${eventName}事件`);
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(f => f !== fn)
    }
  },
  publish: function (eventName,data) {
    console.log(`PUBSUB: 通知所有已经订阅${eventName}事件的组件，${eventName}已经触发，且附有数据${data}`);
    if(this.events[eventName]){
      this.events[eventName].forEach(f => f(data))
    }
  }
}

export default PubSub
