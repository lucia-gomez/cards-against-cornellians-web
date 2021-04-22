const Toast = (text, time) => window.M.toast(
  {
    html: text,
    displayLength: time,
    classes: 'toast'
  }
);

export default Toast;