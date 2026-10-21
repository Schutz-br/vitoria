import React, { useState } from 'react';
import {
  X,
  Lock,
  Unlock,
  Users,
  CheckCircle2,
  XCircle,
  Download,
  Copy,
  Plus,
  Trash2,
  Search,
  Check,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { GuestRSVP } from '../types/wedding';
import {
  getStoredRSVPs,
  saveRSVP,
  deleteRSVP,
  calculateSummary,
  exportRSVPsToCSV
} from '../utils/rsvp';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);

  const [rsvps, setRsvps] = useState<GuestRSVP[]>(() => getStoredRSVPs());
  const [filter, setFilter] = useState<'all' | 'attending' | 'declined' | 'dietary'>('all');
  const [search, setSearch] = useState('');
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Manual guest addition modal state
  const [showAddForm, setShowAddForm] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualAttending, setManualAttending] = useState(true);
  const [manualCompanions, setManualCompanions] = useState('');
  const [manualDietary, setManualDietary] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 2027 (wedding year) or 1107 (day/month)
    if (pin.trim() === '2027' || pin.trim() === '1107' || pin.trim().toLowerCase() === 'noivos') {
      setIsAuthenticated(true);
      setPinError(false);
      setRsvps(getStoredRSVPs());
    } else {
      setPinError(true);
    }
  };

  const reloadData = () => {
    setRsvps(getStoredRSVPs());
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover esta confirmação?')) {
      const updated = deleteRSVP(id);
      setRsvps(updated);
    }
  };

  const handleAddManualGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim()) return;

    const comps = manualCompanions
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    saveRSVP({
      name: manualName.trim(),
      phone: manualPhone.trim() || 'Manual',
      attending: manualAttending,
      adultsCount: manualAttending ? 1 + comps.length : 0,
      childrenCount: 0,
      companions: manualAttending ? comps : [],
      dietaryRestrictions: manualDietary.trim(),
      message: 'Adicionado manualmente pelos noivos'
    });

    setManualName('');
    setManualPhone('');
    setManualCompanions('');
    setManualDietary('');
    setShowAddForm(false);
    reloadData();
  };

  const handleExportCSV = () => {
    const csvContent = exportRSVPsToCSV(rsvps);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `convidados_vitoria_kaua_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const summary = calculateSummary(rsvps, 80);

  const handleCopySummaryWhatsApp = () => {
    const text = `*Resumo de Convidados — Casamento Vitória & Kauã*\n` +
      `🗓 Data: 11 de Julho de 2027 | Local: Chalé Enfesta\n\n` +
      `✅ *Total Confirmados:* ${summary.totalConfirmedPeople} pessoas\n` +
      `🎯 *Meta de Convidados:* ${summary.targetMax} pessoas (${summary.percentage}% preenchido)\n` +
      `🎟 *Vagas Restantes:* ${summary.remainingSpots} pessoas\n` +
      `❌ *Não comparecerão:* ${summary.declinedCount} respostas\n` +
      `📋 *Total de Respostas:* ${summary.totalResponses} envios`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const filteredRSVPs = rsvps.filter(item => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.toLowerCase().includes(search.toLowerCase()) ||
      item.companions.some(c => c.toLowerCase().includes(search.toLowerCase()));

    if (!matchSearch) return false;

    if (filter === 'attending') return item.attending;
    if (filter === 'declined') return !item.attending;
    if (filter === 'dietary') return Boolean(item.dietaryRestrictions && item.dietaryRestrictions.trim());
    return true;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Painel dos Noivos"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl my-auto bg-white rounded-2xl shadow-2xl border border-[#e2d6c7] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#f8f5ee] border-b border-[#e5d9cc] shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#3e533e] text-white">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-cormorant text-xl font-semibold text-[#2c382c]">
                Painel dos Noivos · Vitória & Kauã
              </h3>
              <p className="text-[11px] text-[#716353]">Acompanhamento em tempo real da lista de convidados</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Fechar Painel dos Noivos"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 text-center max-w-sm mx-auto my-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#f4eee4] text-[#81654a] flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="font-serif-cormorant text-2xl text-[#2c382c] font-semibold">
              Acesso Exclusivo dos Noivos
            </h4>
            <p className="text-xs text-[#6e5f50]">
              Digite o PIN de acesso para visualizar e gerenciar as confirmações de presença.
            </p>

            <form onSubmit={handleLogin} className="space-y-3 pt-2">
              <input
                type="password"
                placeholder="Digite o PIN (dica: 2027)"
                value={pin}
                onChange={e => setPin(e.target.value)}
                className="w-full px-4 py-3 text-center tracking-widest text-lg rounded-xl border border-[#d6c7b3] focus:outline-none focus:ring-2 focus:ring-[#819e81]"
                autoFocus
              />

              {pinError && (
                <p className="text-xs text-red-600 font-medium">
                  PIN incorreto. Tente "2027" ou "1107".
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#3e533e] hover:bg-[#324532] text-white text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Entrar no Painel
              </button>
            </form>

            <p className="text-[11px] text-gray-400 italic">
              PIN padrão: 2027
            </p>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-[#f2f7f2] border border-[#d2e3d2]">
                <span className="text-[11px] uppercase tracking-wider text-[#456b45] font-semibold block">
                  Confirmados
                </span>
                <span className="font-serif-cormorant text-3xl font-bold text-[#2a4d2a] tabular-nums">
                  {summary.totalConfirmedPeople}
                </span>
                <span className="text-[11px] text-[#557b55] block mt-0.5">
                  em {summary.attendingCount} respostas
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#e8ded0]">
                <span className="text-[11px] uppercase tracking-wider text-[#796d60] font-semibold block">
                  Meta Total
                </span>
                <span className="font-serif-cormorant text-3xl font-bold text-[#324032] tabular-nums">
                  {summary.targetMax}
                </span>
                <span className="text-[11px] text-[#796d60] block mt-0.5">
                  {summary.percentage}% da meta
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#fdf5f5] border border-[#f3d7d7]">
                <span className="text-[11px] uppercase tracking-wider text-[#8e4545] font-semibold block">
                  Não Vão
                </span>
                <span className="font-serif-cormorant text-3xl font-bold text-[#8e4545] tabular-nums">
                  {summary.declinedCount}
                </span>
                <span className="text-[11px] text-[#8e4545] block mt-0.5">
                  respostas
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#f5f8fb] border border-[#d8e4f0]">
                <span className="text-[11px] uppercase tracking-wider text-[#3e6080] font-semibold block">
                  Vagas Livres
                </span>
                <span className="font-serif-cormorant text-3xl font-bold text-[#2d5272] tabular-nums">
                  {summary.remainingSpots}
                </span>
                <span className="text-[11px] text-[#3e6080] block mt-0.5">
                  convites restantes
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#e8ded0] space-y-2">
              <div className="flex justify-between items-center text-xs text-[#5f5142]">
                <span className="font-medium">Capacidade do Chalé Enfesta (80 convidados)</span>
                <span className="font-semibold tabular-nums">{summary.totalConfirmedPeople} / {summary.targetMax} ({summary.percentage}%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#e8dece] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#819e81] to-[#3e533e] transition-all duration-500 rounded-full"
                  style={{ width: `${summary.percentage}%` }}
                />
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#f4eee4] hover:bg-[#eae1d3] text-[#473a2e] text-xs font-medium transition-colors border border-[#d9ccbd]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Exportar CSV</span>
                </button>

                <button
                  onClick={handleCopySummaryWhatsApp}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#f4eee4] hover:bg-[#eae1d3] text-[#473a2e] text-xs font-medium transition-colors border border-[#d9ccbd]"
                >
                  {copiedSummary ? <Check className="w-3.5 h-3.5 text-[#3e533e]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSummary ? 'Copiado!' : 'Copiar Resumo'}</span>
                </button>
              </div>

              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#3e533e] hover:bg-[#324532] text-white text-xs font-medium transition-all shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddForm ? 'Fechar Formulário' : 'Adicionar Convidado'}</span>
              </button>
            </div>

            {/* Add Manual Guest Form */}
            {showAddForm && (
              <form onSubmit={handleAddManualGuest} className="p-4 rounded-xl bg-[#faf7f2] border border-[#e2d5c5] space-y-3">
                <h5 className="font-semibold text-xs uppercase tracking-wider text-[#524436]">
                  Adicionar Convidado Manualmente
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Nome completo..."
                    value={manualName}
                    onChange={e => setManualName(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-[#d6c7b3] text-xs focus:ring-2 focus:ring-[#819e81]"
                  />
                  <input
                    type="text"
                    placeholder="Telefone / WhatsApp..."
                    value={manualPhone}
                    onChange={e => setManualPhone(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-[#d6c7b3] text-xs focus:ring-2 focus:ring-[#819e81]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Acompanhantes (separados por vírgula)..."
                    value={manualCompanions}
                    onChange={e => setManualCompanions(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-[#d6c7b3] text-xs focus:ring-2 focus:ring-[#819e81]"
                  />
                  <input
                    type="text"
                    placeholder="Restrições alimentares..."
                    value={manualDietary}
                    onChange={e => setManualDietary(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-[#d6c7b3] text-xs focus:ring-2 focus:ring-[#819e81]"
                  />
                </div>
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-[#524436] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={manualAttending}
                      onChange={e => setManualAttending(e.target.checked)}
                      className="rounded text-[#3e533e]"
                    />
                    <span>Confirmou presença</span>
                  </label>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#3e533e] text-white text-xs font-semibold hover:bg-[#324532]"
                  >
                    Salvar Convidado
                  </button>
                </div>
              </form>
            )}

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisar por nome ou acompanhante..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#faf8f4] border border-[#d9ccbd] text-xs focus:outline-none focus:ring-2 focus:ring-[#819e81]"
                />
              </div>

              {/* Segmented Filter Buttons */}
              <div className="flex items-center gap-1 p-1 bg-[#f4eee4] rounded-xl self-start sm:self-auto text-xs overflow-x-auto">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                    filter === 'all' ? 'bg-white text-black font-semibold shadow-xs' : 'text-[#6c5e50]'
                  }`}
                >
                  Todos ({rsvps.length})
                </button>
                <button
                  onClick={() => setFilter('attending')}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                    filter === 'attending' ? 'bg-white text-[#335333] font-semibold shadow-xs' : 'text-[#6c5e50]'
                  }`}
                >
                  Confirmados ({summary.attendingCount})
                </button>
                <button
                  onClick={() => setFilter('declined')}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                    filter === 'declined' ? 'bg-white text-[#833838] font-semibold shadow-xs' : 'text-[#6c5e50]'
                  }`}
                >
                  Não Vão ({summary.declinedCount})
                </button>
                <button
                  onClick={() => setFilter('dietary')}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                    filter === 'dietary' ? 'bg-white text-black font-semibold shadow-xs' : 'text-[#6c5e50]'
                  }`}
                >
                  Restrições
                </button>
              </div>
            </div>

            {/* Guests Table / List */}
            <div className="border border-[#e5d9cc] rounded-xl overflow-hidden">
              {filteredRSVPs.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-xs">
                  Nenhuma resposta encontrada para os filtros selecionados.
                </div>
              ) : (
                <div className="divide-y divide-[#eee4d7] bg-white text-xs">
                  {filteredRSVPs.map(item => (
                    <div key={item.id} className="p-4 hover:bg-[#faf8f4] transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${item.attending ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                          <h6 className="font-semibold text-sm text-[#2c382c]">{item.name}</h6>
                          <span className="text-[11px] text-gray-500">· {item.phone}</span>
                        </div>

                        {item.attending && (
                          <p className="text-gray-600 text-[11px]">
                            👥 Total de pessoas: <strong>{1 + (item.companions?.length || 0)}</strong>
                            {item.companions?.length > 0 && ` (${item.companions.join(', ')})`}
                          </p>
                        )}

                        {item.dietaryRestrictions && (
                          <p className="text-[#a26838] text-[11px]">
                            🥗 <strong>Restrição:</strong> {item.dietaryRestrictions}
                          </p>
                        )}

                        {item.message && (
                          <p className="text-gray-500 italic text-[11px] bg-[#faf7f2] p-2 rounded-lg mt-1 border border-[#eee4d7]">
                            "{item.message}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <span className="text-[10px] text-gray-400">
                          {new Date(item.submittedAt).toLocaleDateString('pt-BR')}
                        </span>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                          title="Excluir resposta"
                          aria-label={`Excluir resposta de ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 bg-[#f8f5ee] border-t border-[#e5d9cc] text-right shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium transition-colors"
          >
            Fechar Painel
          </button>
        </div>
      </div>
    </div>
  );
};
