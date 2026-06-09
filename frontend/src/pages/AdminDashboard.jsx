import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, LogOut, CheckCircle, Clock, XCircle, Search, Edit2, Calendar } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const LEAD_STATUSES = ['New', 'Contacted', 'Quote Sent', 'Follow Up', 'Converted', 'Lost'];

const StatusBadge = ({ status }) => {
  const colors = {
    'New': 'bg-blue-100 text-blue-800',
    'Contacted': 'bg-yellow-100 text-yellow-800',
    'Quote Sent': 'bg-purple-100 text-purple-800',
    'Follow Up': 'bg-orange-100 text-orange-800',
    'Converted': 'bg-green-100 text-green-800',
    'Lost': 'bg-red-100 text-red-800'
  };
  
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status || 'New'}
    </span>
  );
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);

  // Authentication check
  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchLeads();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const correctPin = import.meta.env.VITE_ADMIN_PIN || '7310';
    if (pin === correctPin) {
      sessionStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      fetchLeads();
    } else {
      setError('Invalid PIN');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setLeads([]);
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
      console.log('Supabase Anon Key exists?', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
      
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Supabase query error:', error);
        throw error;
      }
      
      console.log('Supabase returned data:', data);
      setLeads(data || []);
    } catch (err) {
      console.error('Error fetching leads:', err);
      alert('Failed to load leads. Did you run the Supabase migration? Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus, updated_at: new Date() })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <Helmet><title>Admin Login | Urgent Taxis</title></Helmet>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h2 className="mt-2 text-center text-2xl font-bold text-gray-900 mb-8">Admin Access</h2>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Enter Admin PIN</label>
                <div className="mt-1">
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => { setPin(e.target.value); setError(''); }}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center text-2xl tracking-widest"
                    autoFocus
                  />
                </div>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-black focus:outline-none"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet><title>Lead Dashboard | Urgent Taxis</title></Helmet>
      
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Urgent Taxis CRM</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 font-medium">Logged in</span>
              <button onClick={handleLogout} className="text-gray-400 hover:text-gray-600">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full"><Clock className="w-5 h-5 text-blue-600" /></div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">New Leads</p>
              <p className="text-2xl font-bold text-gray-900">{leads.filter(l => !l.status || l.status === 'New').length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full"><Clock className="w-5 h-5 text-blue-600" /></div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Converted</p>
              <p className="text-2xl font-bold text-gray-900">{leads.filter(l => l.status === 'Converted').length}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full"><CheckCircle className="w-5 h-5 text-green-600" /></div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Lost</p>
              <p className="text-2xl font-bold text-gray-900">{leads.filter(l => l.status === 'Lost').length}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full"><XCircle className="w-5 h-5 text-red-600" /></div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Recent Leads</h3>
            <button onClick={fetchLeads} className="text-sm text-blue-600 font-medium hover:text-blue-800">
              Refresh
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route / Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan="5" className="px-6 py-10 text-center text-gray-500">Loading leads...</td></tr>
                ) : leads.length === 0 ? (
                  <tr><td colSpan="5" className="px-6 py-10 text-center text-gray-500">No leads found.</td></tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(lead.created_at).toLocaleDateString()}<br/>
                        <span className="text-xs">{new Date(lead.created_at).toLocaleTimeString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500">{lead.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-medium">{lead.trip_type}</div>
                        <div className="text-xs text-gray-500 max-w-[200px] truncate" title={`${lead.pickup_location} → ${lead.drop_location}`}>
                          {lead.pickup_location} → {lead.drop_location || 'N/A'}
                        </div>
                        <div className="text-xs font-semibold text-blue-600 mt-1">{lead.vehicle_category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={lead.status || 'New'}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                          {LEAD_STATUSES.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => setSelectedLead(lead)}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          <Edit2 className="w-4 h-4 mr-1" /> View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Lead Details */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setSelectedLead(null)}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-bold text-gray-900 mb-4 border-b pb-2">
                      Lead Details
                    </h3>
                    
                    <div className="space-y-3 text-sm">
                      <p><strong>Name:</strong> {selectedLead.name}</p>
                      <p><strong>Phone:</strong> {selectedLead.phone}</p>
                      <p><strong>Date of Travel:</strong> {selectedLead.travel_date}</p>
                      <p><strong>Trip Type:</strong> {selectedLead.trip_type}</p>
                      <p><strong>Vehicle:</strong> {selectedLead.vehicle_category}</p>
                      <p><strong>Pickup:</strong> {selectedLead.pickup_location}</p>
                      <p><strong>Drop:</strong> {selectedLead.drop_location || 'N/A'}</p>
                      <p><strong>Route Source:</strong> {selectedLead.route_source || 'Website Home'}</p>
                      <p><strong>Created At:</strong> {new Date(selectedLead.created_at).toLocaleString()}</p>
                      
                      <div className="mt-4 pt-4 border-t">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          value={selectedLead.status || 'New'}
                          onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          {LEAD_STATUSES.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-900 text-base font-medium text-white hover:bg-black focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setSelectedLead(null)}
                >
                  Close
                </button>
                <a
                  href={`https://wa.me/91${selectedLead.phone}?text=Hi ${selectedLead.name}, this is regarding your taxi inquiry for ${selectedLead.pickup_location}...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm items-center"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
