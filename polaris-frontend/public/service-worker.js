self.addEventListener('push', function(event) {
    const options = {
        body: event.data.text(),
        icon: '/path/to/icon.png',
        badge: '/path/to/badge.png'
    };

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});
