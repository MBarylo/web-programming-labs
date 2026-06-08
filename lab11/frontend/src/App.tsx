import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL as string;

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface FileMeta {
  name: string;
  originalName: string;
  size: number;
  mimeType: string;
  url: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<FileMeta | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Revoke object URL on cleanup or file change
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const validate = useCallback((f: File): string | null => {
    if (!ALLOWED_TYPES.includes(f.type))
      return `Недозволений тип: ${f.type}. Дозволено лише JPEG, PNG, WebP.`;
    if (f.size > MAX_SIZE)
      return `Файл занадто великий (${formatBytes(f.size)}). Максимум — 5 МБ.`;
    return null;
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setResult(null);
    setServerError(null);
    setProgress(0);
    setFile(null);
    setPreview(null);
    setValidationError(null);

    if (!selected) return;
    const err = validate(selected);
    if (err) {
      setValidationError(err);
      return;
    }
    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return;
    const err = validate(file);
    if (err) { setValidationError(err); return; }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setProgress(0);
    setServerError(null);
    setResult(null);

    try {
      const res = await axios.post<FileMeta>(`${API_URL}/files`, formData, {
        onUploadProgress: (e) => {
          if (e.total) setProgress(Math.round((e.loaded / e.total) * 100));
        },
      });
      setResult(res.data);
      setProgress(100);
    } catch (err: unknown) {
      let msg = "Помилка завантаження";
      if (axios.isAxiosError(err)) {
        const data = err.response?.data;
        if (typeof data?.message === "string") msg = data.message;
        else if (Array.isArray(data?.message)) msg = data.message.join("; ");
        else if (err.response?.status === 413) msg = "Файл занадто великий для сервера.";
      }
      setServerError(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setServerError(null);
    setValidationError(null);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">⬆</span>
          <span className="logo-text">ImageDrop</span>
        </div>
        <p className="subtitle">JPEG · PNG · WebP · до 5&nbsp;МБ</p>
      </header>

      <main className="card">
        {/* Drop zone / file input */}
        <label
          className={`dropzone ${file ? "dropzone--filled" : ""} ${validationError ? "dropzone--error" : ""}`}
          htmlFor="file-input"
        >
          {preview ? (
            <img src={preview} alt="preview" className="preview-img" />
          ) : (
            <div className="dropzone-placeholder">
              <span className="dropzone-icon">🖼</span>
              <span className="dropzone-hint">Клікніть або перетягніть зображення</span>
            </div>
          )}
          <input
            ref={inputRef}
            id="file-input"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            hidden
          />
        </label>

        {/* File meta */}
        {file && !validationError && (
          <div className="file-info">
            <span className="file-name">{file.name}</span>
            <span className="file-size">{formatBytes(file.size)}</span>
          </div>
        )}

        {/* Validation error */}
        {validationError && (
          <div className="alert alert--error">
            <span>⚠</span> {validationError}
          </div>
        )}

        {/* Progress bar */}
        {uploading && (
          <div className="progress-wrap">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
            <span className="progress-label">{progress}%</span>
          </div>
        )}

        {/* Server error */}
        {serverError && (
          <div className="alert alert--error">
            <span>✖</span> {serverError}
          </div>
        )}

        {/* Success */}
        {result && (
          <div className="success-block">
            <div className="alert alert--success">✔ Завантажено успішно!</div>
            <img src={result.url} alt={result.originalName} className="result-img" />
            <div className="result-meta">
              <div><span>Назва:</span> {result.originalName}</div>
              <div><span>Розмір:</span> {formatBytes(result.size)}</div>
              <div><span>MIME:</span> {result.mimeType}</div>
              <div><span>URL:</span> <a href={result.url} target="_blank" rel="noreferrer">{result.url}</a></div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="actions">
          <button
            className="btn btn--primary"
            onClick={handleUpload}
            disabled={!file || !!validationError || uploading}
          >
            {uploading ? `Завантаження… ${progress}%` : "Завантажити"}
          </button>
          {(file || result) && (
            <button className="btn btn--ghost" onClick={handleReset}>
              Скинути
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
