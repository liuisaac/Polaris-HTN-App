// // src/components/NotificationButton.js

// import { useState } from "react";

// const NotificationButton = () => {
//     const [isSubscribed, setIsSubscribed] = useState(false);

//     const subscribeUser = async () => {
//         if ("Notification" in window && "serviceWorker" in navigator) {
//             const permission = await Notification.requestPermission();
//             if (permission === "granted") {
//                 const registration = await navigator.serviceWorker.ready;
//                 const subscription = await registration.pushManager.subscribe({
//                     userVisibleOnly: true,
//                     applicationServerKey:
//                         "BEtmMjDI1V-07XqGUrl9vQeSuX8XJ0l37h-cDfTxKNqA2cqkWeK_5XD3gPUok1CAbbxvfhdfmwRPj43YAvM_SK0",
//                 });
//                 // Send subscription to your server
//                 await fetch("/save-subscription", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify(subscription),
//                 });
//                 setIsSubscribed(true);
//             }
//         }
//     };

//     return (
//         <button onClick={subscribeUser}>
//             {isSubscribed ? "Subscribed" : "Subscribe for Notifications"}
//         </button>
//     );
// };

// export default NotificationButton;
