interface formTypes {
  key: string;
  value: string;
  required?: string;
  minLength?: {
    message: string;
    value: number;
  };
}

type formOptions = Omit<formTypes, 'key' | 'value'>;

export default class FormModel {
  data: formTypes;

  constructor(key: string, options: formOptions) {
    this.data = {
      key,
      value: '',
      required: options.required,
      minLength: options.minLength,
    };
  }

  getValue(): string {
    return this.data.value;
  }

  setValue(_value: string): void {
    this.data.value = _value;
  }

  getValid(): { key: string; message: string } | void {
    if (this.data.required && this.data.value === '') {
      return { key: this.data.key, message: this.data.required };
    }

    if (
      this.data.minLength &&
      this.data.minLength.value > this.data.value.length
    ) {
      return { key: this.data.key, message: this.data.minLength.message };
    }
  }
}
