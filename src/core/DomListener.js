import { capitalize } from "./utils";
// класс добавляет все необходимые события компонентам
export class DomListener {
  constructor($root, listeners = []) {
    if(!$root) {
      throw new Error(`No $root provided for DomListener!`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }
// добавляет слушатели
  initDOMListeners() {
    // console.log(this.listeners, this.$root);
    this.listeners.forEach( listener => {
      console.log(listener);
      // использование стрелочной ф-ции позволяет обращаться к $root, т.к. она не хранит свой контекст
      const method = getMethodName(listener);
      if(!this[method]) {
        const name = this.name || '';
        throw new Error (`Method ${method} is not implemented in ${name}Component`)
      }
      // переопределяем метод, привязывая к нему его контекст
      this[method] = this[method].bind(this);
      // тоже самое что и addEventListener
      this.$root.on( listener, this[method]) 
    });
  }
// удаляет слушатели
  removeDOMListeners(){
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    })
  }
}


// input => onInput
function getMethodName(eventName){
  return 'on' + capitalize(eventName);
}