'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/Loading';

export default function GerenciarSalasPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', type: 'SALA_AULA', capacity: '', building: '', floor: '', equipment: ''
  });

  useEffect(() => { fetchRooms(); }, []);

  const fetchRooms = async () => {
    try {
      const res = await fetch('/api/rooms');
      if (res.ok) setRooms(await res.json());
    } catch (error) {
      toast.error('Erro ao carregar salas');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const equipment = formData.equipment.split(',').map(e => e.trim()).filter(Boolean);
      const res = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, equipment }),
      });
      if (res.ok) {
        toast.success('Sala criada com sucesso!');
        setShowModal(false);
        fetchRooms();
        setFormData({ name: '', type: 'SALA_AULA', capacity: '', building: '', floor: '', equipment: '' });
      } else {
        toast.error('Erro ao criar sala');
      }
    } catch (error) {
      toast.error('Erro ao criar sala');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Gerenciar Salas</h1>
            <p className="text-gray-600 mt-2">Adicione e gerencie salas e laboratórios</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus size={20} />
            Nova Sala
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-primary-400 hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{room.name}</h3>
                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  room.type === 'LABORATORIO' ? 'bg-blue-100 text-blue-700' :
                  room.type === 'AUDITORIO' ? 'bg-purple-100 text-purple-700' :
                  'bg-green-100 text-green-700'
                }`}>{room.type}</span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Capacidade:</strong> {room.capacity} pessoas</p>
                <p><strong>Prédio:</strong> {room.building} - {room.floor}º andar</p>
                {room.equipment?.length > 0 && (
                  <div>
                    <strong>Equipamentos:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {room.equipment.map((eq: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-xs">{eq}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Nova Sala</h2>
                <button onClick={() => setShowModal(false)}><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Nome da sala" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="w-full px-4 py-3 border-2 rounded-lg" />
                <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-3 border-2 rounded-lg">
                  <option value="SALA_AULA">Sala de Aula</option>
                  <option value="LABORATORIO">Laboratório</option>
                  <option value="AUDITORIO">Auditório</option>
                </select>
                <div className="grid grid-cols-3 gap-4">
                  <input type="number" placeholder="Capacidade" value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: e.target.value})} required className="px-4 py-3 border-2 rounded-lg" />
                  <input type="text" placeholder="Prédio" value={formData.building} onChange={(e) => setFormData({...formData, building: e.target.value})} required className="px-4 py-3 border-2 rounded-lg" />
                  <input type="number" placeholder="Andar" value={formData.floor} onChange={(e) => setFormData({...formData, floor: e.target.value})} className="px-4 py-3 border-2 rounded-lg" />
                </div>
                <input type="text" placeholder="Equipamentos (separados por vírgula)" value={formData.equipment} onChange={(e) => setFormData({...formData, equipment: e.target.value})} className="w-full px-4 py-3 border-2 rounded-lg" />
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
