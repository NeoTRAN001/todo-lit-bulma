import { LitElement, html } from 'lit-element';

export class AddTodo extends LitElement {

  createRenderRoot() { return this; }

  _sendToDo() {
    const data = document.getElementById('input-add-todo').value;

    if(data) {
      this._createEvent(data);
      document.querySelector('#input-add-todo').value = '';
    }     
  }

  _deleteAll() {
    this._createEvent(null);
  }

  _createEvent(data) {
    this.dispatchEvent(new CustomEvent(data ? 'AddToDo' : 'DeleteAll', {
      detail: { data }, bubbles: true, composed: true
    }));
  }

  render() {
    return html`
        <div class="field is-grouped">
            <p class="control is-expanded">
                <input id="input-add-todo" class="input" type="text" placeholder="Name of the ToDo">
            </p>
            <p class="control">
                <div class="buttons">
                    <button @click=${this._sendToDo} class="button is-success">Add</button>
                    <button @click=${this._deleteAll} class="button is-danger">Delete all</button>
                </div>
            </p>
        </div>
    `;
  }
}

customElements.define('add-todo', AddTodo);