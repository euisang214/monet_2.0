
export function requireRole(
  session: { role?: 'CANDIDATE' | 'PROFESSIONAL' | 'ADMIN' } | null,
  roles: Array<'CANDIDATE' | 'PROFESSIONAL' | 'ADMIN'>
) {
  if (!session || !session.role || !roles.includes(session.role)) {
    const err = new Error('Forbidden');
    // In route handlers, translate to 403
    throw err;
  }
}
