export const normalizeEmail = (email: string) => email.trim().toLowerCase();
export const normalizePassword = (password: string) => password.normalize('NFKC');