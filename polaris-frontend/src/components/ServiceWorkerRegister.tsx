"use client"

// src/components/ServiceWorkerRegister.tsx
import { useEffect } from 'react';

const ServiceWorkerRegister = () => {
    useEffect(() => {
        const registerServiceWorker = async () => {
            if ('serviceWorker' in navigator) {
                try {
                    const registration = await navigator.serviceWorker.register('/sw.js');
                    console.log('Service Worker registered:', registration);
                } catch (error) {
                    console.error('Service Worker registration failed:', error);
                }
            }
        };

        registerServiceWorker();
    }, []);

    return null; // This component does not render anything
};

export default ServiceWorkerRegister;
