import FormController from './Controller/FormController';

export function init(): void {
  let formController: FormController | null;

  const _init = () => {
    if (!formController) {
      formController = new FormController();
    }
  };

  document.addEventListener('DOMContentLoaded', _init);

  const _destory = () => {
    if (formController) {
      formController.destroy();
      formController = null;
    }
  };

  window.addEventListener('unload', _destory);
  window.addEventListener('beforeunload', _destory);
}
