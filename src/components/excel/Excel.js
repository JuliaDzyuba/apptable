import { $ } from "../../core/dom";

export class Excel {
  constructor(selector, options) {
    // this.$el = document.querySelector(selector);
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    
    // const $root = document.createElement('div');
    // $root.textContent = 'test';
    // $root.style.fontSize = '5rem';
    // $root.classList.add('excel');

    const $root = $.create('div', 'excel');
    
    
    this.components = this.components.map(Component => {
      // const $el = document.createElement('div');
      // $el.classList.add(Component.className);
      const $el = $.create('div', Component.className);

      const component = new Component($el);
      // DEBUG
      if(component.name) {
        window['c' + component.name] = component
      }
      // END DEBUG


      // console.log(component.toHtml());
      // $el.innerHTML = component.toHtml();
      $el.html(component.toHtml())

      // $root.insertAdjacentHTML('beforeend', component.toHtml());
      $root.append($el);
      return component;
    });
    return $root;
  }

  render() {
    // console.log(this.$el);
    // this.$el.insertAdjacentHTML('afterbegin', `<h1>Test</h1>`);
    // const node = document.createElement('h1');
    // node.textContent = 'TEST';
    // this.$el.append(node);
    this.$el.append(this.getRoot());

    // перебираем массив компонентов и в каждом из них вызываем метод init()
    // console.log(this.components);
    this.components.forEach(component => {
      component.init();      
    });
  }

}