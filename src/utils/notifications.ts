"use client";

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type?: "success" | "info" | "theme" | "audio" | "card";
  timestamp?: string;
}

type NotificationListener = (notifications: ToastNotification[]) => void;

class NotificationManager {
  private notifications: ToastNotification[] = [];
  private listeners: Set<NotificationListener> = new Set();

  public show(notification: Omit<ToastNotification, "id">) {
    const id = Math.random().toString(36).substring(2, 9);
    const item: ToastNotification = {
      ...notification,
      id,
      timestamp: "now",
    };

    this.notifications = [item, ...this.notifications.slice(0, 4)];
    this.notify();

    // Auto dismiss after 3.8s
    setTimeout(() => {
      this.dismiss(id);
    }, 3800);
  }

  public dismiss(id: string) {
    this.notifications = this.notifications.filter((n) => n.id !== id);
    this.notify();
  }

  public subscribe(listener: NotificationListener) {
    this.listeners.add(listener);
    listener(this.notifications);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l([...this.notifications]));
  }
}

export const notificationManager = new NotificationManager();

export const showToast = (title: string, message: string, type: ToastNotification["type"] = "info") => {
  notificationManager.show({ title, message, type });
};
