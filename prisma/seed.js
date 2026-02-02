import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
const slugify = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"").slice(0,100);

async function main() {
  const email="admin@example.com";
  const orgName="Demo Org";
  const org = await prisma.organization.upsert({
    where:{ slug: slugify(orgName) },
    update:{},
    create:{ name: orgName, slug: slugify(orgName), country:"EU", industry:"saas", complianceConfig:{} }
  });

  const passwordHash = await bcrypt.hash("admin1234", 12);
  await prisma.user.upsert({
    where:{ email },
    update:{},
    create:{ email, passwordHash, name:"Admin", role:"ADMIN", organizationId: org.id }
  });

  const end = new Date(); end.setDate(end.getDate()+14);
  await prisma.subscription.upsert({
    where:{ organizationId: org.id },
    update:{},
    create:{ organizationId: org.id, status:"TRIALING", tier:"STARTER", currentPeriodStart:new Date(), currentPeriodEnd:end }
  });

  console.log("Seeded demo org + admin:");
  console.log("  email:", email);
  console.log("  password: admin1234");
}
main().finally(async()=>prisma.$disconnect());
