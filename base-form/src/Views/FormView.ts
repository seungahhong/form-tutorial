import { on, remove } from '../helpers/events';
import { set, focus } from '../helpers/doms';
import View from './View';

interface formViewTypes {
  key: string;
  element: HTMLInputElement | HTMLDivElement;
}

class FormView extends View {
  userNameInput: formViewTypes;
  emailInput: formViewTypes;
  passwordInput: formViewTypes;
  errorDiv: formViewTypes;

  constructor() {
    super(document.getElementById('submit') as HTMLElement);

    this.userNameInput = {
      key: 'userName',
      element: document.getElementById('userName') as HTMLInputElement,
    };

    this.emailInput = {
      key: 'email',
      element: document.getElementById('email') as HTMLInputElement,
    };

    this.passwordInput = {
      key: 'password',
      element: document.getElementById('password') as HTMLInputElement,
    };

    this.errorDiv = {
      key: 'error',
      element: document.getElementById('error') as HTMLDivElement,
    };
  }

  init() {
    on(this.userNameInput.element, 'change', (event) => {
      this.emit('userName@change', (event.target as HTMLInputElement).value);
    });
    on(this.emailInput.element, 'change', (event) => {
      this.emit('email@change', (event.target as HTMLInputElement).value);
    });
    on(this.passwordInput.element, 'change', (event) => {
      this.emit('password@change', (event.target as HTMLInputElement).value);
    });
    this.on('submit', (event) => {
      event.preventDefault();

      this.emit('handleSubmit');
    });
  }

  destory() {
    remove(this.userNameInput.element, 'change', () => {});
    remove(this.emailInput.element, 'change', () => {});
    remove(this.passwordInput.element, 'change', () => {});
    this.remove('submit', (event) => {});
  }

  clear() {
    set(this.userNameInput.element as HTMLInputElement, '');
    set(this.emailInput.element as HTMLInputElement, '');
    set(this.passwordInput.element as HTMLInputElement, '');
  }

  focus(key: string) {
    if (this.userNameInput.key === key) {
      focus(this.userNameInput.element);
    } else if (this.emailInput.key === key) {
      focus(this.emailInput.element);
    } else if (this.passwordInput.key === key) {
      focus(this.passwordInput.element);
    }
  }

  errorMssage(message: string) {
    set(this.errorDiv.element as HTMLDivElement, message);
  }
}

export default FormView;
