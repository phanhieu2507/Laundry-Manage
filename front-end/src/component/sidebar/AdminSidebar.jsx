// ===== NEW UI: Admin Sidebar (replaces Ant Design Sidebar) =====
// Matches Homepage design system with TailwindCSS

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  ShoppingCart, 
  Users, 
  Tag 
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();

  // ===== MENU ITEMS =====
  const menuItems = [
    {
      key: 'dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: 'Dashboard',
      path: '/admin/dashboard'
    },
    {
      key: 'services',
      icon: <Package className="w-5 h-5" />,
      label: 'Services',
      path: '/admin/services'
    },
    {
      key: 'requests',
      icon: <MessageSquare className="w-5 h-5" />,
      label: 'Requests',
      path: '/admin/request-orders'
    },
    {
      key: 'orders',
      icon: <ShoppingCart className="w-5 h-5" />,
      label: 'Orders',
      path: '/admin/orders'
    },
    {
      key: 'users',
      icon: <Users className="w-5 h-5" />,
      label: 'Users',
      path: '/admin/users'
    },
    {
      key: 'promo-codes',
      icon: <Tag className="w-5 h-5" />,
      label: 'Promo Codes',
      path: '/admin/promo-codes'
    }
  ];

  // ===== CHECK ACTIVE PATH =====
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <aside className="bg-white fixed top-16 left-0 bottom-0 w-64 z-30 shadow-lg border-r border-gray-200">
      <div className="h-full flex flex-col py-6">
        {/* Admin Panel Title */}
        <div className="px-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
          <p className="text-sm text-gray-600 mt-1">Manage your laundry business</p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.key}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <span className={isActive(item.path) ? 'text-white' : 'text-gray-600'}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Info */}
        <div className="px-6 mt-6 pt-6 border-t border-gray-200">
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-blue-900 font-semibold mb-1">Need Help?</p>
            <p className="text-xs text-blue-700">Contact support for assistance</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
