import React, { useState, useEffect } from "react";
import { 
  BookOpen, 
  ArrowUpRight, 
  Lock, 
  Unlock, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Calendar, 
  Clock, 
  X, 
  Check, 
  Loader2, 
  AlertTriangle 
} from "lucide-react";
import Markdown from "react-markdown";
import { BlogPost } from "../types";
import { translations } from "../localization";

const DEFAULT_FALLBACK_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Unlocking Brain Dynamics: Chaos Theory and Complexity Analysis in EEG Signals",
    excerpt: "How non-linear dynamical systems and entropy measures are changing our approach to monitoring neurological deterioration and tracing early biomarkers of Alzheimer's Disease.",
    content: "### Introduction to Brain Dynamic Complexity\n\nThe human brain is arguably the most complex dynamical system known. Traditionally, EEG analysis has relied on linear models, spectral power bands (Alpha, Beta, Theta, Delta), and simple wave amplitude measures. However, neural systems are inherently non-linear, exhibiting multi-scale feedback loops and complex attractor states. \n\nBy leveraging **Chaos Theory** and mathematical entropy metrics (such as Approximate Entropy, Sample Entropy, and Fractal Dimension), we can capture the chaotic signature of neural synchronization that linear systems completely ignore.\n\n### The Degenerative Signature\n\nIn neurodegenerative conditions like Alzheimer's Disease (AD), we observe a progressive reduction in EEG signal complexity. In our recent research published in *BioMed Research International*, we reviewed how these complexity indices drop over time as cortical networks lose synaptic density and structural integrity. \n\n```\nNormal Brain:     High Entropy, Healthy Synaptic Integration & Chaos\nEarly MCI:        Declining Fractal Dimension, Synaptic Noise\nAD State:         Low Entropy, highly synchronized (rhythmic but slow) signaling\n```\n\nWhen synaptic loops are lost:\n1. The network loses its capacity for flexible information processing.\n2. Signals become less chaotic and more predictable (lower entropy).\n3. High-resolution multi-lead EEG arrays reveal diminished spatial correlation complexity.\n\n### Mathematical Formulation\n\nTo quantify this, we calculate the correlation dimension ($D_2$) and the Hurst exponent ($H$) of the time-varying EEG series. For a healthy brain, the signal fractal dimension is high, indicating an adaptive, non-periodic regulatory loop. As Alzheimer's progresses, the signal collapses into a more restricted phase space, indicating a reduction in adaptive flexibility.\n\n### Practical AI Integration\n\nBy feeding these calculated chaos metrics into deep convolutional neural networks (CNNs), we've boosted early detection sensitivity. Rather than forcing the neural network to analyze raw noisy voltages, we pre-process signals with multi-scale entropy matrices, providing the classifier with immediate, mathematically sound features representing cortical network state. This synergetic pairing of mathematical physics with deep learning is the cornerstone of our computational neuroscience lab at the Institute for Cognitive Science Studies (ICSS).",
    category: "Neuroscience",
    date: "May 28, 2026",
    readTime: "6 min read",
    published: true
  },
  {
    id: "blog-2",
    title: "Machine Learning in Diagnostic fMRI: Multitask Feature Compression",
    excerpt: "Exploring the mathematical challenges of high-dimensional neuroimaging datasets and our novel approach to multi-task learning for predictive disease staging.",
    content: "### The High-Dimensionality Challenge\n\nFunctional Magnetic Resonance Imaging (fMRI) creates thousands of voxel time-series, mapping neural activation over three-dimensional space and time. However, this high dimensionality meets a relatively small sample size in clinical settings—leading to the notorious *curse of dimensionality*.\n\nTo address this, our lab has engineered robust **Multitask Feature Extraction** models. Instead of treating each diagnostic stage as a separate binary classification task, we model them jointly. This allows the neural networks to learn shared structural abstractions across tasks.\n\n### Advancing Feature Compression\n\nOur framework extracts regional neuro-pathological coordinates using non-linear projection maps:\n- **Individual Task Target**: Classify healthy vs. mild cognitive impairment (MCI).\n- **Secondary Joint Target**: Classify early MCI vs. fully-developed AD severity.\n\nBy sharing the weight parameters of the intermediate convolutional layers, the network is constrained to identify core biological structures (such as Hippocampal atrophy and posterior cingulate cortex connectivity loss) rather than over-fitting to scanning artifacts.\n\n### Future Outlook\n\nWe are currently developing next-generation real-time fMRI processing tools that would allow clinicians to receive automated diagnostic probability scores during scanning sessions, accelerating pre-clinical diagnostics and patient-tailored therapeutic interventions.",
    category: "Artificial Intelligence",
    date: "April 15, 2026",
    readTime: "5 min read",
    published: true
  }
];

interface BlogsSectionProps {
  isPersian?: boolean;
  isDarkMode?: boolean;
}

export function BlogsSection({ isPersian = false, isDarkMode = true }: BlogsSectionProps) {
  const t = translations[isPersian ? 'fa' : 'en'];
  // Blog records and rendering states
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Administrative login states
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [adminUsername, setAdminUsername] = useState<string>("");
  const [adminPassword, setAdminPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [checkingLogin, setCheckingLogin] = useState<boolean>(false);

  // Blog creation & editing management states
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);

  // Expanded blog reader view state
  const [readerPost, setReaderPost] = useState<BlogPost | null>(null);

  // Fetch blogs on load & token check
  useEffect(() => {
    const savedPassword = localStorage.getItem("DrMortezaAmini_Admin_Auth");
    if (savedPassword) {
      setIsAdmin(true);
      fetchBlogs(savedPassword);
    } else {
      fetchBlogs(null);
    }
  }, []);

  // Retrieve blogs from Express endpoint
  const fetchBlogs = async (passwordToken: string | null) => {
    setLoading(true);
    setError(null);
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (passwordToken) {
        headers["Authorization"] = `Bearer ${passwordToken}`;
      }

      const res = await fetch("/api/blogs", { headers });
      if (!res.ok) {
        throw new Error(`Failed to load blogs (${res.status})`);
      }
      const data = await res.json();
      setBlogs(data);
    } catch (err: any) {
      console.warn("Backend API not reachable. Falling back to statically built-in blog posts:", err);
      setBlogs(DEFAULT_FALLBACK_BLOGS);
    } finally {
      setLoading(false);
    }
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUsername.trim() || !adminPassword.trim()) {
      setLoginError("Please enter both administrative username and password credentials.");
      return;
    }

    setCheckingLogin(true);
    setLoginError(null);

    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: adminUsername, password: adminPassword })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("DrMortezaAmini_Admin_Auth", adminPassword);
        setIsAdmin(true);
        setShowLoginModal(false);
        setAdminUsername("");
        setAdminPassword("");
        // Reload blogs with draft view privileges
        fetchBlogs(adminPassword);
      } else {
        setLoginError(data.error || "Invalid administrator credentials.");
      }
    } catch (err: any) {
      setLoginError("Could not reach servers. Verify connection and try again.");
    } finally {
      setCheckingLogin(false);
    }
  };

  // Sign out handler
  const handleLogout = () => {
    localStorage.removeItem("DrMortezaAmini_Admin_Auth");
    setIsAdmin(false);
    setEditingPost(null);
    setShowEditModal(false);
    fetchBlogs(null);
  };

  // Open creation modal
  const handleOpenCreate = () => {
    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    
    setEditingPost({
      title: "",
      category: "Neuroscience",
      date: today,
      readTime: "5 min read",
      published: true,
      content: "",
      excerpt: ""
    });
    setLoginError(null);
    setShowEditModal(true);
  };

  // Open edit modal
  const handleOpenEdit = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering open card reader
    setEditingPost(post);
    setShowEditModal(true);
  };

  // Save new or updated post
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost || !editingPost.title || !editingPost.content) return;

    setSaving(true);
    const token = localStorage.getItem("DrMortezaAmini_Admin_Auth");

    try {
      const isNew = !editingPost.id;
      const url = isNew ? "/api/blogs" : `/api/blogs/${editingPost.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(editingPost)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Save operation failed");
      }

      setShowEditModal(false);
      setEditingPost(null);
      fetchBlogs(token);
    } catch (err: any) {
      alert(`Error saving blog: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  // Delete post handler
  const handleDeletePost = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering card reader
    if (!window.confirm("Are you sure you would like to permanently delete this blog post? This action cannot be reversed.")) {
      return;
    }

    const token = localStorage.getItem("DrMortezaAmini_Admin_Auth");
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Delete action failed");
      }

      fetchBlogs(token);
      if (readerPost && readerPost.id === id) {
        setReaderPost(null);
      }
    } catch (err: any) {
      alert(`Error deleting blog: ${err.message}`);
    }
  };

  // Fallback styling gradient helper for visual aesthetic consistency
  const getCardDesign = (idx: number, category: string) => {
    const designs = [
      { gradient: "from-[#4b7bec] to-[#3867d6]", border: "hover:border-[#4b7bec]/30" },
      { gradient: "from-[#f7b731] to-[#fa8231]", border: "hover:border-[#f7b731]/30" },
      { gradient: "from-[#eb3b5a] to-[#fc5c65]", border: "hover:border-[#eb3b5a]/30" },
      { gradient: "from-[#2bcbba] to-[#0fb9b1]", border: "hover:border-[#2bcbba]/30" },
      { gradient: "from-[#a55eea] to-[#8854d0]", border: "hover:border-[#a55eea]/30" }
    ];

    // Pick consistent card index
    const cleanCat = (category || "").toLowerCase();
    if (cleanCat.includes("neuro")) return designs[0];
    if (cleanCat.includes("ai") || cleanCat.includes("machine") || cleanCat.includes("intellig")) return designs[3];
    if (cleanCat.includes("computat")) return designs[4];
    
    return designs[idx % designs.length];
  };

  return (
    <section id="section-blogs" className={`scroll-mt-24 lg:scroll-mt-12 space-y-12 pt-8 border-t ${isDarkMode ? 'border-[#191b22]/50' : 'border-slate-200'}`} dir={isPersian ? "rtl" : "ltr"}>
      
      {/* Header and discrete Admin Panel Trigger */}
      <div className="flex items-center justify-between">
        <div className="inline-block relative">
          <span className={`text-xs uppercase font-mono font-bold tracking-[0.25em] ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
            {t.blogsHeading}
          </span>
          <div className="w-8 h-[2px] bg-[#20c997] mt-1" />
        </div>

        {/* Unobtrusive, delicate login switch key */}
        <div className="flex items-center gap-3">
          {isAdmin ? (
            <div className="flex items-center gap-3">
              <button 
                id="blog-add-post-btn"
                onClick={handleOpenCreate}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#20c997]/10 hover:bg-[#20c997]/20 border border-[#20c997]/30 hover:border-[#20c997]/50 rounded-lg text-[11px] font-mono text-[#20c997] transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> {t.newPost}
              </button>
              <button 
                id="blog-admin-logout-btn"
                onClick={handleLogout}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 ${isDarkMode ? 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200' : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600 hover:text-slate-900'} border rounded-lg text-[11px] font-mono transition-all cursor-pointer`}
                title="Log Out Desk"
              >
                <Unlock className="w-3 h-3 text-emerald-500" /> {t.deskSignout}
              </button>
            </div>
          ) : (
            <button 
              id="blog-admin-login-trigger"
              onClick={() => setShowLoginModal(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 ${isDarkMode ? 'bg-[#191b22]/80 border-[#191b22] text-slate-300 hover:bg-[#20c997]/10 hover:text-[#20c997]' : 'bg-white border-slate-200 text-slate-600 hover:bg-[#20c997]/5 hover:text-[#20c997] hover:border-[#20c997]/30'} border rounded-lg text-xs font-mono transition-all cursor-pointer shadow-sm`}
              title={t.facultyEditorDesk}
            >
              <Lock className="w-3.5 h-3.5 text-[#20c997]" /> {t.adminPortal}
            </button>
          )}
        </div>
      </div>

      <p className={`text-xs ${isDarkMode ? 'text-[#8e9096]' : 'text-slate-500'} leading-relaxed max-w-2xl font-sans text-start`}>
        {t.blogsSub}
      </p>

      {/* Loading Indicator */}
      {loading && blogs.length === 0 ? (
        <div id="blogs-loading" className="flex flex-col items-center justify-center py-20 space-y-3">
          <Loader2 className="w-8 h-8 text-[#20c997] animate-spin" />
          <span className="text-xs font-mono text-slate-500">{t.queryingFacultyDB}</span>
        </div>
      ) : error && blogs.length === 0 ? (
        <div id="blogs-error" className={`p-4 ${isDarkMode ? 'bg-red-500/5 border-red-500/10 text-slate-200' : 'bg-red-50 border-red-200 text-slate-800'} border rounded-xl text-center flex flex-col items-center space-y-2 py-10`}>
          <AlertTriangle className="w-6 h-6 text-red-500/80" />
          <h4 className="text-xs font-semibold font-sans">{t.dbQueryError}</h4>
          <p className={`text-[11px] ${isDarkMode ? 'text-[#8e9096]' : 'text-slate-500'} max-w-md font-sans`}>{error}</p>
          <button 
            id="blogs-retry-btn"
            onClick={() => fetchBlogs(isAdmin ? localStorage.getItem("DrMortezaAmini_Admin_Auth") : null)}
            className="mt-2 text-[10px] font-mono text-[#20c997] hover:underline cursor-pointer font-bold"
          >
            {t.retryConnBtn}
          </button>
        </div>
      ) : blogs.length === 0 ? (
        <div id="blogs-empty" className={`p-10 border border-dashed ${isDarkMode ? 'border-[#191b22]' : 'border-slate-205'} rounded-xl text-center`}>
          <BookOpen className="w-8 h-8 text-slate-500 mx-auto mb-3" />
          <span className={`text-xs font-sans ${isDarkMode ? 'text-[#8e9096]' : 'text-slate-500'} block`}>{t.noBlogsMsg}</span>
          {isAdmin && (
            <button
              id="blogs-empty-add-btn"
              onClick={handleOpenCreate}
              className="mt-3 px-3 py-1.5 bg-[#20c997]/10 hover:bg-[#20c997]/20 border border-[#20c997]/20 rounded-lg text-[10px] font-mono text-[#20c997] cursor-pointer"
            >
              {t.composeInitialBlogBtn}
            </button>
          )}
        </div>
      ) : (
        /* Blog Post Cards Grid */
        <div id="blogs-grid-container" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog, idx) => {
            const cardStyle = getCardDesign(idx, blog.category);
            return (
              <div 
                key={blog.id}
                id={blog.id}
                onClick={() => setReaderPost(blog)}
                className={`flex flex-col ${isDarkMode ? 'bg-[#090a0d] border-[#191b22]' : 'bg-white border-slate-200/70 shadow-[0_3px_12px_rgba(0,0,0,0.02)]'} border ${cardStyle.border} rounded-xl overflow-hidden group shadow-md transition-all cursor-pointer relative duration-300`}
              >
                
                {/* Admin Status Overlays */}
                {isAdmin && (
                  <div className={`absolute top-3 ${isPersian ? 'right-3' : 'left-3'} z-20 flex gap-1.5`}>
                    {blog.published ? (
                      <span className="flex items-center gap-1 text-[9px] font-mono bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 px-2 py-0.5 rounded-full">
                        <Check className="w-2.5 h-2.5" /> {t.blogsPublished}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[9px] font-mono bg-amber-500/15 border border-amber-500/25 text-amber-400 px-2 py-0.5 rounded-full">
                        <EyeOff className="w-2.5 h-2.5" /> {t.blogsDraft}
                      </span>
                    )}
                  </div>
                )}

                {/* Cover graphic */}
                <div className={`h-40 bg-gradient-to-tr ${cardStyle.gradient} relative flex flex-col items-center justify-center p-6 text-center overflow-hidden transition-all duration-300 group-hover:scale-[1.01]`}>
                  <div className="absolute top-[-20%] left-[-10%] w-48 h-48 rounded-full bg-white/5" />
                  <div className="absolute bottom-[-10%] right-[-10%] w-36 h-36 bg-black/10 rounded-full" />
                  
                  <BookOpen className="w-8 h-8 text-white/80 mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-[10px] font-mono tracking-wider text-white/95 uppercase font-bold px-4 truncate max-w-full">
                    {blog.category}
                  </span>
                  <span className="text-[9px] font-mono text-white/60 mt-0.5">
                    {blog.readTime}
                  </span>
                </div>

                {/* Card Content body */}
                <div className="p-5 space-y-3 relative flex-grow flex flex-col justify-between text-start">
                  <div className="space-y-2">
                    <div className={`flex items-center justify-between text-[9px] font-mono ${isDarkMode ? 'text-[#818183]' : 'text-slate-400'}`}>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                    <h4 className={`text-sm font-bold font-sans ${isDarkMode ? 'text-slate-100' : 'text-slate-800'} line-clamp-2 leading-relaxed group-hover:text-[#20c997] transition-all`}>
                      {blog.title}
                    </h4>
                    <p className={`text-xs ${isDarkMode ? 'text-[#8e9096]' : 'text-slate-500'} leading-relaxed line-clamp-3 text-justify font-sans`}>
                      {blog.excerpt || (isPersian ? "برای مرور جزئیات و تحلیل‌های علمی این نوشته، کلیک کنید." : "Click to browse deep conceptual insights regarding neuroscience classifications.")}
                    </p>
                  </div>

                  {/* Actions footer */}
                  <div className={`pt-4 border-t ${isDarkMode ? 'border-[#191b22]' : 'border-slate-100'} flex items-center justify-between`}>
                    <span 
                      className="text-xs font-mono font-bold text-[#20c997] hover:underline inline-flex items-center gap-1"
                    >
                      {t.readNotebook} <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>

                    {/* Admin write tools inside individual card */}
                    {isAdmin && (
                      <div className="flex items-center gap-1.5 z-15">
                        <button
                          id={`blog-edit-btn-${blog.id}`}
                          onClick={(e) => handleOpenEdit(blog, e)}
                          className={`p-1.5 ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-[#20c997]' : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-[#20c997]'} border rounded transition-all cursor-pointer`}
                          title="Edit Post"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          id={`blog-delete-btn-${blog.id}`}
                          onClick={(e) => handleDeletePost(blog.id, e)}
                          className={`p-1.5 ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-red-500' : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-red-500'} border rounded transition-all cursor-pointer`}
                          title="Delete Post"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- MODAL 1: ADMINISTRATIVE AUTHENTICATION --- */}
      {showLoginModal && (
        <div id="login-modal-overlay" className="fixed inset-0 z-50 bg-[#040507]/90 backdrop-blur-sm flex items-center justify-center p-4" dir={isPersian ? "rtl" : "ltr"}>
          <div 
            id="login-modal-content"
            className={`w-full max-w-sm ${isDarkMode ? 'bg-[#090a0d] border-[#191b22]' : 'bg-white border-slate-200'} border rounded-xl shadow-2xl p-6 relative space-y-4 text-start`}
          >
            <button 
              id="close-login-modal"
              onClick={() => {
                setShowLoginModal(false);
                setAdminUsername("");
                setAdminPassword("");
                setLoginError(null);
              }}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1 text-center">
              <div className="w-10 h-10 rounded-full bg-[#20c997]/10 flex items-center justify-center mx-auto mb-2 text-[#20c997]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className={`font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'} font-sans`}>{t.facultyEditorDesk}</h3>
              <p className="text-[10px] font-mono text-slate-500">ADMINISTRATIVE PORTAL LOGIN</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  {t.adminUsernameLabel}
                </label>
                <input
                  id="admin-username-input"
                  type="text"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder={t.adminUsernamePlaceholder}
                  className={`w-full ${isDarkMode ? 'bg-[#050507] border-[#191b22] text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'} px-3.5 py-2 rounded-lg text-xs focus:outline-none focus:border-[#20c997]/40 placeholder:text-slate-400 font-sans`}
                  autoFocus
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  {t.adminPasswordLabel}
                </label>
                <input
                  id="admin-password-input"
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder={t.adminPasswordPlaceholder}
                  className={`w-full ${isDarkMode ? 'bg-[#050507] border-[#191b22] text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'} px-3.5 py-2 rounded-lg text-xs focus:outline-none focus:border-[#20c997]/40 placeholder:text-slate-400`}
                />
              </div>

              {loginError && (
                <div id="login-error-alert" className="text-[10px] text-red-400 bg-red-400/5 px-3 py-2 rounded border border-red-500/10 flex items-center gap-1.5 leading-relaxed">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                id="submit-login-btn"
                type="submit"
                disabled={checkingLogin}
                className="w-full py-2 bg-[#20c997] hover:bg-[#1bb084] disabled:bg-[#20c997]/40 text-black font-semibold rounded-lg text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                {checkingLogin ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Verifying Desk...
                  </>
                ) : (
                  isPersian ? "ورود به پرتال استاد" : "Unlock Administrator Controls"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: FULL BLOG POST DETAILED READER --- */}
      {readerPost && (
        <div id="reader-modal-overlay" className="fixed inset-0 z-50 bg-[#040507]/92 backdrop-blur-md flex items-center justify-center p-4">
          <div 
            id="reader-modal-content"
            className={`w-full max-w-2xl max-h-[85vh] ${isDarkMode ? 'bg-[#090a0d] border-[#191b22]' : 'bg-white border-slate-205'} border rounded-xl shadow-2xl flex flex-col overflow-hidden relative text-start`}
            dir={isPersian ? "rtl" : "ltr"}
          >
            {/* Modal Heading header bar */}
            <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-[#191b22] bg-slate-950/20' : 'border-slate-100 bg-slate-50'} flex items-center justify-between shrink-0`}>
              <div className="flex items-center gap-3">
                <span className="text-[10px] px-2 py-0.5 bg-[#20c997]/10 border border-[#20c997]/20 rounded-full font-mono text-[#20c997]">
                  {readerPost.category}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {readerPost.readTime}
                </span>
              </div>
              <button 
                id="close-reader-modal"
                onClick={() => setReaderPost(null)}
                className="text-slate-500 hover:text-[#20c997] transition-colors p-1.5 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Reader area */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-grow scrollbar-thin">
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {isPersian ? 'منتشر شده در ' : 'Published '} {readerPost.date}
                </div>
                <h2 className={`text-xl md:text-2xl font-bold font-sans ${isDarkMode ? 'text-slate-100' : 'text-slate-800'} tracking-tight leading-snug`}>
                  {readerPost.title}
                </h2>
              </div>

              {/* MD Render */}
              <div className={`markdown-body text-xs md:text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} leading-relaxed font-sans space-y-4 max-w-none`}>
                <Markdown>{readerPost.content}</Markdown>
              </div>
            </div>

            {/* Reader view footer */}
            <div className="px-6 py-3.5 border-t border-[#191b22] flex items-center justify-between bg-slate-950/20 shrink-0 text-[11px] text-slate-500 font-sans">
              <span>Scientific Notebooks &bull; Dr. Morteza Amini</span>
              {isAdmin && (
                <div className="flex gap-2">
                  <button
                    id="reader-edit-shortcut-btn"
                    onClick={(e) => {
                      const postToEdit = readerPost;
                      setReaderPost(null);
                      handleOpenEdit(postToEdit, e);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-slate-400 hover:text-[#20c997] text-[10px]"
                  >
                    <Edit className="w-3 h-3" /> Edit Post
                  </button>
                  <button
                    id="reader-delete-shortcut-btn"
                    onClick={(e) => {
                      const idToDelete = readerPost.id;
                      handleDeletePost(idToDelete, e);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-slate-400 hover:text-red-500 text-[10px]"
                  >
                    <Trash2 className="w-3 h-3" /> Delete Post
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: ADD AND EDIT RICH BLOG COMPOSER EDITOR --- */}
      {showEditModal && editingPost && (
        <div id="editor-modal-overlay" className="fixed inset-0 z-50 bg-[#040507]/92 backdrop-blur-md flex items-center justify-center p-4">
          <div 
            id="editor-modal-content"
            className={`w-full max-w-3xl max-h-[90vh] ${isDarkMode ? 'bg-[#090a0d] border-[#191b22]' : 'bg-white border-slate-200'} border rounded-xl shadow-2xl flex flex-col overflow-hidden relative text-start`}
            dir={isPersian ? "rtl" : "ltr"}
          >
            <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-[#191b22] bg-slate-950/30' : 'border-slate-100 bg-slate-50'} flex items-center justify-between shrink-0`}>
              <h3 className={`font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'} font-sans text-sm flex items-center gap-2`}>
                <BookOpen className="w-4 h-4 text-[#20c997]" />
                {editingPost.id 
                  ? (isPersian ? "ویرایش نوشته علمی وبلاگ" : "Edit Notebook Blog Entry") 
                  : (isPersian ? "نگارش مطلب جدید در وبلاگ هیئت علمی" : "Compose New Faculty Blog Post")}
              </h3>
              <button 
                id="close-editor-modal"
                onClick={() => {
                  setShowEditModal(false);
                  setEditingPost(null);
                }}
                className="text-slate-500 hover:text-[#20c997] transition-colors cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePost} className="flex flex-col flex-grow overflow-hidden">
              
              {/* Form Scrollable elements */}
              <div className="p-6 overflow-y-auto space-y-4 flex-grow scrollbar-thin">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Category Field */}
                  <div className="space-y-1">
                    <label className={`text-[10px] font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider block`}>
                      {isPersian ? 'دسته‌بندی موضوعی' : 'Topic Category'}
                    </label>
                    <select
                      id="editor-category"
                      value={editingPost.category || "Neuroscience"}
                      onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                      className={`w-full ${isDarkMode ? 'bg-[#050507] border-[#191b22] text-slate-200' : 'bg-slate-50 border-slate-205 text-slate-900'} px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-[#20c997]/40 cursor-pointer`}
                    >
                      <option value="Neuroscience">{isPersian ? "علوم اعصاب" : "Neuroscience"}</option>
                      <option value="Artificial Intelligence">{isPersian ? "هوش مصنوعی" : "Artificial Intelligence"}</option>
                      <option value="Cognitive Modeling">{isPersian ? "مدل‌سازی شناختی" : "Cognitive Modeling"}</option>
                      <option value="Signal Processing">{isPersian ? "پردازش سیگنال" : "Signal Processing"}</option>
                      <option value="Intellectual Philosophy">{isPersian ? "فلسفه ذهن" : "Intellectual Philosophy"}</option>
                      <option value="General Academic">{isPersian ? "عمومی دانشگاهی" : "General Academic"}</option>
                    </select>
                  </div>

                  {/* Read Time Field */}
                  <div className="space-y-1">
                    <label className={`text-[10px] font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider block`}>
                      {isPersian ? 'زمان مطالعه تقریبی (مثلا ۵ دقیقه)' : 'Reading Estimation (e.g. "5 min read")'}
                    </label>
                    <input
                      id="editor-read-time"
                      type="text"
                      required
                      value={editingPost.readTime || ""}
                      onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })}
                      className={`w-full ${isDarkMode ? 'bg-[#050507] border-[#191b22] text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'} px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-[#20c997]/40`}
                      placeholder={isPersian ? "مثلاً ۵ دقیقه مطالعه" : "e.g. 5 min read"}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Custom Date Field */}
                  <div className="space-y-1">
                    <label className={`text-[10px] font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider block`}>
                      {isPersian ? 'تاریخ نمایش' : 'Display Date'}
                    </label>
                    <input
                      id="editor-date"
                      type="text"
                      required
                      value={editingPost.date || ""}
                      onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })}
                      className={`w-full ${isDarkMode ? 'bg-[#050507] border-[#191b22] text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'} px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-[#20c997]/40`}
                      placeholder={isPersian ? "مثلا ۲۵ خرداد ۱۴۰۵" : "e.g., June 15, 2026"}
                    />
                  </div>

                  {/* Document Status */}
                  <div className="space-y-1 flex flex-col justify-end">
                    <label className={`flex items-center gap-2.5 p-3 ${isDarkMode ? 'bg-[#050507] border-[#191b22] hover:border-slate-850' : 'bg-slate-50 border-slate-200 hover:border-[#20c997]/30'} rounded-lg cursor-pointer text-xs group transition-colors`}>
                      <input
                        id="editor-published"
                        type="checkbox"
                        checked={editingPost.published !== false}
                        onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked })}
                        className="accent-[#20c997] focus:ring-0 checked:bg-[#20c997]"
                      />
                      <div className="flex flex-col text-start">
                        <span className={`font-medium ${isDarkMode ? 'group-hover:text-slate-100 text-slate-300' : 'group-hover:text-slate-900 text-slate-700'} transition-colors`}>
                          {isPersian ? 'انتشار عمومی نوشته' : 'Publish Post'}
                        </span>
                        <span className="text-[9px] text-slate-500 font-mono mt-0.5">
                          {isPersian ? 'در صورت عدم تایید، به عنوان پیش‌نویس ذخیره می‌شود' : 'IF DISABLED, STATED AS LOCAL PRIV DESK DRAFT'}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <label className={`text-[10px] font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider block`}>
                    {isPersian ? 'عنوان مطلب' : 'Post Title'}
                  </label>
                  <input
                    id="editor-title"
                    type="text"
                    required
                    value={editingPost.title || ""}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className={`w-full ${isDarkMode ? 'bg-[#050507] border-[#191b22] text-slate-100' : 'bg-slate-50 border-slate-205 text-slate-900'} px-3.5 py-2.5 rounded-lg text-xs focus:outline-none focus:border-[#20c997]/40 font-sans font-bold placeholder:text-slate-400`}
                    placeholder={isPersian ? "عنوان علمی، پژوهشی یا تحلیلی مقاله..." : "Enter scientific or analytical title..."}
                  />
                </div>

                {/* Optional Custom Excerpt */}
                <div className="space-y-1">
                  <label className={`text-[10px] font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider block`}>
                    {isPersian ? 'چکیده / خلاصه کوتاه (اختیاری)' : 'Excerpt / Short Description (Optional)'}
                  </label>
                  <textarea
                    id="editor-excerpt"
                    rows={2}
                    value={editingPost.excerpt || ""}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    className={`w-full ${isDarkMode ? 'bg-[#050507] border-[#191b22] text-slate-200' : 'bg-slate-50 border-slate-205 text-slate-900'} px-3.5 py-2 rounded-lg text-xs focus:outline-none focus:border-[#20c997]/40 placeholder:text-slate-400 leading-relaxed reset-scrollbar`}
                    placeholder={isPersian ? "خلاصه مباحث مطرح شده را وارد نمایید. در صورت خالی ماندن، به طور خودکار از روی متن تولید می‌شود." : "Provide a mini-abstract summary. Left blank, we'll auto-generate one from core text."}
                  />
                </div>

                {/* Main Content Markdown Textarea */}
                <div className="space-y-1 flex flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <label className={`text-[10px] font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider block`}>
                      {isPersian ? 'متن مقاله علمی (پشتیبانی از ساختار مارک‌داون)' : 'Scientific Article body content (Supports Markdown syntax)'}
                    </label>
                    <span className="text-[9px] font-mono text-slate-500">
                      {isPersian ? 'پشتیبانی از متن ضخیم (**متن**)، لیست، فرمول و همجوشی کدهای متنی' : 'Supports Bold (**text**), Lists, and Code-blocks'}
                    </span>
                  </div>
                  <textarea
                    id="editor-content"
                    required
                    rows={12}
                    value={editingPost.content || ""}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    className={`w-full ${isDarkMode ? 'bg-[#050507] border-[#191b22] text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'} px-3.5 py-3 rounded-lg text-xs font-mono focus:outline-none focus:border-[#20c997]/40 placeholder:text-slate-400 leading-relaxed reset-scrollbar`}
                    placeholder={isPersian ? "جزئیات یادداشت علمی خود را مرقوم بفرمایید... می‌توانید از کدهای نشانه‌گذاری استاندارد و فرمول‌ها استفاده کنید." : "Write article details inside... Use mathematical notation or standard Markdown titles and code blocks for clear presentation."}
                  />
                </div>
              </div>

              {/* Form submit/cancel footer bar */}
              <div className={`px-6 py-4 border-t ${isDarkMode ? 'border-[#191b22] bg-slate-950/30' : 'border-slate-100 bg-slate-50'} flex items-center justify-between shrink-0`}>
                <span className="text-[10px] text-slate-500 font-mono">
                  Writing to /blogs-db.json
                </span>
                <div className="flex items-center gap-3">
                  <button
                    id="cancel-editor-btn"
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingPost(null);
                    }}
                    className={`px-4 py-2 ${isDarkMode ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-slate-200' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-850'} border rounded-lg text-xs font-mono transition-all cursor-pointer`}
                  >
                    {isPersian ? "انصراف" : "Cancel"}
                  </button>
                  <button
                    id="submit-editor-btn"
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 bg-[#20c997] hover:bg-[#1bb084] disabled:bg-[#20c997]/40 text-black font-semibold rounded-lg text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> {isPersian ? "در حال ذخیره‌سازی..." : "Saving..."}
                      </>
                    ) : (
                      isPersian ? "ذخیره نهایی مطلب" : "Save Notebook Entry"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}


    </section>
  );
}
