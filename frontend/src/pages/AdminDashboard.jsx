import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, LogOut, CheckCircle, Clock, XCircle, Edit2, Plus, Trash2, Globe, EyeOff } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const LEAD_STATUSES = ['New', 'Contacted', 'Quote Sent', 'Follow Up', 'Converted', 'Lost'];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' or 'blogs'

  // Leads State
  const [leads, setLeads] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Blogs State
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null); // null = not editing, {} = new, {...} = existing
  const [blogForm, setBlogForm] = useState({ title: '', slug: '', image_url: '', content: '', meta_title: '', meta_description: '', is_published: false });

  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchLeads();
      fetchBlogs();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const correctPin = import.meta.env.VITE_ADMIN_PIN || '7310';
    if (pin === correctPin) {
      sessionStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      fetchLeads();
      fetchBlogs();
    } else {
      setError('Invalid PIN');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  };

  // --- LEADS LOGIC ---
  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setLeads(data || []);
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoadingLeads(false);
    }
  };

  const updateLeadStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase.from('leads').update({ status: newStatus, updated_at: new Date() }).eq('id', id);
      if (error) throw error;
      setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
      if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status: newStatus });
    } catch (err) {
      alert('Failed to update status');
    }
  };

  // --- BLOGS LOGIC ---
  const fetchBlogs = async () => {
    setLoadingBlogs(true);
    try {
      const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setBlogs(data || []);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const handleBlogSave = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...blogForm, updated_at: new Date() };
      
      if (editingBlog.id) {
        const { error } = await supabase.from('blogs').update(payload).eq('id', editingBlog.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blogs').insert([payload]);
        if (error) throw error;
      }
      
      alert('Blog saved successfully');
      setEditingBlog(null);
      fetchBlogs();
    } catch (err) {
      alert('Failed to save blog: ' + err.message);
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (error) throw error;
      fetchBlogs();
    } catch (err) {
      alert('Failed to delete blog');
    }
  };

  const togglePublish = async (id, currentStatus) => {
    try {
      const { error } = await supabase.from('blogs').update({ is_published: !currentStatus }).eq('id', id);
      if (error) throw error;
      fetchBlogs();
    } catch (err) {
      alert('Failed to toggle status');
    }
  };

  const openBlogEditor = (blog = null) => {
    if (blog) {
      setBlogForm(blog);
      setEditingBlog(blog);
    } else {
      setBlogForm({ title: '', slug: '', image_url: '', content: '', meta_title: '', meta_description: '', is_published: false });
      setEditingBlog({});
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
                <input
                  type="password" value={pin} onChange={(e) => { setPin(e.target.value); setError(''); }}
                  placeholder="Enter PIN"
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-center text-2xl tracking-widest"
                  autoFocus
                />
                {error && <p className="mt-2 text-sm text-red-600 text-center">{error}</p>}
              </div>
              <button type="submit" className="w-full py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-black">Access</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet><title>Admin Dashboard | Urgent Taxis</title></Helmet>
      
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-gray-900">CRM & CMS</h1>
              <div className="hidden md:flex space-x-4">
                <button onClick={() => setActiveTab('leads')} className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'leads' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}>Leads</button>
                <button onClick={() => setActiveTab('blogs')} className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'blogs' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}>Blogs</button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={handleLogout} className="text-gray-400 hover:text-gray-600"><LogOut className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* LEADS TAB */}
        {activeTab === 'leads' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div><p className="text-sm font-medium text-gray-500">Total Leads</p><p className="text-2xl font-bold text-gray-900">{leads.length}</p></div>
                <div className="bg-blue-100 p-3 rounded-full"><Clock className="w-5 h-5 text-blue-600" /></div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div><p className="text-sm font-medium text-gray-500">New Leads</p><p className="text-2xl font-bold text-gray-900">{leads.filter(l => !l.status || l.status === 'New').length}</p></div>
                <div className="bg-blue-100 p-3 rounded-full"><Clock className="w-5 h-5 text-blue-600" /></div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div><p className="text-sm font-medium text-gray-500">Converted</p><p className="text-2xl font-bold text-gray-900">{leads.filter(l => l.status === 'Converted').length}</p></div>
                <div className="bg-green-100 p-3 rounded-full"><CheckCircle className="w-5 h-5 text-green-600" /></div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div><p className="text-sm font-medium text-gray-500">Lost</p><p className="text-2xl font-bold text-gray-900">{leads.filter(l => l.status === 'Lost').length}</p></div>
                <div className="bg-red-100 p-3 rounded-full"><XCircle className="w-5 h-5 text-red-600" /></div>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Recent Leads</h3>
                <button onClick={fetchLeads} className="text-sm text-blue-600 font-medium">Refresh</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route / Vehicle</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loadingLeads ? <tr><td colSpan="5" className="p-6 text-center">Loading...</td></tr> : 
                      leads.map((lead) => (
                      <tr key={lead.id}>
                        <td className="px-6 py-4 text-sm text-gray-500">{new Date(lead.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4"><div className="text-sm font-medium text-gray-900">{lead.name}</div><div className="text-sm text-gray-500">{lead.mobile}</div></td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium">{lead.trip_type}</div>
                          <div className="text-xs text-gray-500">{lead.pickup} → {lead.drop_location || 'N/A'}</div>
                          <div className="text-xs text-blue-600">{lead.vehicle_type}</div>
                        </td>
                        <td className="px-6 py-4">
                          <select value={lead.status || 'New'} onChange={(e) => updateLeadStatus(lead.id, e.target.value)} className="text-sm rounded border-gray-300">
                            {LEAD_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button onClick={() => setSelectedLead(lead)} className="text-blue-600">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* BLOGS TAB */}
        {activeTab === 'blogs' && (
          <>
            {editingBlog ? (
              <div className="bg-white shadow-sm rounded-xl border border-gray-100 p-6">
                <h3 className="text-lg font-bold mb-6">{editingBlog.id ? 'Edit Blog' : 'New Blog'}</h3>
                <form onSubmit={handleBlogSave} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700">Title</label><input required type="text" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" /></div>
                    <div><label className="block text-sm font-medium text-gray-700">Slug (e.g. delhi-to-agra-guide)</label><input required type="text" value={blogForm.slug} onChange={e => setBlogForm({...blogForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" /></div>
                  </div>
                  <div><label className="block text-sm font-medium text-gray-700">Image URL</label><input type="text" value={blogForm.image_url} onChange={e => setBlogForm({...blogForm, image_url: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" /></div>
                  <div><label className="block text-sm font-medium text-gray-700">Content (Markdown supported)</label><textarea required rows={10} value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700">Meta Title</label><input type="text" value={blogForm.meta_title} onChange={e => setBlogForm({...blogForm, meta_title: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" /></div>
                    <div><label className="block text-sm font-medium text-gray-700">Meta Description</label><input type="text" value={blogForm.meta_description} onChange={e => setBlogForm({...blogForm, meta_description: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" /></div>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" checked={blogForm.is_published} onChange={e => setBlogForm({...blogForm, is_published: e.target.checked})} className="h-4 w-4 text-blue-600 rounded border-gray-300" />
                    <label className="ml-2 block text-sm text-gray-900">Publish immediately</label>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <button type="button" onClick={() => setEditingBlog(null)} className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Blog</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">Manage Blogs</h3>
                  <button onClick={() => openBlogEditor()} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center text-sm"><Plus className="w-4 h-4 mr-1" /> New Blog</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loadingBlogs ? <tr><td colSpan="4" className="p-6 text-center">Loading...</td></tr> : 
                        blogs.length === 0 ? <tr><td colSpan="4" className="p-6 text-center">No blogs found.</td></tr> :
                        blogs.map((blog) => (
                        <tr key={blog.id}>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                            <div className="text-xs text-gray-500">/{blog.slug}</div>
                          </td>
                          <td className="px-6 py-4">
                            <button onClick={() => togglePublish(blog.id, blog.is_published)} className={`px-2 py-1 rounded text-xs flex items-center ${blog.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                              {blog.is_published ? <Globe className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                              {blog.is_published ? 'Published' : 'Draft'}
                            </button>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{new Date(blog.created_at).toLocaleDateString()}</td>
                          <td className="px-6 py-4 text-right space-x-3 text-sm">
                            <button onClick={() => openBlogEditor(blog)} className="text-blue-600"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => deleteBlog(blog.id)} className="text-red-600"><Trash2 className="w-4 h-4" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* LEAD DETAILS MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true"><div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setSelectedLead(null)}></div></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-bold text-gray-900 mb-4 border-b pb-2">Lead Details</h3>
                <div className="space-y-3 text-sm">
                  <p><strong>Name:</strong> {selectedLead.name}</p>
                  <p><strong>Phone:</strong> {selectedLead.mobile}</p>
                  <p><strong>Date of Travel:</strong> {selectedLead.trip_date}</p>
                  <p><strong>Trip Type:</strong> {selectedLead.trip_type}</p>
                  <p><strong>Vehicle:</strong> {selectedLead.vehicle_type}</p>
                  <p><strong>Pickup:</strong> {selectedLead.pickup}</p>
                  <p><strong>Drop:</strong> {selectedLead.drop_location || 'N/A'}</p>
                  <p><strong>Route Source:</strong> {selectedLead.route_source || 'Website Home'}</p>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
                <button type="button" className="w-full inline-flex justify-center rounded-md px-4 py-2 bg-gray-900 text-white sm:ml-3 sm:w-auto" onClick={() => setSelectedLead(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
