import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import api from "../services/api.js";

function PdfManager() {
  const [pdfs, setPdfs] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchPdfs = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("pdf/");
      setPdfs(response.data);
    } catch {
      setError("Could not load PDFs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  const uploadPdf = async (event) => {
    event.preventDefault();
    if (!title.trim() || !file) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("pdf", file);

    setSaving(true);
    setError("");
    try {
      await api.post("pdf/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTitle("");
      setFile(null);
      event.target.reset();
      await fetchPdfs();
    } catch {
      setError("Could not upload this PDF.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Library"
        title="PDF manager"
        description="Upload and reopen your study material from the same workspace."
      />

      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <form onSubmit={uploadPdf} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-bold text-slate-950">Upload PDF</h3>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Title</span>
              <input
                className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Biology notes"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">PDF file</span>
              <input
                className="mt-2 w-full rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-950 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
                type="file"
                accept="application/pdf"
                onChange={(event) => setFile(event.target.files?.[0] || null)}
              />
            </label>

            {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</p>}

            <button
              type="submit"
              disabled={saving}
              className="h-11 w-full rounded-lg bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:bg-emerald-300"
            >
              {saving ? "Uploading..." : "Upload PDF"}
            </button>
          </div>
        </form>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-bold text-slate-950">Saved PDFs</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {loading && <p className="text-sm text-slate-500">Loading PDFs...</p>}
            {!loading && pdfs.length === 0 && <p className="text-sm text-slate-500">No PDFs uploaded yet.</p>}
            {pdfs.map((pdf) => (
              <a
                key={pdf.id}
                href={pdf.pdf}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-slate-200 p-4 transition hover:border-emerald-300 hover:bg-emerald-50/40"
              >
                <p className="font-semibold text-slate-950">{pdf.title}</p>
                <p className="mt-2 text-sm text-slate-500">Open PDF</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default PdfManager;
