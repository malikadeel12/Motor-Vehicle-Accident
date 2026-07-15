import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { LogOut, Download, Search, Filter, ChevronLeft, ChevronRight, RefreshCw, Eye, FileText } from "lucide-react";
import { useAdminAuth, AdminAuthProvider } from "./AdminAuth";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "https://vqzbouddkyxixjxrrgbm.supabase.co";
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxemJvdWRka3l4aXhqeHJyZ2JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMzc4MzQsImV4cCI6MjA5OTcxMzgzNH0.puobuIxMOyTgbSxDVS3oo4_RVLvDQRDvuPojk3m3F1g";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const CLAIM_STATUS_COLORS = {
  retained: "bg-green-500/20 text-green-400 border-green-500/30",
  failed: "bg-red-500/20 text-red-400 border-red-500/30",
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  unknown: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

function AdminDashboardContent() {
  const { logout, isAuthenticated } = useAdminAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedLead, setSelectedLead] = useState(null);
  const PAGE_SIZE = 25;

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      let query = supabase
        .from("leads")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE - 1);

      if (search) {
        query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
      }

      if (statusFilter !== "all") {
        query = query.eq("claim_status", statusFilter);
      }

      const { data, error: fetchError, count } = await query;

      if (fetchError) throw fetchError;

      setLeads(data || []);
      setTotalCount(count || 0);
    } catch (err) {
      console.error("Fetch leads error:", err);
      setError("Failed to load leads. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, statusFilter]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleExport = async () => {
    try {
      setError("Exporting...");
      const { data, error: exportError } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (exportError) throw exportError;

      const csv = [
        ["ID", "First Name", "Last Name", "Phone", "Email", "ZIP", "State", "TrustedForm Cert URL", "Consent Text", "Consent At", "Page URL", "User Agent", "IP", "Claim Status", "Claim Response", "Created At"],
        ...data.map((lead) => [
          lead.id,
          lead.first_name,
          lead.last_name,
          lead.phone,
          lead.email,
          lead.zip,
          lead.state,
          lead.trusted_form_cert_url || "",
          (lead.consent_text || "").replace(/"/g, '""'),
          lead.consent_at || "",
          lead.page_url || "",
          (lead.user_agent || "").replace(/"/g, '""'),
          lead.ip || "",
          lead.claim_status,
          lead.claim_response ? JSON.stringify(lead.claim_response).replace(/"/g, '""') : "",
          lead.created_at,
        ]),
      ].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
      link.click();
      URL.revokeObjectURL(link.href);
      setError("");
    } catch (err) {
      console.error("Export error:", err);
      setError("Export failed. Please try again.");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPhone = (phone) => {
    if (!phone) return "-";
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="h-screen bg-[#161314] flex flex-col">
      <header className="bg-[#1e191a] border-b border-white/5 px-6 lg:px-12 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h1 className="font-display font-bold uppercase text-xl lg:text-2xl tracking-tight text-[#f5ebe1]">
            Admin Dashboard
          </h1>
          <span className="px-3 py-1 text-xs font-medium bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 rounded">
            {totalCount} leads
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleExport}
            disabled={loading || leads.length === 0}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-transparent border border-white/10 hover:border-[#d4af37] text-[#a89f95] text-sm font-medium transition-colors"
          >
            <Download size={16} strokeWidth={2} />
            Export CSV
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-transparent border border-white/10 hover:border-[#b31b1b] hover:text-[#b31b1b] text-[#a89f95] text-sm font-medium transition-colors"
          >
            <LogOut size={16} strokeWidth={2} />
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6 lg:p-12">
        <div className="max-w-full mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-[#b31b1b]/20 border border-[#b31b1b]/50 text-[#e79a9a] text-sm rounded flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError("")} className="text-[#e79a9a] hover:text-[#f5ebe1]">×</button>
            </div>
          )}

          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a89f95] size-5" strokeWidth={2} />
              <input
                type="text"
                placeholder="Search name, email, phone..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-white/15 focus:border-[#d4af37] outline-none text-[#f5ebe1] placeholder-[#a89f95]/60 text-sm transition-colors"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a89f95] size-5" strokeWidth={2} />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-10 py-2.5 bg-transparent border border-white/15 focus:border-[#d4af37] outline-none text-[#f5ebe1] text-sm appearance-none cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="retained">Retained</option>
                <option value="failed">Failed</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <button
              onClick={fetchLeads}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 bg-transparent border border-white/10 hover:border-[#d4af37] text-[#a89f95] text-sm font-medium transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} strokeWidth={2} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

          <div className="rounded-lg border border-white/5 overflow-hidden bg-[#1e191a]">
            {loading && leads.length === 0 ? (
              <div className="p-12 text-center">
                <RefreshCw size={32} strokeWidth={2} className="mx-auto text-[#d4af37] animate-spin mb-4" />
                <p className="text-[#a89f95]">Loading leads...</p>
              </div>
            ) : leads.length === 0 ? (
              <div className="p-12 text-center">
                <FileText size={48} className="mx-auto text-[#a89f95]/30 mb-4" strokeWidth={1.5} />
                <p className="text-[#a89f95]">No leads found</p>
                <p className="text-xs text-[#a89f95]/60 mt-1">Try adjusting your search or filter</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#161314]/50">
                      <tr className="text-left text-xs uppercase tracking-wider text-[#a89f95]/70">
                        <th className="p-4 font-medium w-16">ID</th>
                        <th className="p-4 font-medium">Lead</th>
                        <th className="p-4 font-medium hidden md:table-cell">Contact</th>
                        <th className="p-4 font-medium hidden lg:table-cell">Location</th>
                        <th className="p-4 font-medium">TrustedForm</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Date</th>
                        <th className="p-4 font-medium w-16"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {leads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                          onClick={() => setSelectedLead(lead)}
                        >
                          <td className="p-4 font-mono text-xs text-[#d4af37]">
                            {lead.id}
                          </td>
                          <td className="p-4">
                            <div className="font-display font-medium text-[#f5ebe1]">
                              {lead.first_name} {lead.last_name}
                            </div>
                          </td>
                          <td className="p-4 hidden md:table-cell">
                            <div className="text-[#f5ebe1]">{lead.email}</div>
                            <div className="text-xs text-[#a89f95]/70 mt-0.5">{formatPhone(lead.phone)}</div>
                          </td>
                          <td className="p-4 hidden lg:table-cell">
                            <div className="text-[#f5ebe1]">{lead.zip}, {lead.state}</div>
                          </td>
                          <td className="p-4">
                            {lead.trusted_form_cert_url ? (
                              <a
                                href={lead.trusted_form_cert_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#d4af37] hover:text-[#e8c959] text-xs flex items-center gap-1"
                              >
                                <FileText size={12} strokeWidth={2} />
                                View Certificate
                              </a>
                            ) : (
                              <span className="text-xs text-[#a89f95]/50">No certificate</span>
                            )}
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${CLAIM_STATUS_COLORS[lead.claim_status] || CLAIM_STATUS_COLORS.unknown}`}>
                              {lead.claim_status || "unknown"}
                            </span>
                          </td>
                          <td className="p-4 text-xs text-[#a89f95] hidden sm:table-cell">
                            {formatDate(lead.created_at)}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedLead(lead);
                              }}
                              className="text-[#a89f95]/50 hover:text-[#d4af37] transition-colors"
                            >
                              <Eye size={16} strokeWidth={2} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="p-4 flex items-center justify-between border-t border-white/5">
                    <div className="text-sm text-[#a89f95]">
                      Page {currentPage} of {totalPages} · {totalCount} total
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 text-[#a89f95] hover:text-[#d4af37] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft size={18} strokeWidth={2} />
                      </button>
                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 text-[#a89f95] hover:text-[#d4af37] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight size={18} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {selectedLead && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setSelectedLead(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-details-title"
        >
          <div className="bg-[#1e191a] border border-white/5 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h2 id="lead-details-title" className="font-display font-bold uppercase text-xl text-[#f5ebe1]">Lead Details</h2>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedLead(null)} 
                  className="text-[#a89f95] hover:text-[#f5ebe1] transition-colors p-2 rounded hover:bg-white/5"
                  aria-label="Close"
                >
                  <svg size={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
                <button 
                  onClick={() => setSelectedLead(null)} 
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#a89f95] hover:text-[#f5ebe1] hover:bg-white/5 rounded transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-[#a89f95]/70 uppercase tracking-wider mb-1">First Name</div>
                  <div className="text-[#f5ebe1]">{selectedLead.first_name}</div>
                </div>
                <div>
                  <div className="text-xs text-[#a89f95]/70 uppercase tracking-wider mb-1">Last Name</div>
                  <div className="text-[#f5ebe1]">{selectedLead.last_name}</div>
                </div>
                <div>
                  <div className="text-xs text-[#a89f95]/70 uppercase tracking-wider mb-1">Email</div>
                  <div className="text-[#f5ebe1]">{selectedLead.email}</div>
                </div>
                <div>
                  <div className="text-xs text-[#a89f95]/70 uppercase tracking-wider mb-1">Phone</div>
                  <div className="text-[#f5ebe1]">{formatPhone(selectedLead.phone)}</div>
                </div>
                <div>
                  <div className="text-xs text-[#a89f95]/70 uppercase tracking-wider mb-1">ZIP</div>
                  <div className="text-[#f5ebe1]">{selectedLead.zip}</div>
                </div>
                <div>
                  <div className="text-xs text-[#a89f95]/70 uppercase tracking-wider mb-1">State</div>
                  <div className="text-[#f5ebe1]">{selectedLead.state}</div>
                </div>
                <div>
                  <div className="text-xs text-[#a89f95]/70 uppercase tracking-wider mb-1">Claim Status</div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${CLAIM_STATUS_COLORS[selectedLead.claim_status] || CLAIM_STATUS_COLORS.unknown}`}>
                    {selectedLead.claim_status || "unknown"}
                  </span>
                </div>
                <div>
                  <div className="text-xs text-[#a89f95]/70 uppercase tracking-wider mb-1">Created</div>
                  <div className="text-[#f5ebe1]">{formatDate(selectedLead.created_at)}</div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4">
                <div className="text-xs text-[#a89f95]/70 uppercase tracking-wider mb-2">TrustedForm Certificate</div>
                {selectedLead.trusted_form_cert_url ? (
                  <a href={selectedLead.trusted_form_cert_url} target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:text-[#e8c959] text-sm break-all flex items-center gap-2">
                    <FileText size={14} strokeWidth={2} />
                    {selectedLead.trusted_form_cert_url}
                  </a>
                ) : (
                  <div className="text-[#a89f95]/50 text-sm">No certificate captured</div>
                )}
              </div>

              <div className="border-t border-white/5 pt-4">
                <div className="text-xs text-[#a89f95]/70 uppercase tracking-wider mb-2">Page URL</div>
                <div className="text-[#a89f95] text-sm break-all">{selectedLead.page_url || "-"}</div>
              </div>

              <div className="border-t border-white/5 pt-4">
                <div className="text-xs text-[#a89f95]/70 uppercase tracking-wider mb-2">Claim Response</div>
                <pre className="bg-[#161314] p-4 rounded text-xs text-[#a89f95] overflow-auto max-h-48">
                  {selectedLead.claim_response ? JSON.stringify(selectedLead.claim_response, null, 2) : "No response data"}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminAuthProvider>
      <AdminDashboardContent />
    </AdminAuthProvider>
  );
}