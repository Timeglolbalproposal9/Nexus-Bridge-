import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  Check, 
  Sparkles, 
  MessageSquare, 
  FileText, 
  ShieldCheck, 
  Clock, 
  X, 
  CheckCheck,
  ChevronRight
} from 'lucide-react';

export const NotificationsModal: React.FC = () => {
  const { 
    isNotificationsOpen, 
    setIsNotificationsOpen, 
    notifications, 
    unreadNotificationsCount, 
    markNotificationAsRead, 
    markAllNotificationsAsRead,
    setActiveTab,
    setActiveContactId,
    language 
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const isAr = language === 'ar';

  if (!isNotificationsOpen) return null;

  const filtered = notifications.filter(n => filter === 'all' || !n.read);

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markNotificationAsRead(notif.id);
    setIsNotificationsOpen(false);
    if (notif.type === 'message') {
      setActiveTab('Messages');
      setActiveContactId('contact-ot');
    } else if (notif.type === 'goal') {
      setActiveTab('Home');
    } else if (notif.type === 'session') {
      setActiveTab('Progress');
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'goal':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-indigo-500" />;
      case 'session':
        return <FileText className="w-4 h-4 text-emerald-500" />;
      case 'consent':
        return <ShieldCheck className="w-4 h-4 text-blue-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1F1B3A] border border-[#E8E2D9] dark:border-[#38325E] rounded-3xl max-w-md w-full max-h-[85vh] flex flex-col shadow-float animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8E2D9] dark:border-[#2F2952] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-[#4F46E5]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-base text-[#1F1B3A] dark:text-white">
                  {isAr ? 'الإشعارات' : 'Notifications'}
                </h3>
                {unreadNotificationsCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FF6B57] text-white">
                    {unreadNotificationsCount} new
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#6B6785] dark:text-gray-400">
                {isAr ? 'تنبيهات الأهداف والمحادثات وجلسات العلاج' : 'Goal reviews, therapist notes & session alerts'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsNotificationsOpen(false)}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter and Mark All Read Bar */}
        <div className="px-4 py-2 bg-[#FAF6F0] dark:bg-[#252044] border-b border-[#E8E2D9] dark:border-[#2F2952] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-full font-medium transition ${
                filter === 'all'
                  ? 'bg-white dark:bg-[#1F1B3A] text-[#4F46E5] shadow-xs'
                  : 'text-[#6B6785]'
              }`}
            >
              {isAr ? 'الكل' : 'All'}
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-2.5 py-1 rounded-full font-medium transition ${
                filter === 'unread'
                  ? 'bg-white dark:bg-[#1F1B3A] text-[#4F46E5] shadow-xs'
                  : 'text-[#6B6785]'
              }`}
            >
              {isAr ? 'غير المقروءة' : 'Unread'}
            </button>
          </div>

          {unreadNotificationsCount > 0 && (
            <button
              onClick={markAllNotificationsAsRead}
              className="text-[#4F46E5] dark:text-indigo-400 hover:underline flex items-center gap-1 text-[11px] font-semibold"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'تحديد الكل كمقروء' : 'Mark all read'}</span>
            </button>
          )}
        </div>

        {/* Notification Items List */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1 divide-y divide-gray-100 dark:divide-gray-800">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#6B6785]">
              {isAr ? 'لا توجد إشعارات جديدة' : 'No notifications to display'}
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                className={`pt-2.5 first:pt-0 p-2 rounded-2xl cursor-pointer transition flex items-start gap-3 hover:bg-[#FAF6F0] dark:hover:bg-[#252044] ${
                  !item.read ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-white dark:bg-[#2E2856] border border-[#E8E2D9] dark:border-[#38325E] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  {getIcon(item.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="text-xs font-bold text-[#1F1B3A] dark:text-white truncate">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-[#6B6785] shrink-0 ml-1">
                      {item.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B6785] dark:text-gray-300 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  {item.badge && (
                    <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FFF1CC] text-[#B7791F] dark:bg-amber-950 dark:text-amber-300">
                      {item.badge}
                    </span>
                  )}
                </div>

                {!item.read && (
                  <span className="w-2 h-2 rounded-full bg-[#FF6B57] shrink-0 mt-2"></span>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#E8E2D9] dark:border-[#2F2952]">
          <button
            onClick={() => setIsNotificationsOpen(false)}
            className="w-full py-2.5 rounded-xl bg-[#4F46E5] text-white text-xs font-semibold shadow-xs"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
