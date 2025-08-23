class NotificationService {
  constructor() {
    this.notifications = []
    this.listeners = []
  }

  subscribe(listener) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  notify(notification) {
    this.notifications.unshift({
      ...notification,
      id: Date.now(),
      timestamp: new Date(),
      read: false
    })
    
    // Keep only last 50 notifications
    this.notifications = this.notifications.slice(0, 50)
    
    // Notify all listeners
    this.listeners.forEach(listener => listener(this.notifications))
  }

  markAsRead(id) {
    const notification = this.notifications.find(n => n.id === id)
    if (notification) {
      notification.read = true
      this.listeners.forEach(listener => listener(this.notifications))
    }
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true)
    this.listeners.forEach(listener => listener(this.notifications))
  }

  getUnreadCount() {
    return this.notifications.filter(n => !n.read).length
  }

  getAll() {
    return this.notifications
  }
}

export default new NotificationService()
