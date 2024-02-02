class NightDayToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Criar um checkbox para alternar entre os modos
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'night-day-toggle';
    checkbox.checked = false; // Modo diurno por padrão

    // Adicionar estilos CSS encapsulados
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: inline-block;
        font-family: Arial, sans-serif;
      }

      input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 40px;
        height: 20px;
        background-color: #ccc;
        border-radius: 20px;
        position: relative;
        cursor: pointer;
      }

      input[type="checkbox"]:before {
        content: '';
        width: 20px;
        height: 20px;
        background-color: #fff;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        transition: transform 0.3s ease;
      }

      input[type="checkbox"]:checked:before {
        transform: translateX(20px);
      }
    `;

    // Adicionar evento de mudança para alternar entre os modos
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        document.body.classList.add('night-mode');
      } else {
        document.body.classList.remove('night-mode');
      }
    });

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(checkbox);
  }
}

customElements.define('night-day-toggle', NightDayToggle);
