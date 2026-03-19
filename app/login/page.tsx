'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

const LOCATIONS = ['Main Warehouse', 'Sanpada', 'Ghansoli', 'Nerul', 'Ulwe'];

export default function LoginPage() {
  const [step, setStep] = useState<'location' | 'phone' | 'otp'>('location');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLocation || !phone) return;

    setLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setStep('otp');
      setLoading(false);
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) return;

    setLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      login(phone, selectedLocation);
      router.push('/dashboard');
    }, 1000);
  };

  const handleBack = () => {
    if (step === 'otp') {
      setStep('phone');
      setOtp(['', '', '', '', '', '']);
    } else if (step === 'phone') {
      setStep('location');
      setPhone('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-lg relative z-10 shadow-2xl p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4m0 0L4 7m16 0v10l-8 4m0 0l-8-4m0 0v-10"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Inventory</h1>
            <p className="text-slate-400 text-sm">Warehouse Management System</p>
          </div>

          {/* Form Content */}
          {step === 'location' && (
            <form onSubmit={(e) => {
              e.preventDefault();
              if (selectedLocation) setStep('phone');
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Select Store Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Choose a location</option>
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={!selectedLocation}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all"
                >
                  Continue
                </button>
              </div>
            </form>
          )}

          {step === 'phone' && (
            <form onSubmit={handleSendOTP}>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">
                    Selected Location
                  </label>
                  <div className="px-4 py-3 bg-slate-700 rounded-lg border border-slate-600 text-white">
                    {selectedLocation}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    maxLength={10}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 px-4 py-3 border border-slate-600 text-slate-300 hover:bg-slate-700 rounded-lg font-medium transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={phone.length !== 10 || loading}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all"
                  >
                    {loading ? 'Sending...' : 'Send OTP'}
                  </button>
                </div>
              </div>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOTP}>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-slate-400 mb-1">OTP sent to</p>
                  <p className="text-white font-medium">+91 {phone}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-4">
                    Enter OTP
                  </label>
                  <div className="flex gap-2 justify-between">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className="w-12 h-12 bg-slate-700 border-2 border-slate-600 rounded-lg text-center text-white text-lg font-bold focus:border-blue-500 focus:outline-none transition"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 px-4 py-3 border border-slate-600 text-slate-300 hover:bg-slate-700 rounded-lg font-medium transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={otp.join('').length !== 6 || loading}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all"
                  >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </div>

                <button
                  type="button"
                  className="w-full px-4 py-2 text-blue-400 hover:text-blue-300 hover:bg-slate-700/50 rounded-lg font-medium transition-all"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}
      </div>
    </div>
  );
}
