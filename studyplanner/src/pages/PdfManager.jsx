import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function PdfManager() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [pdfs, setPdfs] = useState([]);

  const fetchPdf = async () => {
    try {
      const response = await api.get("pdf/");
      setPdfs(response.data);
    } catch (error) {
      console.log(error);
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
      await api.post("pdf/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFile(null);
      setTitle("");

      fetchPdf();

      alert("PDF Uploaded Successfully");
    } catch (error) {
      console.log(error);

      if (error.response) {
        console.log(error.response.data);
      }

      alert("Upload Failed");
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
              className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-slate-700"
            />

            <p className="text-gray-500 mb-4">Select a PDF file</p>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-5 block mx-auto"
            />

            {file && (
              <p className="text-sm text-green-600">Selected: {file.name}</p>
            )}

            <button
              onClick={uploadPdf}
              className="mt-6 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl shadow-lg transition duration-300"
            >
              Upload PDF
            </button>
          </div>
        </div>

        {/* PDF List */}

        <div>
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            Uploaded PDFs
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {pdfs.map((pdf) => (
              <div
                key={pdf.id}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="text-4xl mb-3">📕</div>

                <h3 className="font-semibold text-gray-700">{pdf.title}</h3>

                <p className="text-sm text-gray-500 mt-2">
                  Uploaded Study Material
                </p>

                <a
                  href={pdf.pdf}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-4 text-blue-600 hover:underline"
                >
                  View PDF →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PdfManager;
