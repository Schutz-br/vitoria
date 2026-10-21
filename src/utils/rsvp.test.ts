import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSummary,
  buildWhatsAppRSVPLink,
  getWeddingCountdown,
  exportRSVPsToCSV
} from './rsvp';
import { GuestRSVP } from '../types/wedding';

test('calculateSummary computes correct attendance and spots', () => {
  const sampleList: GuestRSVP[] = [
    {
      id: '1',
      name: 'João e Ana',
      phone: '123',
      attending: true,
      adultsCount: 2,
      childrenCount: 0,
      companions: ['Ana'],
      dietaryRestrictions: '',
      message: 'Parabéns!',
      submittedAt: '2026-10-20T00:00:00Z'
    },
    {
      id: '2',
      name: 'Pedro',
      phone: '456',
      attending: true,
      adultsCount: 1,
      childrenCount: 0,
      companions: [],
      dietaryRestrictions: 'Vegetariano',
      message: 'Estarei lá',
      submittedAt: '2026-10-20T00:00:00Z'
    },
    {
      id: '3',
      name: 'Carla',
      phone: '789',
      attending: false,
      adultsCount: 0,
      childrenCount: 0,
      companions: [],
      dietaryRestrictions: '',
      message: 'Não poderei ir',
      submittedAt: '2026-10-20T00:00:00Z'
    }
  ];

  const summary = calculateSummary(sampleList, 80);
  assert.equal(summary.totalResponses, 3);
  assert.equal(summary.attendingCount, 2);
  assert.equal(summary.declinedCount, 1);
  assert.equal(summary.totalConfirmedPeople, 3); // 2 from João + Ana, 1 from Pedro
  assert.equal(summary.remainingSpots, 77);
  assert.equal(summary.percentage, 4); // round((3/80)*100) = 4%
});

test('buildWhatsAppRSVPLink encodes guest details and message properly', () => {
  const link = buildWhatsAppRSVPLink({
    guestName: 'Lucas Lima',
    attending: true,
    companions: ['Beatriz Silva'],
    dietaryRestrictions: 'Sem lactose',
    message: 'Muitas felicidades ao casal!'
  });

  assert.ok(link.startsWith('https://wa.me/'));
  assert.ok(link.includes(encodeURIComponent('Lucas Lima')));
  assert.ok(link.includes(encodeURIComponent('Beatriz Silva')));
  assert.ok(link.includes(encodeURIComponent('Sem lactose')));
  assert.ok(link.includes(encodeURIComponent('Muitas felicidades ao casal!')));
  assert.ok(link.includes(encodeURIComponent('11 de Julho de 2027')));
});

test('getWeddingCountdown calculates remaining time until July 11 2027', () => {
  const fixedNow = new Date('2027-07-10T15:00:00-03:00'); // 1 day before
  const targetIso = '2027-07-11T15:00:00-03:00';
  const countdown = getWeddingCountdown(targetIso, fixedNow);

  assert.equal(countdown.isPast, false);
  assert.equal(countdown.days, 1);
  assert.equal(countdown.hours, 0);
  assert.equal(countdown.minutes, 0);
});

test('exportRSVPsToCSV outputs formatted CSV with correct columns', () => {
  const sampleList: GuestRSVP[] = [
    {
      id: '1',
      name: 'Maria Santos',
      phone: '(21) 99999-8888',
      attending: true,
      adultsCount: 1,
      childrenCount: 0,
      companions: [],
      dietaryRestrictions: 'Vegana',
      message: 'Ansiosa pelo dia!',
      submittedAt: '2026-10-20T10:00:00Z'
    }
  ];

  const csv = exportRSVPsToCSV(sampleList);
  assert.ok(csv.includes('Nome do Convidado'));
  assert.ok(csv.includes('Maria Santos'));
  assert.ok(csv.includes('Confirmado'));
  assert.ok(csv.includes('Vegana'));
});
