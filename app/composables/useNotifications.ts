export const useNotifications = () => {
  const notifications = useState('notifications', () => [
    {
      id: 1,
      message: 'طلب حجز جديد من محمد عبدالله الزهراني',
      type: 'new_order',
      read: false,
    },
    {
      id: 2,
      message: 'تم استلام الدفع الكامل للطلب 006-2024-ORD',
      type: 'payment_received',
      read: false,
    },
    {
      id: 3,
      message: 'تم رفع المستندات المطلوبة للطلب 005-2024-ORD',
      type: 'documents_uploaded',
      read: true,
    },
    {
      id: 4,
      message: 'طلب حجز جديد من فاطمة حسن القرني',
      type: 'new_order',
      read: true,
    },
    {
      id: 5,
      message: 'تم إلغاء الطلب 003-2024-ORD من قبل العميل',
      type: 'cancelled',
      read: true,
    },
  ])

  const unreadCount = computed(() =>
    notifications.value.filter((n) => !n.read).length
  )

  const markAsRead = (id: number) => {
    const notification = notifications.value.find((item) => item.id === id)
    if (!notification || notification.read) return
    notification.read = true
  }

  return {
    notifications,
    unreadCount,
    markAsRead,
  }
}

