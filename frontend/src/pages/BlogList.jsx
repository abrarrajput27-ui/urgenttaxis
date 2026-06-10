import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';
import { Calendar, ChevronRight } from 'lucide-react';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('title, slug, image_url, meta_description, created_at')
          .eq('is_published', true)
          .order('created_at', { ascending: false });
        
        if (!error && data) {
          setBlogs(data);
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Travel Blog | Urgent Taxis</title>
        <meta name="description" content="Read the latest travel tips, destination guides, and taxi fare updates from Urgent Taxis." />
      </Helmet>

      {/* Header */}
      <div className="bg-[#1e3b8a] text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Travel Blog</h1>
        <p className="text-blue-100 text-lg">Your guide to hassle-free travel across India.</p>
      </div>

      {/* Blog Grid */}
      <div className="max-w-[1200px] mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center text-gray-500 py-20">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-gray-500 py-20">No articles published yet. Check back soon!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <div key={blog.slug} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group flex flex-col">
                <Link to={`/blog/${blog.slug}`} className="block relative overflow-hidden aspect-[16/9]">
                  {blog.image_url ? (
                    <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-200">
                      <span className="text-4xl font-bold">UT</span>
                    </div>
                  )}
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-gray-400 text-sm font-medium mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#1e3b8a] transition-colors">
                    <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                    {blog.meta_description}
                  </p>
                  <Link to={`/blog/${blog.slug}`} className="text-[#0aa63f] font-bold text-sm flex items-center hover:text-[#088c34]">
                    Read More <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
