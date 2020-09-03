import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}){
    super($root, options.listeners)
    this.name = options.name || '';
  }

  // Возвращает шаблон компонента
  toHtml() {
    return '';
  }
  // метод вызывающий функции (например навешивание слушателя на элемент)
  init() {
    this.initDOMListeners();
  }

  // метод удаляющий функции (например удаление слушателя с элемента) и предотвращающий утечку памяти
  destroy(){
    this.removeDOMListeners();
  }
}