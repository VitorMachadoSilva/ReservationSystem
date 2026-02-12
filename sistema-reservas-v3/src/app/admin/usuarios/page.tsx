'use client';

import { useEffect, useState } from 'react';
import { UserPlus, Edit2, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { LoadingSpinner, TableSkeleton } from '@/components/Loading';

export default function GerenciarUsuariosPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    email: '', cpf: '', name: '', role: 'ALUNO', department: ''
  });

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      if (res.ok) setUsers(await res.json());
    } catch (error) {
      toast.error('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success('Usuário criado com sucesso!');
        setShowModal(false);
        fetchUsers();
        setFormData({ email: '', cpf: '', name: '', role: 'ALUNO', department: '' });
      } else {
        const data = await res.json();
        toast.error(data.error || 'Erro ao criar usuário');
      }
    } catch (error) {
      toast.error('Erro ao criar usuário');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Gerenciar Usuários</h1>
            <p className="text-gray-600 mt-2">Adicione e gerencie usuários do sistema</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
          >
            <UserPlus size={20} />
            Novo Usuário
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-gray-200">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Nome</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">CPF</th>
                <th className="px-6 py-4 text-left">Tipo</th>
                <th className="px-6 py-4 text-left">Departamento</th>
                <th className="px-6 py-4 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.cpf}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      user.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                      user.role === 'PROFESSOR' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>{user.role}</span>
                  </td>
                  <td className="px-6 py-4">{user.department || '-'}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-primary-500 hover:text-primary-700">
                        <Edit2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Novo Usuário</h2>
                <button onClick={() => setShowModal(false)}><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Nome completo" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg" />
                <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg" />
                <input type="text" placeholder="CPF (sem pontos)" value={formData.cpf} onChange={(e) => setFormData({...formData, cpf: e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg" />
                <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-3 border-2 rounded-lg">
                  <option value="ALUNO">Aluno</option>
                  <option value="PROFESSOR">Professor</option>
                  <option value="ADMIN">Administrador</option>
                </select>
                <input type="text" placeholder="Departamento (opcional)" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} className="w-full px-4 py-3 border-2 rounded-lg" />
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-bold">Cancelar</button>
                  <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold rounded-lg">Criar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
