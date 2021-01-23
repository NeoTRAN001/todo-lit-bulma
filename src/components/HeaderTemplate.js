import { LitElement, html } from 'lit-element';

export class HeaderTemplate extends LitElement {

  createRenderRoot() { return this; }

  render() {
    return html`
    <nav class="navbar is-dark">
        <div class="navbar-menu">
            <div class="navbar-start">
                <img src="https://bulma.io/images/bulma-logo-white.png" width="159" height="28">
            </div>
        </div>
    </nav>
    `;
  }
}

customElements.define('header-template', HeaderTemplate);