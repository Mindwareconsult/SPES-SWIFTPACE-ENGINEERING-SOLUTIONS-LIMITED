import React, { useState, useEffect } from 'react';
import { Enquiry } from '../../types';
import { authFetch } from '../../utils/authFetch';
import { 
  Inbox, 
  Search, 
  Download, 
  Trash2, 
  Eye, 
  Phone, 
  Mail, 
  MessageSquare, 
  FileText, 
  CheckCircle2, 
  X,
  MapPin
} from 'lucide-react';

export const AdminEnquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterService, setFilterService] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const [statusVal, setStatusVal] = useState<string>('New');
  const [updating, setUpdating] = useState(false);

  const statuses = ['All', 'New', 'Contacted', 'In Discussion', 'Quoted', 'Converted', 'Closed'];
  const services = [
    'All',
    'Architecture',
    'Building Construction',
    'Civil Engineering',
    'Structural Engineering',
    'Construction Management',
    'Consultancy',
    'Allied Services'
  ];

  const fetchEnquiries = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filterStatus !== 'All') params.set('status', filterStatus);
    if (filterService !== 'All') params.set('service', filterService);
    if (searchTerm) params.set('search', searchTerm);

    authFetch(`/api/enquiries/admin?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch enquiries');
        return res.json();
      })
      .then((data) => {
        setEnquiries(data.enquiries || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchEnquiries();
  }, [filterStatus, filterService, searchTerm]);

  const openDetails = (enq: Enquiry) => {
    setSelectedEnquiry(enq);
    setStatusVal(enq.enquiry_status);
    setInternalNotes(enq.internal_notes || '');
  };

  const handleUpdate = async () => {
    if (!selectedEnquiry) return;
    setUpdating(true);
    try {
      const res = await authFetch(`/api/enquiries/admin/${selectedEnquiry.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enquiry_status: statusVal,
          internal_notes: internalNotes
        })
      });

      if (!res.ok) throw new Error('Update failed');
      setSelectedEnquiry(null);
      fetchEnquiries();
    } catch {
      alert('Error updating enquiry status');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this enquiry record?')) return;
    try {
      const res = await authFetch(`/api/enquiries/admin/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      fetchEnquiries();
    } catch {
      alert('Failed to delete enquiry');
    }
  };

  const handleExportCsv = async () => {
    try {
      const res = await authFetch('/api/enquiries/admin/export/csv');
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'SPES_Swiftpace_Enquiries.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      alert('Failed to export enquiries CSV.');
    }
  };

  const handleDownloadAttachment = async (attachmentPath: string) => {
    try {
      const res = await authFetch(attachmentPath);
      if (!res.ok) throw new Error('Download failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = attachmentPath.split('/').pop() || 'enquiry-attachment';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      alert('Failed to download attachment.');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="font-serif-luxury text-2xl font-bold text-white">
            Client Inquiries & Project Briefs
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Incoming briefs submitted via the public contact portal.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-slate-200 transition-colors self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-[#12BCEB]" />
          <span>Export All to CSV</span>
        </button>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-[#06152F] border border-white/10 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by client name, email, phone, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[11px]">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#081D43] border border-white/10 text-white"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[11px]">Service:</span>
          <select
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#081D43] border border-white/10 text-white"
          >
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Enquiries List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-[#12BCEB] border-t-transparent animate-spin" />
        </div>
      ) : enquiries.length > 0 ? (
        <div className="rounded-2xl bg-[#06152F] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead>
                <tr className="border-b border-white/10 bg-[#081D43]/60 text-[10px] uppercase tracking-wider text-slate-400">
                  <th className="p-4">Client Name & Org</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Service & Type</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-semibold text-white">
                      <div>{enq.full_name}</div>
                      {enq.company_name && (
                        <div className="text-[10px] text-slate-400">{enq.company_name}</div>
                      )}
                    </td>
                    <td className="p-4 space-y-0.5">
                      <div className="text-slate-300">{enq.email}</div>
                      <div className="text-[11px] font-mono text-slate-400">{enq.phone}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-slate-200">{enq.service_required}</div>
                      <div className="text-[10px] text-slate-400">{enq.project_type}</div>
                    </td>
                    <td className="p-4 text-slate-300">{enq.project_location}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        enq.enquiry_status === 'New'
                          ? 'bg-amber-950 text-amber-300 border border-amber-600/30'
                          : enq.enquiry_status === 'Converted'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/30'
                          : 'bg-white/5 text-slate-300'
                      }`}>
                        {enq.enquiry_status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 font-mono text-[11px]">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openDetails(enq)}
                          className="p-1.5 rounded-lg bg-[#082657] hover:bg-[#0A3273] text-[#12BCEB]"
                          title="Open Brief Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(enq.id)}
                          className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300"
                          title="Delete Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-[#06152F] border border-white/10 text-slate-400 text-xs">
          No enquiries matching your current search or filters.
        </div>
      )}

      {/* Detail & Status Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl my-8 rounded-2xl bg-[#06152F] border border-white/20 p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-white">
                  Client Brief: {selectedEnquiry.full_name}
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">
                  Submitted {new Date(selectedEnquiry.created_at).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-[#081D43]/60 p-4 rounded-xl border border-white/5">
              <div>
                <span className="text-slate-400 text-[10px] uppercase">Client / Company</span>
                <div className="font-bold text-white mt-0.5">{selectedEnquiry.full_name}</div>
                {selectedEnquiry.company_name && (
                  <div className="text-slate-300">{selectedEnquiry.company_name}</div>
                )}
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase">Communication Channels</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <a href={`tel:${selectedEnquiry.phone}`} className="text-[#12BCEB] hover:underline font-mono">
                    {selectedEnquiry.phone}
                  </a>
                </div>
                <div>
                  <a href={`mailto:${selectedEnquiry.email}`} className="text-slate-300 hover:underline">
                    {selectedEnquiry.email}
                  </a>
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase">Service & Project Type</span>
                <div className="font-bold text-white mt-0.5">{selectedEnquiry.service_required}</div>
                <div className="text-slate-300">{selectedEnquiry.project_type}</div>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase">Location & Budget</span>
                <div className="font-bold text-white mt-0.5">{selectedEnquiry.project_location}</div>
                <div className="text-slate-300">Budget: {selectedEnquiry.estimated_budget || 'To be discussed'}</div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Project Description & Requirements
              </label>
              <div className="p-4 rounded-xl bg-[#081D43] border border-white/10 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.project_description}
              </div>
            </div>

            {/* Attachment Link if any */}
            {selectedEnquiry.attachment_path && (
              <div className="p-3.5 rounded-xl bg-[#082657] border border-[#12BCEB]/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#12BCEB]" />
                  <span className="text-slate-200 font-medium">Uploaded Blueprint / Drawing Package</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadAttachment(selectedEnquiry.attachment_path!)}
                  className="px-3 py-1 rounded bg-[#12BCEB] text-[#06152F] font-bold text-[11px] cursor-pointer"
                >
                  Download File
                </button>
              </div>
            )}

            {/* Status & Internal Engineering Notes */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div className="flex items-center gap-3">
                <label className="text-xs font-semibold text-slate-300">Update Workflow Status:</label>
                <select
                  value={statusVal}
                  onChange={(e) => setStatusVal(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-[#081D43] border border-white/10 text-xs text-white"
                >
                  {statuses.filter((s) => s !== 'All').map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Internal Directorate Notes (Private)
                </label>
                <textarea
                  rows={3}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="e.g., Reviewed architectural concepts. Site inspection scheduled for Thursday..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#081D43] border border-white/10 text-xs text-white focus:outline-none focus:border-[#12BCEB]"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                disabled={updating}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#063B85] to-[#12BCEB] text-white text-xs font-bold"
              >
                {updating ? 'Saving...' : 'Save Updates'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
