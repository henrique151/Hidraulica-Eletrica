export const addToastStyles = () => {
    const style = document.createElement("style");
    style.textContent = `
          .toast-container {
              position: fixed;
              top: 20px;
              right: 20px;
              z-index: 1055;
              display: flex;
              flex-direction: column;
              align-items: flex-end;
          }
  
          .toast-notification {
              background-color: #fff;
              border-left: 5px solid #28a745;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              margin-bottom: 1rem;
              padding: 1rem 1.5rem;
              opacity: 0;
              transform: translateX(100%);
              transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
              max-width: 350px;
              font-family: sans-serif;
              color: #333;
          }
  
          .toast-notification.show {
              opacity: 1;
              transform: translateX(0);
          }
  
          .toast-notification.success {
              border-left-color: #28a745; /* Green */
          }
  
          .toast-notification.error {
              border-left-color: #dc3545; /* Red */
          }
          
          .toast-notification.info {
              border-left-color: #17a2b8; /* Blue */
          }
      `;
    document.head.appendChild(style);
  };
  
  export const showToast = (message, type = "success") => {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }
  
    const toast = document.createElement("div");
    toast.className = `toast-notification ${type}`;
    toast.textContent = message;
  
    container.appendChild(toast);
  
    setTimeout(() => {
      toast.classList.add("show");
    }, 100);
  
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        if (toast.parentElement) {
          toast.remove();
        }
        if (container.children.length === 0) {
          container.remove();
        }
      }, 500);
    }, 5000);
  };
