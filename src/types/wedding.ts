export interface GuestRSVP {
  id: string;
  name: string;
  phone: string;
  attending: boolean;
  adultsCount: number;
  childrenCount: number;
  companions: string[]; // names of companions
  dietaryRestrictions: string;
  message: string;
  submittedAt: string; // ISO string
}

export interface WeddingData {
  coupleNames: string;
  brideName: string;
  groomName: string;
  date: string;
  dateFormatted: string;
  dayOfWeek: string;
  time: string;
  venueName: string;
  address: string;
  neighborhood: string;
  city: string;
  cep: string;
  openingQuote: string;
  invitationBody: string[];
  maxGuestsTarget: number;
  pixKey: string;
  pixType: string;
  pixRecipient: string;
  pixBank: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  author: string;
  timestamp: string;
  isOfficial?: boolean;
}
