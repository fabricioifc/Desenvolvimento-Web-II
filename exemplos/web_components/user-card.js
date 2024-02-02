class UserCard extends HTMLElement {
  constructor() {
    super();

    // Create a Shadow Root
    this.shadow = this.attachShadow({ mode: 'open' });

    // Create a container for the user card
    this.container = document.createElement('div');
    this.container.setAttribute('class', 'user-card');

    // Apply default styles
    this.container.innerHTML = `
      <style>
        .user-card {
          font-family: Arial, sans-serif;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 20px;
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 20px;
        }

        .user-info {
          flex-grow: 1;
        }

        .user-info h2 {
          margin: 0;
          font-size: 18px;
          margin-bottom: 5px;
        }

        .user-info p {
          margin: 0;
          font-size: 14px;
          color: #666;
        }

        .user-info small {
          display: block;
          padding-top: 5px;
          font-size: 12px;
          color: #999;
        }

        .dark-theme {
          background-color: #222;
          color: #fff;
          border-color: #000;
        }

      </style>
    `;

    // Append container to shadow root
    this.shadow.appendChild(this.container);
  }

  connectedCallback() {
    // Render user information
    this.render();
  }

  render() {
    const name = this.getAttribute('name') || 'No name';
    const email = this.getAttribute('email') || 'no-email@example.com';
    const avatar = this.getAttribute('avatar') || 'https://gravatar.com/avatar/cd8a2285654152fa43055126b8a497db?s=400&d=robohash&r=g';

    this.container.innerHTML += `
      <img class="avatar" src="${avatar}" alt="User Avatar">
      <div class="user-info">
        <h2>${name}</h2>
        <p>${email}</p>
        <small><slot name="description"></slot></small>
      </div>
    `;
    
    this.shadow.addEventListener('click', () => {
      console.log('clicked');
      this.shadow.querySelector('.user-card').classList.toggle('dark-theme');
    });
  }

}

// Define the custom element
customElements.define('user-card', UserCard);
