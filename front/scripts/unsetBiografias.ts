import { createClient } from "next-sanity";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: "2024-03-11",
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function main() {
  const team = await client.fetch(`*[_type == "equipo"]`);
  console.log(`Found ${team.length} team members.`);

  for (const member of team) {
    if (member.biografia) {
      console.log(`Unsetting biografia for ${member.nombre} (${member._id})...`);
      await client.patch(member._id).unset(["biografia"]).commit();
      console.log(`✅ Cleared biografia for ${member.nombre}`);
    } else {
      console.log(`ℹ️ No biografia to clear for ${member.nombre}`);
    }
  }
}

main().catch(console.error);
