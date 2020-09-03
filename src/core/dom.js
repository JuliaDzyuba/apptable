class Dom {
  constructor(selector){
    //если передана строка , напр., #app / .header__links, то создается элемент с пом. document.querySelector. Если передается сам элемент, напр., event.target, то в переменную записывается этот элемент
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    
  }

  // метод принимает строку контента и записывает его в элемент
  html(html) {
    if(typeof html === 'string'){
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }
  // включение/отключение слушателей
  // метод принимает тип события и колбек-функцию, которые применяются к элементу
  on(eventType, callback) {
    
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  append(node) {
    if(node instanceof Dom){
      node = node.$el;
    }
    if(Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

}

// функция, создающая новый экземпляр класса Dom
export function $(selector) {
  return new Dom(selector);
}

// создаем статичный метод для функции $, которая принимает тэг и класс и создает новый дом-элемент
$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if(classes) {
    el.classList.add(classes);
  }
  return $(el);
}