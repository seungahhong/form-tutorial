import { eventHandler } from '../helpers/events';
import { on, emit, remove } from '../helpers/events';

export default class View {
  element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  on(eventName: string, handler: eventHandler<Event>) {
    on(this.element, eventName, handler);

    return this;
  }

  remove(eventName: string, handler: eventHandler<Event>) {
    remove(this.element, eventName, handler);

    return this;
  }

  emit(eventName: string, value?: string) {
    emit(this.element, eventName, value);

    return this;
  }
}
