const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
};

const saveSubscription = async (subscription) => {
    const response = await fetch("http://localhost:8080/save-subscription", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
    });

    return response.json();
};

self.addEventListener("install", (event) => {
    // Perform install steps
});

self.addEventListener("activate", (event) => {
    console.log("Service Worker activating...");
});

// Track the last time a notification was sent
let lastNotificationTime = 0;
const notificationInterval = 60 * 1000; // 1-minute interval between notifications

self.addEventListener("push", (event) => {
    const now = Date.now();

    // Check if enough time has passed since the last notification
    if (now - lastNotificationTime < notificationInterval) {
        console.log("Too soon for another notification.");
        return;
    }

    const notifications = [
        "It's picture time! 📸 Share what you're doing with hackers across the venue.",
        "Code Break! 💻 Need a breather? Grab a snack, snap a pic, and recharge!",
        "Last Stretch! ⏳ Catch one more picture before the deadline!",
    ];

    const options = {
        body: "Polaris",
        icon: "./notification/image.webp",
        data: {
            url: "http://localhost:3000/snap",
        },
    };

    // Send the notification
    event.waitUntil(
        self.registration.showNotification(
            notifications[Math.floor(Math.random() * notifications.length)],
            options
        )
    );

    // Update the last notification time
    lastNotificationTime = now;
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close(); // Close the notification

    // Open the URL specified in the notification data
    event.waitUntil(clients.openWindow(event.notification.data.url));
});
