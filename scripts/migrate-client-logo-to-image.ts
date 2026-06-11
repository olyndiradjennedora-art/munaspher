/**
 * Migration : renomme le champ `logo` → `image` sur les documents `client`.
 *
 * À lancer une seule fois, après avoir renommé le champ dans le schéma studio.
 * Idempotent : ignore les clients déjà migrés (qui ont déjà `image`).
 *
 * Usage (PowerShell) :
 *   $env:SANITY_WRITE_TOKEN = "<ton-token-editor>"; bun scripts/migrate-client-logo-to-image.ts
 * Usage (bash) :
 *   SANITY_WRITE_TOKEN=<ton-token-editor> bun scripts/migrate-client-logo-to-image.ts
 *
 * Token : https://www.sanity.io/manage → projet vt6o5liv → API → Tokens (rôle Editor).
 */
import { createClient } from "@sanity/client";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("✗ SANITY_WRITE_TOKEN manquant. Définis-le avant de lancer le script.");
  process.exit(1);
}

const client = createClient({
  projectId: "vt6o5liv",
  dataset: "production",
  apiVersion: "2024-04-01",
  token,
  useCdn: false,
});

async function run() {
  // Clients ayant encore un `logo` mais pas de `image`.
  const clients = await client.fetch<Array<{ _id: string; logo: unknown }>>(
    '*[_type == "client" && defined(logo) && !defined(image)]{_id, logo}',
  );

  if (clients.length === 0) {
    console.log("✓ Rien à migrer : tous les clients utilisent déjà `image`.");
    return;
  }

  const tx = client.transaction();
  clients.forEach((doc) => {
    tx.patch(doc._id, (p) => p.set({ image: doc.logo }).unset(["logo"]));
  });

  await tx.commit();
  console.log(`✓ Migration terminée : ${clients.length} client(s) migré(s) de \`logo\` vers \`image\`.`);
}

run().catch((err) => {
  console.error("✗ Échec de la migration :", err.message ?? err);
  process.exit(1);
});
