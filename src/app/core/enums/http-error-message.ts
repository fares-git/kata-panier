export enum HttpErrorMessage {
  BadRequest = 'Requête invalide (400).',
  Unauthorized = 'Non autorisé (401). Veuillez vous reconnecter.',
  Forbidden = 'Accès refusé (403).',
  NotFound = 'Ressource non trouvée (404).',
  InternalServerError = 'Erreur interne du serveur (500).',
  Unknown = 'Erreur inconnue',
  NetworkError = 'Erreur réseau',
}
