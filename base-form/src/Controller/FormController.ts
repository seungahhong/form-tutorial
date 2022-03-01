import FormModel from '../Model/FormModel';
import FormView from '../Views/FormView';

interface formControllerModel {
  userNameModel: FormModel;
  emailModel: FormModel;
  passwordModel: FormModel;
}

class FormController {
  formView: FormView;
  formModel: formControllerModel;

  constructor() {
    this.formView = new FormView();
    this.formModel = {
      userNameModel: new FormModel('userName', {
        required: 'userName is Required',
        minLength: {
          message: 'userName 길이가 5보다 커야합니다.',
          value: 5,
        },
      }),
      emailModel: new FormModel('email', {
        required: 'email is Required',
      }),
      passwordModel: new FormModel('password', {
        required: 'password is Required',
      }),
    };

    this.init();
  }

  init() {
    this.formView.init();

    this.formView
      .on('handleSubmit', (event) => {
        const { userNameModel, emailModel, passwordModel } = this.formModel;

        const userName = userNameModel.getValid();
        if (userName) {
          this.formView.validate({
            message: userName.message,
            focus: userName.key,
          });
          return;
        }

        const email = emailModel.getValid();
        if (email) {
          this.formView.validate({
            message: email.message,
            focus: email.key,
          });
          return;
        }

        const password = passwordModel.getValid();
        if (password) {
          this.formView.validate({
            message: password.message,
            focus: password.key,
          });
        }
      })
      .on('userName@change', (event) => {
        const { userNameModel } = this.formModel;
        userNameModel.setValue((event as CustomEvent).detail);
      })
      .on('email@change', (event) => {
        const { emailModel } = this.formModel;
        emailModel.setValue((event as CustomEvent).detail);
      })
      .on('password@change', (event) => {
        const { passwordModel } = this.formModel;
        passwordModel.setValue((event as CustomEvent).detail);
      })
      .on('@blur', () => {
        const { userNameModel, emailModel, passwordModel } = this.formModel;

        const userName = userNameModel.getValid();
        if (userName) {
          this.formView.validate({
            message: userName.message,
          });
          return;
        }

        const email = emailModel.getValid();
        if (email) {
          this.formView.validate({
            message: email.message,
          });
          return;
        }

        const password = passwordModel.getValid();
        if (password) {
          this.formView.validate({
            message: password.message,
          });
        }
      });
  }

  destroy() {
    this.formView.destory();
  }
}

export default FormController;
