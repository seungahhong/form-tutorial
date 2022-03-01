import { on, remove } from '../helpers/events';
import { set, focus } from '../helpers/doms';
import View from './View';

interface formViewTypes {
  key: string;
  element: HTMLInputElement | HTMLDivElement;
}

interface validateViewOptions {
  message: string;
  focus?: string;
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
    on(this.userNameInput.element, 'blur', () => {
      this.emit('@blur');
    });

    on(this.emailInput.element, 'change', (event) => {
      this.emit('email@change', (event.target as HTMLInputElement).value);
    });
    on(this.emailInput.element, 'blur', () => {
      this.emit('@blur');
    });

    on(this.passwordInput.element, 'change', (event) => {
      this.emit('password@change', (event.target as HTMLInputElement).value);
    });
    on(this.passwordInput.element, 'blur', () => {
      this.emit('@blur');
    });

    this.on('submit', (event) => {
      event.preventDefault();

      this.emit('handleSubmit');
    });
  }

  destory() {
    remove(this.userNameInput.element, 'change', () => {});
    remove(this.userNameInput.element, 'blur', () => {});
    remove(this.emailInput.element, 'change', () => {});
    remove(this.emailInput.element, 'blur', () => {});
    remove(this.passwordInput.element, 'change', () => {});
    remove(this.passwordInput.element, 'blur', () => {});
    this.remove('submit', () => {});
  }

  clear() {
    set(this.userNameInput.element as HTMLInputElement, '');
    set(this.emailInput.element as HTMLInputElement, '');
    set(this.passwordInput.element as HTMLInputElement, '');
  }

  validate(validateOptions: validateViewOptions) {
    const { message, focus: focusKey } = validateOptions;
    set(this.errorDiv.element as HTMLDivElement, message);

    if (this.userNameInput.key === focusKey) {
      focus(this.userNameInput.element);
    } else if (this.emailInput.key === focusKey) {
      focus(this.emailInput.element);
    } else if (this.passwordInput.key === focusKey) {
      focus(this.passwordInput.element);
    }
  }

  errorMssage(message: string) {
    set(this.errorDiv.element as HTMLDivElement, message);
  }
}

export default FormView;
