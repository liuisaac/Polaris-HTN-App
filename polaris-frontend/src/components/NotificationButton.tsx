"use client";

import { useState } from "react";

// Convert base64 public key to Uint8Array
const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    try {
        const rawData = atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }

        return outputArray;
    } catch (error) {
        console.error("Base64 decoding failed:", error);
        throw new Error("Invalid Base64 encoding.");
    }
};

// Save subscription to the server
const saveSubscription = async (subscription: PushSubscription) => {
    const response = await fetch('http://localhost:8080/save-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription)
    });

    return response.json();
};

const NotificationButton = () => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Check if the browser supports necessary APIs
    const checkPermission = () => {
        if (!('serviceWorker' in navigator)) {
            setError("Service workers are not supported by your browser.");
            return false;
        }

        if (!('Notification' in window)) {
            setError("Notifications are not supported by your browser.");
            return false;
        }

        if (!('PushManager' in window)) {
            setError("Push notifications are not supported by your browser.");
            return false;
        }

        setError(null);
        return true;
    };

    // Register the service worker
    const registerSW = async () => {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            return registration;
        } catch (error) {
            setError("Service worker registration failed.");
            console.error("Service worker registration failed:", error);
            return null;
        }
    };

    // Request permission for notifications
    const requestNotificationPermission = async () => {
        try {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                setError("Notification permission was not granted.");
                return false;
            }
            return true;
        } catch (error) {
            setError("Failed to request notification permission.");
            console.error("Failed to request notification permission:", error);
            return false;
        }
    };

    // Subscribe to notifications
    const subscribeToNotifications = async () => {
        if (!checkPermission()) return;

        try {
            const registration = await registerSW();
            if (!registration) return;

            const permissionGranted = await requestNotificationPermission();
            if (!permissionGranted) return;

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array("BEtmMjDI1V-07XqGUrl9vQeSuX8XJ0l37h-cDfTxKNqA2cqkWeK_5XD3gPUok1CAbbxvfhdfmwRPj43YAvM_SK0")
            });

            await saveSubscription(subscription);

            setIsSubscribed(true);
            console.log("Subscribed to notifications!");
        } catch (error) {
            setError("Error during subscription.");
            console.error("Error during subscription:", error);
        }
    };

    return (
        <div>
            {error && <div className="mb-4 p-2 bg-red-500 text-white rounded">{error}</div>}
            <button
                onClick={subscribeToNotifications}
                disabled={isSubscribed}
                className={`px-4 py-2 rounded ${isSubscribed ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
            >
                {isSubscribed ? "Subscribed" : "Enable Notifications"}
            </button>
        </div>
    );
};

export default NotificationButton;
