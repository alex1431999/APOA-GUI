import { store } from 'react-notifications-component'

class Notification {
  constructor() {
    this.types = {
      success: 'success',
      danger: 'danger',
      info: 'info',
      default: 'default',
      warning: 'warning',
    }
  }

  display(title, message, type) {
    store.addNotification({
      title,
      message,
      type,
      insert: 'bottom',
      container: 'bottom-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    });
  }
}

export default new Notification();
