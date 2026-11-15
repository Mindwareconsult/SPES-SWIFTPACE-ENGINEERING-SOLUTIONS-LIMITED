import React, { useState, useEffect } from 'react';
import { Settings, Lock, CheckCircle2, AlertCircle, Save } from 'lucide-react';
import { authFetch } from '../../utils/authFetch';
import { useAuth } from '../../context/AuthContext';
import { resolveApiUrl } from '../../utils/api';

export const AdminSettings: React.FC = () => {
  const { updateSessionToken, refreshSession } = useAuth();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [settingsError, setSettingsError] = useState<string | null>(null);
  const [savingSettings, setSavingSettings] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  useEffect(() => {
    fetch(resolveApiUrl('/api/settings'))
      .then((res) => res.json())
      .then((data) => {
        setSettings(data.settings || {});
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSettingChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSaveSuccess(false);
    setSettingsError(null);

    try {
      const res = await authFetch('/api/settings/admin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (!res.ok) throw new Error('Failed to update settings');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      setSettingsError('Failed to save settings. Please try again.');
    } finally {
      setSavingSettings(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword.length < 8) {
      setPasswordMsg({ type: 'error', text: 'New password must be at least 8 characters long.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    setUpdatingPassword(true);
    try {
      const res = await authFetch('/api/admin/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Password update failed.');
      }

      if (data.token && data.expiresAt) {
        await updateSessionToken(data.token, data.expiresAt);
      }
      await refreshSession();

      setPasswordMsg({ type: 'success', text: 'Administrator password updated successfully.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordMsg({ type: 'error', text: err.message || 'Error updating password.' });
    } finally {
      setUpdatingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 rounded-full border-2 border-[#12BCEB] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <h1 className="font-serif-luxury text-2xl font-bold text-white">
          Website Settings & Configuration
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Manage official contact details, addresses, telephone numbers, and administrator security.
        </p>
      </div>

      {/* Company Information Form */}
      <div className="p-8 rounded-2xl bg-[#06152F] border border-white/10 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#12BCEB]" />
            <h3 className="font-bold text-sm text-white">Company Identity & Contact Info</h3>
          </div>
          {saveSuccess && (
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-4 h-4" /> Settings Saved!
            </span>
          )}
          {settingsError && (
            <span className="text-xs text-red-400 flex items-center gap-1 font-semibold">
              <AlertCircle className="w-4 h-4" /> {settingsError}
            </span>
          )}
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Company Name</label>
              <input
                type="text"
                value={settings.company_name || ''}
                onChange={(e) => handleSettingChange('company_name', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">CAC Registration (RC Number)</label>
              <input
                type="text"
                value={settings.rc_number || 'RC:8978524'}
                onChange={(e) => handleSettingChange('rc_number', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Official Email Address</label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) => handleSettingChange('email', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Primary Telephone</label>
              <input
                type="text"
                value={settings.phone_primary || ''}
                onChange={(e) => handleSettingChange('phone_primary', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Secondary Telephone</label>
              <input
                type="text"
                value={settings.phone_secondary || ''}
                onChange={(e) => handleSettingChange('phone_secondary', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">WhatsApp Hotline Number (Digits)</label>
              <input
                type="text"
                value={settings.whatsapp_primary || '2349010753592'}
                onChange={(e) => handleSettingChange('whatsapp_primary', e.target.value)}
                placeholder="2349010753592"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Head Office Physical Address</label>
            <input
              type="text"
              value={settings.address_line1 || ''}
              onChange={(e) => handleSettingChange('address_line1', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
            />
          </div>

          <div className="pt-4 border-t border-white/10 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#12BCEB]">Corporate Profile & Website Copy</h4>
            
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Hero Main Headline</label>
              <input
                type="text"
                value={settings.hero_headline || ''}
                onChange={(e) => handleSettingChange('hero_headline', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Hero Subtitle</label>
              <textarea
                rows={2}
                value={settings.hero_subtitle || ''}
                onChange={(e) => handleSettingChange('hero_subtitle', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Company Overview (Approved Profile)</label>
              <textarea
                rows={4}
                value={settings.company_overview || ''}
                onChange={(e) => handleSettingChange('company_overview', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Company Vision</label>
                <textarea
                  rows={3}
                  value={settings.company_vision || ''}
                  onChange={(e) => handleSettingChange('company_vision', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Company Mission</label>
                <textarea
                  rows={3}
                  value={settings.company_mission || ''}
                  onChange={(e) => handleSettingChange('company_mission', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={savingSettings}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#063B85] to-[#12BCEB] text-white font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{savingSettings ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Security & Password Change */}
      <div id="security" className="p-8 rounded-2xl bg-[#06152F] border border-white/10 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
          <Lock className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-sm text-white">Administrator Password Security</h3>
        </div>

        {passwordMsg && (
          <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
            passwordMsg.type === 'success'
              ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-200'
              : 'bg-red-950/80 border border-red-500/50 text-red-200'
          }`}>
            {passwordMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{passwordMsg.text}</span>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4 text-xs max-w-lg">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Current Password</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">New Secure Password (Min 8 characters)</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-white focus:outline-none focus:border-[#12BCEB]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={updatingPassword}
              className="px-6 py-2.5 rounded-xl bg-[#078A43] hover:bg-[#09a04e] text-white font-bold uppercase tracking-wider transition-colors"
            >
              {updatingPassword ? 'Updating Password...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
