
export function EnduringStore (store, option = {}) {
  let defaultOption = {
    storage: window.sessionStorage, // 储存方式
    filter: null, // 持久化过滤函数
    subscribe: false // 开启vuex订阅模式
  }
  option = Object.assign(defaultOption, option)
  this.option = option
  let state = option.storage.getItem('vuex');
  this.store = store;
  if (state) store.replaceState(JSON.parse(state));
  if (option.subscribe) {
    store.subscribe((_, state) => this.save(state))
    store.subscribeAction((_, state) => this.save(state))
  }
}

EnduringStore.prototype.use = function use () {
  window.addEventListener('beforeunload', () => this.save())
  window.addEventListener('unload', () => this.save())
}

EnduringStore.prototype.save = function save (state) {
  state = state || this.store.state
  if (this.option.filter) state = this.option.filter(state);
  if (this.option.storage instanceof Storage) this.option.storage.setItem('vuex', typeof state === 'string' ? state : JSON.stringify(state));
  else throw new Error('storage need a Storage')
}
