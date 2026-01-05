import { addToastStyles } from './toast.js';
import { initUI } from './ui.js';
import { initContactForm } from './form.js';

window.addEventListener('DOMContentLoaded', () => {
    addToastStyles();
    initUI();
    initContactForm();
});