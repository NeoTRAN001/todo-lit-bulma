import { LitElement, html } from 'lit-element';
import './components/HeaderTemplate';
import './components/AddToDo';
import './components/ModalToDo';

export class LitTodoApp extends LitElement {

  createRenderRoot() { return this; }

  static get properties() {
    return {
      toDoList: { type: Array },
      openModal: { type: Boolean }
    };
  }

  constructor() {
    super();

    this.toDoList = [];
    this.id = 0;
    this.title = 'None';
  }

  _putInList(e) {
    const toDo = this.toDoList[this.toDoList.length - 1];

    this.toDoList = [
      ...this.toDoList,
      { 
        id: toDo ? toDo.id + 1 : 0,
        title: e.detail.data
      }
    ];
  }

  _emptyList() {
    this.toDoList = [];
  }

  _dropToDo(toDo) {
    this.toDoList = this.toDoList.filter(aToDo => aToDo !== toDo);
  }

  _openModalToDo(toDo) {
    this.id = toDo.id;
    this.title = toDo.title;
    this.openModal = true;
  }

  _updateToDo(e) {
    const title = e.detail.title;

    this.toDoList.map(toDo => {
      if(toDo.id == this.id) toDo.title = title;
    });
  }

  render() {
    return html`
    <header-template></header-template>

    <section class="section">
      <div class="container">
        
        <modal-todo 
          @UpdateToDo=${this._updateToDo}
          @CloseModal=${() => this.openModal = false} 
          .open=${this.openModal}
          .id=${this.id}
          .title=${this.title}
        ></modal-todo>

        <add-todo @AddToDo=${this._putInList} @DeleteAll=${this._emptyList}></add-todo>
        
        ${ this.toDoList.length == 0 ? this._emptyTemplate : this._cardTemplate }
      </div>
    </section>
    `;
  }

  get _emptyTemplate() {
    return html `
      <center>
        <p class="title">Empty :(</p>
      </center>
    `;
  }

  get _cardTemplate() {
    return html`
        ${this.toDoList.map(toDo => html`
          <div class="card">
              <header class="card-header">
                  <p class="card-header-title">${toDo.title}</p>
              </header>
              <footer class="card-footer">
                  <a @click=${() => this._openModalToDo(toDo)} href="#" class="card-footer-item">Edit</a>
                  <a @click=${() => this._dropToDo(toDo)} href="#" class="card-footer-item">Delete</a>
              </footer>
          </div>
        `)}
    `;
  }
}