"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, Calendar, ImageIcon, Settings,
  FileText, ShoppingBag, BookOpen, LogOut, Menu, X,
  TrendingUp, Clock, DollarSign, Eye, RefreshCw, CheckCircle,
  XCircle, AlertCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [contents, setContents] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [contentFilter, setContentFilter] = useState('ALL');

  useEffect(() => {
    verifyAuth();
  }, []);

  useEffect(() => {
    if (user && activeSection === 'overview') {
      fetchStats();
    } else if (user && activeSection === 'bookings') {
      fetchBookings();
    } else if (user && activeSection === 'users') {
      fetchUsers();
    } else if (user && activeSection === 'content') {
      fetchContents();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, user, contentFilter]);

  const verifyAuth = async () => {
    try {
      const response = await fetch('/api/admin/verify');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        router.push('/admin/login');
      }
    } catch (error) {
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    setLoadingData(true);
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchBookings = async () => {
    setLoadingData(true);
    try {
      const response = await fetch('/api/admin/bookings?limit=20');
      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingData(true);
    try {
      const response = await fetch('/api/admin/users?limit=20');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchContents = async () => {
    setLoadingData(true);
    try {
      const url = contentFilter !== 'ALL' 
        ? `/api/admin/content?type=${contentFilter}&limit=50`
        : '/api/admin/content?limit=50';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setContents(data.contents);
      }
    } catch (error) {
      console.error('Failed to fetch contents:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleSaveContent = async (contentData) => {
    try {
      const url = '/api/admin/content';
      const method = editingContent ? 'PATCH' : 'POST';
      const body = editingContent 
        ? { ...contentData, id: editingContent.id }
        : contentData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setShowContentModal(false);
        setEditingContent(null);
        fetchContents();
      } else {
        alert('Failed to save content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Error saving content');
    }
  };

  const handleDeleteContent = async (id) => {
    if (!confirm('Are you sure you want to delete this content?')) return;
    
    try {
      const response = await fetch(`/api/admin/content?id=${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchContents();
      } else {
        alert('Failed to delete content');
      }
    } catch (error) {
      console.error('Error deleting content:', error);
      alert('Error deleting content');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'bookings', icon: FileText, label: 'Bookings' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'services', icon: BookOpen, label: 'Services & Aartis' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'gallery', icon: ImageIcon, label: 'Gallery' },
    { id: 'content', icon: FileText, label: 'Content' },
    { id: 'shop', icon: ShoppingBag, label: 'Shop' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-heritage-cream flex items-center justify-center">
        <div className="text-sandalwood text-xl">Loading...</div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'COMPLETED': return 'text-green-600 bg-green-50';
      case 'CONFIRMED': return 'text-blue-600 bg-blue-50';
      case 'PENDING': return 'text-amber-600 bg-amber-50';
      case 'CANCELLED': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'COMPLETED': return CheckCircle;
      case 'CONFIRMED': return CheckCircle;
      case 'PENDING': return AlertCircle;
      case 'CANCELLED': return XCircle;
      default: return AlertCircle;
    }
  };

  return (
    <div className="min-h-screen bg-heritage-cream">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-sandalwood/10 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Title */}
            <div className="flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden mr-3 text-deep-brown"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-xl font-light text-deep-brown" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                KuberJi Admin
              </h1>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 text-deep-brown hover:text-sandalwood transition-colors text-sm"
              >
                <Eye size={18} />
                <span className="hidden sm:inline">View Site</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-deep-brown hover:text-red-600 transition-colors text-sm"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)]
          w-64 bg-white border-r border-sandalwood/10 transition-transform duration-300 z-40
        `}>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-sm text-left transition-all duration-200
                    ${activeSection === item.id
                      ? 'bg-sandalwood text-ivory'
                      : 'text-deep-brown hover:bg-sandalwood/10'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="font-light">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {activeSection === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-light text-deep-brown mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Dashboard Overview
                </h2>
                <p className="text-incense">Welcome back, {user?.email}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {loadingData ? (
                  <div className="col-span-full text-center py-8 text-incense">Loading stats...</div>
                ) : stats ? (
                  [
                    {
                      icon: FileText,
                      value: stats.overview.totalBookings,
                      label: 'Total Bookings',
                      color: 'bg-blue-500',
                      change: stats.thisMonth.bookingGrowth
                    },
                    {
                      icon: Users,
                      value: stats.overview.totalUsers,
                      label: 'Total Users',
                      color: 'bg-green-500',
                      change: '+5.2%'
                    },
                    {
                      icon: DollarSign,
                      value: `₹${stats.overview.totalRevenue.toFixed(0)}`,
                      label: 'Total Revenue',
                      color: 'bg-amber-500',
                      change: '+12.3%'
                    },
                    {
                      icon: BookOpen,
                      value: stats.overview.totalServices,
                      label: 'Active Services',
                      color: 'bg-purple-500',
                      change: '-'
                    }
                  ].map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white rounded-lg p-6 border border-sandalwood/10 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className={`${stat.color} p-3 rounded-lg`}>
                            <Icon size={24} className="text-white" />
                          </div>
                          <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                        </div>
                        <div className="text-2xl font-light text-deep-brown mb-1">{stat.value}</div>
                        <div className="text-sm text-incense">{stat.label}</div>
                      </motion.div>
                    );
                  })
                ) : null}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg p-6 border border-sandalwood/10">
                <h3 className="text-xl font-light text-deep-brown mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveSection('events')}
                    className="p-4 border border-sandalwood/20 rounded-sm hover:bg-sandalwood/5 transition-colors text-left"
                  >
                    <Calendar className="text-sandalwood mb-2" size={24} />
                    <div className="font-medium text-deep-brown">Add New Event</div>
                    <div className="text-sm text-incense">Create festival or ceremony</div>
                  </button>
                  <button
                    onClick={() => setActiveSection('gallery')}
                    className="p-4 border border-sandalwood/20 rounded-sm hover:bg-sandalwood/5 transition-colors text-left"
                  >
                    <ImageIcon className="text-sandalwood mb-2" size={24} />
                    <div className="font-medium text-deep-brown">Upload Images</div>
                    <div className="text-sm text-incense">Add to gallery</div>
                  </button>
                  <button
                    onClick={() => setActiveSection('bookings')}
                    className="p-4 border border-sandalwood/20 rounded-sm hover:bg-sandalwood/5 transition-colors text-left"
                  >
                    <FileText className="text-sandalwood mb-2" size={24} />
                    <div className="font-medium text-deep-brown">View Bookings</div>
                    <div className="text-sm text-incense">Manage reservations</div>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg p-6 border border-sandalwood/10">
                <h3 className="text-xl font-light text-deep-brown mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {[
                    { action: 'New booking for Morning Aarti', time: '2 hours ago', icon: BookOpen },
                    { action: 'User registration: ram.sharma@email.com', time: '5 hours ago', icon: Users },
                    { action: 'Event published: Dhanteras Pooja', time: '1 day ago', icon: Calendar }
                  ].map((activity, idx) => {
                    const Icon = activity.icon;
                    return (
                      <div key={idx} className="flex items-center gap-4 p-3 hover:bg-sandalwood/5 rounded-sm transition-colors">
                        <div className="bg-sandalwood/10 p-2 rounded-full">
                          <Icon size={18} className="text-sandalwood" />
                        </div>
                        <div className="flex-1">
                          <div className="text-deep-brown text-sm">{activity.action}</div>
                          <div className="text-incense text-xs">{activity.time}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Content Management Section */}
          {activeSection === 'content' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-light text-deep-brown" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Content Management
                </h2>
                <button
                  onClick={() => {
                    setEditingContent(null);
                    setShowContentModal(true);
                  }}
                  className="bg-sandalwood text-ivory px-6 py-3 rounded-sm hover:bg-deep-brown transition-colors"
                >
                  + Add New Content
                </button>
              </div>

              {/* Content Type Filter */}
              <div className="bg-white rounded-lg p-4 border border-sandalwood/10">
                <div className="flex flex-wrap gap-2">
                  {['ALL', 'SERVICE_CARD', 'DONATION_PROJECT', 'SHOP_PRODUCT', 'EVENT', 'GALLERY_IMAGE', 'ANNOUNCEMENT'].map(type => (
                    <button
                      key={type}
                      onClick={() => setContentFilter(type)}
                      className={`px-4 py-2 rounded-sm text-sm transition-colors ${
                        contentFilter === type
                          ? 'bg-sandalwood text-ivory'
                          : 'bg-gray-100 text-deep-brown hover:bg-gray-200'
                      }`}
                    >
                      {type.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content List */}
              <div className="bg-white rounded-lg border border-sandalwood/10 overflow-hidden">
                {loadingData ? (
                  <div className="text-center py-12 text-incense">Loading content...</div>
                ) : contents.length === 0 ? (
                  <div className="text-center py-12 text-incense">
                    <div className="text-6xl mb-4">📝</div>
                    <p className="text-lg mb-2">No content items found</p>
                    <p className="text-sm">Click "Add New Content" to create your first content item</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-sandalwood/5">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-deep-brown uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-deep-brown uppercase tracking-wider">Title (EN)</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-deep-brown uppercase tracking-wider">Title (HI)</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-deep-brown uppercase tracking-wider">Category</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-deep-brown uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-deep-brown uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-deep-brown uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {contents.map((content) => (
                          <tr key={content.id} className="hover:bg-sandalwood/5">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-deep-brown">
                              {content.type.replace('_', ' ')}
                            </td>
                            <td className="px-6 py-4 text-sm text-deep-brown">{content.titleEn}</td>
                            <td className="px-6 py-4 text-sm text-deep-brown">{content.titleHi || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-deep-brown">{content.category || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-deep-brown">
                              {content.price ? `₹${content.price}` : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                content.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {content.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button
                                onClick={() => {
                                  setEditingContent(content);
                                  setShowContentModal(true);
                                }}
                                className="text-sandalwood hover:text-deep-brown"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteContent(content.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bookings & Users Sections */}
          {(activeSection === 'bookings' || activeSection === 'users') && (
            <div className="bg-white rounded-lg p-8 border border-sandalwood/10">
              <h2 className="text-2xl font-light text-deep-brown mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {activeSection === 'bookings' ? 'Bookings Management' : 'Users Management'}
              </h2>
              {loadingData ? (
                <div className="text-center py-12 text-incense">Loading...</div>
              ) : (
                <div className="text-center py-12 text-incense">
                  <div className="text-6xl mb-4">✅</div>
                  <p className="text-lg mb-2">
                    {activeSection === 'bookings' 
                      ? `${bookings.length} bookings found` 
                      : `${users.length} users found`}
                  </p>
                  <p className="text-sm">Detailed management interface coming soon</p>
                </div>
              )}
            </div>
          )}

          {/* Other Sections Placeholder */}
          {!['overview', 'content', 'bookings', 'users'].includes(activeSection) && (
            <div className="bg-white rounded-lg p-8 border border-sandalwood/10 min-h-[600px]">
              <h2 className="text-2xl font-light text-deep-brown mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {menuItems.find(item => item.id === activeSection)?.label}
              </h2>
              <div className="text-center py-12 text-incense">
                <div className="text-6xl mb-4">🚧</div>
                <p className="text-lg mb-2">Coming Soon</p>
                <p className="text-sm">
                  This section will allow you to manage {activeSection}.<br />
                  Full functionality will be available soon.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Content Modal */}
      {showContentModal && (
        <ContentModal
          content={editingContent}
          onClose={() => {
            setShowContentModal(false);
            setEditingContent(null);
          }}
          onSave={handleSaveContent}
        />
      )}
    </div>
  );
}

// Content Modal Component
function ContentModal({ content, onClose, onSave }) {
  const [formData, setFormData] = useState({
    type: content?.type || 'SERVICE_CARD',
    titleEn: content?.titleEn || '',
    titleHi: content?.titleHi || '',
    descriptionEn: content?.descriptionEn || '',
    descriptionHi: content?.descriptionHi || '',
    imageUrl: content?.imageUrl || '',
    price: content?.price || '',
    category: content?.category || '',
    isActive: content?.isActive !== undefined ? content.isActive : true,
    order: content?.order || 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-2xl font-light text-deep-brown" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {content ? 'Edit Content' : 'Add New Content'}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Content Type */}
          <div>
            <label className="block text-sm font-medium text-deep-brown mb-2">Content Type *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-sandalwood focus:border-transparent"
              required
            >
              <option value="SERVICE_CARD">Service Card</option>
              <option value="DONATION_PROJECT">Donation Project</option>
              <option value="SHOP_PRODUCT">Shop Product</option>
              <option value="EVENT">Event</option>
              <option value="GALLERY_IMAGE">Gallery Image</option>
              <option value="ANNOUNCEMENT">Announcement</option>
            </select>
          </div>

          {/* Title English */}
          <div>
            <label className="block text-sm font-medium text-deep-brown mb-2">Title (English) *</label>
            <input
              type="text"
              value={formData.titleEn}
              onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-sandalwood focus:border-transparent"
              required
            />
          </div>

          {/* Title Hindi */}
          <div>
            <label className="block text-sm font-medium text-deep-brown mb-2">Title (Hindi)</label>
            <input
              type="text"
              value={formData.titleHi}
              onChange={(e) => setFormData({ ...formData, titleHi: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-sandalwood focus:border-transparent"
            />
          </div>

          {/* Description English */}
          <div>
            <label className="block text-sm font-medium text-deep-brown mb-2">Description (English) *</label>
            <textarea
              value={formData.descriptionEn}
              onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-sandalwood focus:border-transparent"
              required
            />
          </div>

          {/* Description Hindi */}
          <div>
            <label className="block text-sm font-medium text-deep-brown mb-2">Description (Hindi)</label>
            <textarea
              value={formData.descriptionHi}
              onChange={(e) => setFormData({ ...formData, descriptionHi: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-sandalwood focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-deep-brown mb-2">Image URL</label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-sandalwood focus:border-transparent"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-deep-brown mb-2">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-sandalwood focus:border-transparent"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-deep-brown mb-2">Price (₹)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-sandalwood focus:border-transparent"
              />
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-medium text-deep-brown mb-2">Display Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-sandalwood focus:border-transparent"
              />
            </div>
          </div>

          {/* Active Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 text-sandalwood border-gray-300 rounded focus:ring-sandalwood"
            />
            <label htmlFor="isActive" className="ml-2 text-sm font-medium text-deep-brown">
              Active (visible on website)
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-deep-brown rounded-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-sandalwood text-ivory rounded-sm hover:bg-deep-brown transition-colors"
            >
              {content ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
