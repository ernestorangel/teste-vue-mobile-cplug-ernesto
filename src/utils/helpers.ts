import type { Sale } from '../types';

export function getNewSaleId(sales: Sale[]) {
  return sales.length + 1;
}
export function getCurrentDate() {
  return new Date();
}

export function formatMoneyFromNumber(value: number | undefined) {
  if (!value) return '-';
  return `R$ ${(value || 0.0).toFixed(2)}`;
}

export function formatToCustomDateString(date: Date | undefined) {
  if (!date) return '-';
  return date.toLocaleDateString();
}

export function formatToCustomTimeString(date: Date | undefined) {
  if (!date) return '-';
  return date.toLocaleTimeString();
}
