import { LitElement, html } from 'lit-element';

export class ModalToDo extends LitElement {

  createRenderRoot() { return this; }

  static get properties() {
    return {
      open: { type: Boolean },
      id: { type: Number },
      title: { type: String }
    };
  }

  constructor() {
    super();

    this.id = 0;
    this.title = '';
  }

  _closeModal() {
    this.dispatchEvent(new CustomEvent('CloseModal', {
        bubbles: true, composed: true
    }));
  }

  _editToDo() {
    
    const title = document.querySelector('#input-update-todo').value;

    this.dispatchEvent(new CustomEvent('UpdateToDo', {
      detail: { title }, bubbles: true, composed: true
    }));

    this.title = '';
    this._closeModal();
  }

  render() {
    return html`
    <div class="modal ${this.open ? 'is-active' : ''}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Id: ${this.id}</p>
            </header>
            <section class="modal-card-body">
                <input value="${this.title}" class="input" id="input-update-todo" type="text" placeholder="Name of the ToDo">
            </section>
            <footer class="modal-card-foot">
                <button @click=${this._editToDo} class="button is-success">Save changes</button>
                <button @click=${this._closeModal} class="button">Cancel</button>
            </footer>
        </div>
    </div>
    `;
  }
}

customElements.define('modal-todo', ModalToDo);