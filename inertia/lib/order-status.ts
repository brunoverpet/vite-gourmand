export const CONTACT_MODE_LABELS: Record<string, string> = {
  appel_gsm: 'Appel GSM',
  mail: 'Mail',
  physique: 'Physique',
}

export const ORDER_STATUS_LABELS: Record<string, string> = {
  en_attente: 'En attente',
  acceptee: 'Acceptée',
  en_preparation: 'En préparation',
  en_cours_de_livraison: 'En cours de livraison',
  livree: 'Livrée',
  en_attente_retour_materiel: 'En attente retour matériel',
  terminee: 'Terminée',
  annulee: 'Annulée',
}

export const ORDER_STATUS_COLORS: Record<string, string> = {
  en_attente: 'bg-yellow-100 text-yellow-800',
  acceptee: 'bg-blue-100 text-blue-800',
  en_preparation: 'bg-orange-100 text-orange-800',
  en_cours_de_livraison: 'bg-purple-100 text-purple-800',
  livree: 'bg-green-100 text-green-800',
  en_attente_retour_materiel: 'bg-amber-100 text-amber-800',
  terminee: 'bg-emerald-100 text-emerald-800',
  annulee: 'bg-red-100 text-red-800',
}

const BASE_TRANSITIONS: Record<string, string[]> = {
  en_attente: ['acceptee', 'annulee'],
  acceptee: ['en_preparation'],
  en_preparation: ['en_cours_de_livraison'],
  en_cours_de_livraison: ['livree'],
  livree: [],
  en_attente_retour_materiel: ['terminee'],
  terminee: [],
  annulee: [],
}

export function getOrderStatusTransitions(status: string, materialLoan: boolean): string[] {
  if (status === 'livree') {
    return materialLoan ? ['en_attente_retour_materiel'] : ['terminee']
  }
  return BASE_TRANSITIONS[status] ?? []
}

export const ACCEPTED_AND_BEYOND = [
  'acceptee',
  'en_preparation',
  'en_cours_de_livraison',
  'livree',
  'en_attente_retour_materiel',
  'terminee',
]
