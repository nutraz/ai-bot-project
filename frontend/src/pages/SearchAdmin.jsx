import React, { useState, useEffect } from 'react';
import { getResults, createResult, updateResult, deleteResult } from '../services/searchCrudService';

export default function SearchAdmin() {
  const [results, setResults] = useState([]);
  const [form, setForm] = useState({ title: '', snippet: '', type_: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  const loadResults = async () => {
    setResults(await getResults());
  };

  useEffect(() => { loadResults(); }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    try {
      if (editingId) {
        await updateResult(editingId, form.title, form.snippet, form.type_);
        setEditingId(null);
      } else {
        await createResult(form.title, form.snippet, form.type_);
      }
      setForm({ title: '', snippet: '', type_: '' });
      loadResults();
    } catch (err) {
      setError('Failed to save result');
    }
  };

  const handleEdit = r => {
    setEditingId(r.id);
    setForm({ title: r.title, snippet: r.snippet, type_: r.type_ });
  };

  const handleDelete = async id => {
    await deleteResult(id);
    loadResults();
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Search Admin (CRUD)</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border px-3 py-2 rounded w-full" required />
        <input name="snippet" value={form.snippet} onChange={handleChange} placeholder="Snippet" className="border px-3 py-2 rounded w-full" required />
        <input name="type_" value={form.type_} onChange={handleChange} placeholder="Type (repo, user, proposal)" className="border px-3 py-2 rounded w-full" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Create'}</button>
        {editingId && <button type="button" className="ml-2 px-4 py-2 rounded bg-gray-300" onClick={() => { setEditingId(null); setForm({ title: '', snippet: '', type_: '' }); }}>Cancel</button>}
      </form>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <ul className="space-y-3">
        {results.map(r => (
          <li key={r.id} className="p-4 bg-white rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-bold">{r.title} <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded ml-2">{r.type_}</span></div>
              <div className="text-gray-700 text-sm">{r.snippet}</div>
            </div>
            <div className="mt-2 md:mt-0 flex gap-2">
              <button className="px-3 py-1 bg-yellow-400 rounded" onClick={() => handleEdit(r)}>Edit</button>
              <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(r.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
