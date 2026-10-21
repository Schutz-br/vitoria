import { GuestRSVP, WeddingData } from '../types/wedding';

export const WEDDING_EVENT: WeddingData = {
  coupleNames: 'Vitória & Kauã',
  brideName: 'Vitória',
  groomName: 'Kauã',
  date: '2027-07-11T15:00:00-03:00',
  dateFormatted: '11 de Julho de 2027',
  dayOfWeek: 'Domingo',
  time: '15h',
  venueName: 'Chalé Enfesta',
  address: 'R. 1º de Maio, 42',
  neighborhood: 'Parque Paulista',
  city: 'Duque de Caxias – RJ',
  cep: '25260-000',
  openingQuote: 'Entre flores e promessas, florescemos juntos.',
  invitationBody: [
    'Com os corações cheios de alegria e a certeza de que a vida é mais bela quando compartilhada, Vitória e Kauã convidam para celebrarem juntos o início de um novo capítulo em suas histórias.',
    'O sim mais importante de nossas vidas acontecerá no dia:',
    '11 de Julho de 2027, às 15h, no Chalé Enfesta.'
  ],
  maxGuestsTarget: 80,
  pixKey: 'vitoriaekaua2027@gmail.com',
  pixType: 'E-mail',
  pixRecipient: 'Vitória & Kauã',
  pixBank: 'NuBank'
};

const STORAGE_KEY = 'vk_wedding_rsvp_list_v1';

export const INITIAL_RSVP_LIST: GuestRSVP[] = [
  {
    id: 'rsvp-1',
    name: 'Helena & Roberto Silveira',
    phone: '(21) 98765-4321',
    attending: true,
    adultsCount: 2,
    childrenCount: 0,
    companions: ['Roberto Silveira'],
    dietaryRestrictions: 'Sem glúten para Helena',
    message: 'Estamos muito emocionados por vocês! Mal podemos esperar para celebrar esse amor lindo!',
    submittedAt: '2026-10-15T14:30:00Z'
  },
  {
    id: 'rsvp-2',
    name: 'Gabriel Martins',
    phone: '(21) 99123-4567',
    attending: true,
    adultsCount: 1,
    childrenCount: 0,
    companions: [],
    dietaryRestrictions: 'Nenhuma',
    message: 'Contem comigo desde o início até o fim da festa! Um abraço aos noivos!',
    submittedAt: '2026-10-16T18:20:00Z'
  },
  {
    id: 'rsvp-3',
    name: 'Mariana Duarte e Família',
    phone: '(21) 97654-3210',
    attending: true,
    adultsCount: 2,
    childrenCount: 1,
    companions: ['Lucas Duarte', 'Sofia Duarte (5 anos)'],
    dietaryRestrictions: 'Vegetariana',
    message: 'Que Deus abençoe imensamente essa união. Estaremos lá com todo o carinho do mundo!',
    submittedAt: '2026-10-17T11:05:00Z'
  },
  {
    id: 'rsvp-4',
    name: 'Carlos Eduardo Ramos',
    phone: '(21) 98888-7777',
    attending: false,
    adultsCount: 0,
    childrenCount: 0,
    companions: [],
    dietaryRestrictions: '',
    message: 'Queridos, estarei em viagem a trabalho nessa data, mas meu coração estará com vocês! Desejo toda felicidade!',
    submittedAt: '2026-10-18T09:40:00Z'
  }
];

export function getStoredRSVPs(): GuestRSVP[] {
  if (typeof window === 'undefined') return INITIAL_RSVP_LIST;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_RSVP_LIST));
      return INITIAL_RSVP_LIST;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_RSVP_LIST;
  } catch {
    return INITIAL_RSVP_LIST;
  }
}

export function saveRSVP(rsvp: Omit<GuestRSVP, 'id' | 'submittedAt'>): GuestRSVP {
  const current = getStoredRSVPs();
  const newEntry: GuestRSVP = {
    ...rsvp,
    id: 'rsvp-' + Date.now(),
    submittedAt: new Date().toISOString()
  };
  const updated = [newEntry, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return newEntry;
}

export function deleteRSVP(id: string): GuestRSVP[] {
  const current = getStoredRSVPs();
  const updated = current.filter(item => item.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function calculateSummary(rsvps: GuestRSVP[], targetMax = 80) {
  const attendingList = rsvps.filter(r => r.attending);
  const declinedList = rsvps.filter(r => !r.attending);

  let totalAdults = 0;
  let totalChildren = 0;

  for (const item of attendingList) {
    totalAdults += Math.max(1, item.adultsCount || (1 + (item.companions?.length || 0) - (item.childrenCount || 0)));
    totalChildren += item.childrenCount || 0;
  }

  const totalConfirmedPeople = attendingList.reduce((acc, item) => {
    // 1 (the main guest) + companions length
    const total = 1 + (item.companions?.length || 0);
    return acc + total;
  }, 0);

  const percentage = Math.min(100, Math.round((totalConfirmedPeople / targetMax) * 100));
  const remainingSpots = Math.max(0, targetMax - totalConfirmedPeople);

  return {
    totalResponses: rsvps.length,
    attendingCount: attendingList.length,
    declinedCount: declinedList.length,
    totalConfirmedPeople,
    totalAdults,
    totalChildren,
    targetMax,
    remainingSpots,
    percentage
  };
}

export function buildWhatsAppRSVPLink(data: {
  guestName: string;
  attending: boolean;
  companions: string[];
  dietaryRestrictions?: string;
  message?: string;
  targetPhone?: string; // Optional phone of couple, e.g. 5521999999999
}): string {
  const phone = data.targetPhone || '5521987654321'; // Default WhatsApp number for the couple
  const statusEmoji = data.attending ? '✨ SIM, com certeza!' : '💐 Infelizmente não poderei';
  
  let msg = `*Confirmação de Presença — Casamento Vitória & Kauã*\n\n`;
  msg += `👤 *Convidado(a):* ${data.guestName.trim()}\n`;
  msg += `💌 *Presença:* ${statusEmoji}\n`;

  if (data.attending) {
    if (data.companions && data.companions.length > 0) {
      msg += `👥 *Acompanhantes (${data.companions.length}):*\n`;
      data.companions.forEach((c, idx) => {
        msg += `  ${idx + 1}. ${c}\n`;
      });
      msg += `Total de pessoas: ${1 + data.companions.length}\n`;
    } else {
      msg += `👥 *Acompanhantes:* Apenas eu (1 pessoa)\n`;
    }

    if (data.dietaryRestrictions && data.dietaryRestrictions.trim()) {
      msg += `🥗 *Restrições alimentares:* ${data.dietaryRestrictions.trim()}\n`;
    }
  }

  if (data.message && data.message.trim()) {
    msg += `\n💬 *Mensagem para os noivos:*\n"${data.message.trim()}"\n`;
  }

  msg += `\n🗓 *Data:* 11 de Julho de 2027 às 15h\n📍 *Local:* Chalé Enfesta`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function getWeddingCountdown(targetDateIso: string, fromDate = new Date()): CountdownResult {
  const target = new Date(targetDateIso).getTime();
  const now = fromDate.getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, isPast: false };
}

export function exportRSVPsToCSV(rsvps: GuestRSVP[]): string {
  const headers = ['Nome do Convidado', 'Status', 'Total de Pessoas', 'Acompanhantes', 'Telefone', 'Restrições Alimentares', 'Mensagem', 'Data de Envio'];
  const rows = rsvps.map(r => [
    `"${r.name.replace(/"/g, '""')}"`,
    r.attending ? 'Confirmado' : 'Não comparecerá',
    r.attending ? 1 + (r.companions?.length || 0) : 0,
    `"${(r.companions || []).join('; ').replace(/"/g, '""')}"`,
    `"${r.phone || ''}"`,
    `"${(r.dietaryRestrictions || '').replace(/"/g, '""')}"`,
    `"${(r.message || '').replace(/"/g, '""')}"`,
    new Date(r.submittedAt).toLocaleDateString('pt-BR')
  ]);

  return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}
