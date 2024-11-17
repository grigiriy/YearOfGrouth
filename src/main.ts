import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')



// Wait for the script to load and initialize
window.onload = () => {
    const tg = window.Telegram.WebApp; // Telegram WebApp object
  
    // Log the full user data and session details
    console.log(tg.initDataUnsafe);
  
    // Get the current theme
    const theme = tg.colorScheme;

    // Apply the theme to the body or specific elements
    if (theme === "dark") {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.remove("dark-theme");
    }

    // Access specific user information
    const user = tg.initDataUnsafe?.user; // User object, if available
    if (user) {
      console.log("User ID:", user.id); // Log the user ID
      console.log("User First Name:", user.first_name); // User's first name
      console.log("User Last Name:", user.last_name); // User's last name
      console.log("User Username:", user.username); // User's username
    } else {
      console.log("User data is not available.");
    }
  };