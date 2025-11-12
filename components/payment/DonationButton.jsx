'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Donation Payment Button Component
 */
export default function DonationButton({ className = '', buttonText = 'Make a Donation' }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    customAmount: '',
    donationProject: 'Temple Maintenance',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const predefinedAmounts = [501, 1001, 2001, 5001, 10001];
  const projects = [
    'Temple Maintenance',
    'Religious Ceremonies',
    'Community Services',
    'General Donation'
  ];

  const handlePayment = async () => {
    try {
      setLoading(true);

      const amount = formData.amount === 'custom' 
        ? parseFloat(formData.customAmount)
        : parseFloat(formData.amount);

      if (!amount || amount <= 0) {
        alert('Please enter a valid donation amount');
        setLoading(false);
        return;
      }

      if (!formData.name || !formData.email) {
        alert('Please provide your name and email');
        setLoading(false);
        return;
      }

      // Create donation order
      const orderResponse = await fetch('/api/donations/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          donationProject: formData.donationProject,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          notes: formData.notes
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });
      }

      // Configure Razorpay options
      const options = {
        key: orderData.razorpayKeyId,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'KuberJi Mandir',
        description: `Donation for ${formData.donationProject}`,
        image: '/icons/om-symbol.png',
        order_id: orderData.order.id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          donationProject: formData.donationProject
        },
        theme: {
          color: '#8B4513',
        },
        handler: function (response) {
          // Success
          alert(`Thank you for your generous donation of ₹${amount}!\n\nReceipt: ${orderData.order.receipt}\nTransaction ID: ${response.razorpay_payment_id}`);
          setShowModal(false);
          setFormData({
            amount: '',
            customAmount: '',
            donationProject: 'Temple Maintenance',
            name: '',
            email: '',
            phone: '',
            notes: ''
          });
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        alert(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });

      razorpay.open();
      setLoading(false);

    } catch (error) {
      console.error('Donation error:', error);
      setLoading(false);
      alert(error.message || 'Failed to process donation');
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`spiritual-button bg-spiritual-gold hover:bg-gold-accent text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 ${className}`}
        data-button="donate"
      >
        {buttonText}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-ivory rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl border border-sandalwood/20"
          >
            <div className="p-6 border-b border-sandalwood/20">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-light text-deep-brown" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Make a Donation
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-deep-brown hover:text-sandalwood transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Donation Project */}
              <div>
                <label className="block text-sm font-medium text-deep-brown mb-2">
                  Donation For *
                </label>
                <select
                  value={formData.donationProject}
                  onChange={(e) => setFormData({ ...formData, donationProject: e.target.value })}
                  className="w-full px-4 py-3 border border-sandalwood/30 rounded-sm focus:ring-2 focus:ring-sandalwood focus:border-transparent bg-white"
                  required
                >
                  {projects.map(project => (
                    <option key={project} value={project}>{project}</option>
                  ))}
                </select>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="block text-sm font-medium text-deep-brown mb-3">
                  Donation Amount (₹) *
                </label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {predefinedAmounts.map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setFormData({ ...formData, amount: amt.toString(), customAmount: '' })}
                      className={`px-4 py-3 rounded-sm border-2 transition-all duration-200 ${
                        formData.amount === amt.toString() && formData.amount !== 'custom'
                          ? 'border-sandalwood bg-sandalwood/10 text-sandalwood font-semibold'
                          : 'border-sandalwood/30 text-deep-brown hover:border-sandalwood/50'
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, amount: 'custom' })}
                  className={`w-full px-4 py-3 rounded-sm border-2 transition-all duration-200 ${
                    formData.amount === 'custom'
                      ? 'border-sandalwood bg-sandalwood/10 text-sandalwood'
                      : 'border-sandalwood/30 text-deep-brown hover:border-sandalwood/50'
                  }`}
                >
                  Custom Amount
                </button>
                {formData.amount === 'custom' && (
                  <input
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Enter amount"
                    value={formData.customAmount}
                    onChange={(e) => setFormData({ ...formData, customAmount: e.target.value })}
                    className="w-full mt-3 px-4 py-3 border border-sandalwood/30 rounded-sm focus:ring-2 focus:ring-sandalwood focus:border-transparent"
                    required
                  />
                )}
              </div>

              {/* Donor Information */}
              <div className="space-y-4 pt-2 border-t border-sandalwood/20">
                <div>
                  <label className="block text-sm font-medium text-deep-brown mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-sandalwood/30 rounded-sm focus:ring-2 focus:ring-sandalwood focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-deep-brown mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-sandalwood/30 rounded-sm focus:ring-2 focus:ring-sandalwood focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-deep-brown mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-sandalwood/30 rounded-sm focus:ring-2 focus:ring-sandalwood focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-deep-brown mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-sandalwood/30 rounded-sm focus:ring-2 focus:ring-sandalwood focus:border-transparent"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-sandalwood/20">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border border-sandalwood/30 text-deep-brown rounded-sm hover:bg-sandalwood/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-sandalwood text-ivory rounded-sm hover:bg-deep-brown transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Proceed to Payment'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
