
export function requireRole(session: any, roles: Array<'CANDIDATE'|'PROFESSIONAL'|'ADMIN'>) {
  if (!session || !roles.includes(session.role)) {
    const err = new Error('Forbidden');
    // In route handlers, translate to 403
    throw err;
  }
}
