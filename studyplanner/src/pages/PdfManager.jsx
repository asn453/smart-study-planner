import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function PdfManager() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [pdfs, setPdfs] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null); // Tracks which specific PDF is being deleted
  const fileInputRef = useRef(null);

  const fetchPdf = async () => {
    try {
      const response = await api.get("/api/pdf/");
      setPdfs(response.data);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };

  useEffect(() => {
    fetchPdf();
  }, []);

  const uploadPdf = async () => {
    if (!file || !title) {
      alert("Please enter title and select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("pdf", file);

    try {
      setIsUploading(true);

      await api.post("/api/pdf/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFile(null);
      setTitle("");
      
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await fetchPdf();
      alert("PDF Uploaded Successfully!");
    } catch (error) {
      console.error("Upload error caught:", error);
      alert("Upload Failed.");
    } finally {
      setIsUploading(false);
    }
  };

  // 👇 NEW: Delete handler function
  const deletePdf = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this PDF?")) {
      return;
    }

    try {
      setDeletingId(id); // Set loading state for this specific item
      
      // Sends a DELETE request to /api/pdf/{id}/
      await api.delete(`/api/pdf/${id}/`);
      
      // Optimistically update UI or refresh list
      await fetchPdf();
      alert("PDF Removed Successfully");
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete the PDF from server.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 mb-6 bg-white px-5 py-3 rounded-xl shadow-md hover:shadow-lg hover:bg-slate-50 transition duration-300"
        >
          ← Back to Dashboard
        </Link>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">PDF Manager</h1>
          <p className="text-gray-500 mt-2">
            Upload and manage your study documents
          </p>
        </div>

        {/* Upload Card */}
        <div className="bg-white p-8 rounded-3xl shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-6">Upload PDF</h2>

          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">📄</div>

            <input
              type="text"
              placeholder="Enter PDF Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-slate-700 text-gray-700"
              disabled={isUploading}
            />

            <p className="text-gray-500 mb-4">Select a PDF file</p>

            <input
              type="file"
              accept=".pdf"
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-5 block mx-auto text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
              disabled={isUploading}
            />

            {file && (
              <p className="text-sm text-green-600 font-medium mb-2">Selected: {file.name}</p>
            )}

            <button
              onClick={uploadPdf}
              disabled={isUploading}
              className={`mt-4 px-6 py-3 rounded-xl shadow-lg font-medium text-white transition duration-300 ${
                isUploading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-slate-900 hover:bg-slate-800"
              }`}
            >
              {isUploading ? "Uploading to Cloudinary..." : "Upload PDF"}
            </button>
          </div>
        </div>

        {/* PDF List Layout */}
        <div>
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            Uploaded PDFs
          </h2>

          {pdfs.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl shadow-sm border border-gray-100">
              <span className="text-4xl">📚</span>
              <p className="text-gray-500 mt-4 font-medium">No documents uploaded yet.</p>
              <p className="text-gray-400 text-sm mt-1">Your uploaded planners and materials will appear here.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {pdfs.map((pdf) => (
                <div
                  key={pdf.id}
                  className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-4xl mb-3">📕</div>
                    <h3 className="font-semibold text-gray-700 text-lg line-clamp-1">{pdf.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Study Resource Asset
                    </p>
                  </div>

                  {/* Action Row containing View & New Delete Buttons */}
                  <div className="flex items-center justify-between mt-6 border-t border-gray-100 pt-3">
                    <a
                      href={pdf.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline transition"
                    >
                      View PDF →
                    </a>

                    {/* 👇 NEW: Interactive Delete Button */}
                    <button
                      onClick={() => deletePdf(pdf.id)}
                      disabled={deletingId === pdf.id}
                      className={`text-sm font-medium px-3 py-1.5 rounded-lg transition ${
                        deletingId === pdf.id
                          ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                          : "text-red-600 hover:bg-red-50 hover:text-red-700"
                      }`}
                    >
                      {deletingId === pdf.id ? "Removing..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PdfManager;