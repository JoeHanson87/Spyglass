import bcrypt from "bcryptjs";

const pw = process.argv[2];
if (!pw) {
  console.error('Usage: npm run hash -- "your password"');
  process.exit(1);
}
const hash = bcrypt.hashSync(pw, 12);
console.log(hash);
console.error(`\nLocal .env.local:  ADMIN_PASSWORD_HASH='${hash}'   (keep the single quotes)`);
console.error("Vercel dashboard / CLI: paste the plain hash, no quotes.");
