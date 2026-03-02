export interface Order {
  id: string
  clientName: string
  clientPhone: string
  clientEmail: string
  serviceType: string
  peopleCount: number
  amount: number
  date: string
  time: string
  status: string
  statusLabel: string
  roomType: string
  hotel: string
  stayDuration: string
  startDate: string
  endDate: string
  paidAmount: number
  remainingAmount: number
  totalAmount: number
  paymentMethod: string
}

const orders: Order[] = [
  {
    id: 'ORD-2024-001',
    clientName: 'أحمد محمد العتيبي',
    clientPhone: '0501234567',
    clientEmail: 'ahmed@example.com',
    serviceType: 'عمرة - باقة VIP',
    peopleCount: 2,
    amount: 18500,
    date: '2024-01-15',
    time: '10:30',
    status: 'pending_payment',
    statusLabel: 'مدفوع ',
    roomType: 'غرفة مزدوجة فاخرة',
    hotel: 'فندق رويال بلاس',
    stayDuration: '15 يوم',
    startDate: '2024-06-15',
    endDate: '2024-06-30',
    paidAmount: 15000,
    remainingAmount: 3500,
    totalAmount: 18500,
    paymentMethod: 'بطاقة ائتمانية',
  },
  {
    id: 'ORD-2024-002',
    clientName: 'فاطمة عبدالله السالم',
    clientPhone: '0559876543',
    clientEmail: 'fatima@example.com',
    serviceType: 'حج - باقة عائلية',
    peopleCount: 4,
    amount: 25000,
    date: '2024-01-14',
    time: '14:20',
    status: 'confirmed',
    statusLabel: 'مؤكدة',
    roomType: 'غرفة عائلية',
    hotel: 'فندق مكة',
    stayDuration: '20 يوم',
    startDate: '2024-07-01',
    endDate: '2024-07-21',
    paidAmount: 25000,
    remainingAmount: 0,
    totalAmount: 25000,
    paymentMethod: 'تحويل بنكي',
  },
  {
    id: 'ORD-2024-003',
    clientName: 'خالد سعد الغامدي',
    clientPhone: '0543216789',
    clientEmail: 'khalid@example.com',
    serviceType: 'عمرة - باقة اقتصادية',
    peopleCount: 1,
    amount: 4200,
    date: '2024-01-13',
    time: '09:15',
    status: 'completed',
    statusLabel: 'مكتملة',
    roomType: 'غرفة فردية',
    hotel: 'فندق المدينة',
    stayDuration: '7 أيام',
    startDate: '2024-02-10',
    endDate: '2024-02-17',
    paidAmount: 4200,
    remainingAmount: 0,
    totalAmount: 4200,
    paymentMethod: 'بطاقة ائتمانية',
  },
  {
    id: 'ORD-2024-004',
    clientName: 'نورة حسن القحطاني',
    clientPhone: '0567891234',
    clientEmail: 'noura@example.com',
    serviceType: 'عمرة - باقة مميزة',
    peopleCount: 2,
    amount: 6800,
    date: '2024-01-12',
    time: '16:45',
    status: 'rejected',
    statusLabel: 'مرفوضة',
    roomType: 'غرفة مزدوجة',
    hotel: 'فندق النور',
    stayDuration: '10 أيام',
    startDate: '2024-03-01',
    endDate: '2024-03-11',
    paidAmount: 6800,
    remainingAmount: 0,
    totalAmount: 6800,
    paymentMethod: 'بطاقة ائتمانية',
  },
  {
    id: 'ORD-2024-005',
    clientName: 'عبدالرحمن علي الشهري',
    clientPhone: '0512345678',
    clientEmail: 'abdelrahman@example.com',
    serviceType: 'حج - باقة فاخرة',
    peopleCount: 3,
    amount: 18500,
    date: '2024-01-11',
    time: '11:30',
    status: 'cancelled',
    statusLabel: 'ملغاة',
    roomType: 'غرفة ثلاثية',
    hotel: 'فندق الحرمين',
    stayDuration: '25 يوم',
    startDate: '2024-08-01',
    endDate: '2024-08-26',
    paidAmount: 0,
    remainingAmount: 18500,
    totalAmount: 18500,
    paymentMethod: '-',
  },
]

export const useOrders = () => {
  const getOrderById = (id: string): Order | undefined => {
    return orders.find((o) => o.id === id || o.id.replace(/\//g, '-') === id)
  }

  return {
    orders,
    getOrderById,
  }
}
