import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const google = await prisma.company.create({
    data: { name: "Google" },
  });

  const amazon = await prisma.company.create({
    data: { name: "Amazon" },
  });

  const microsoft = await prisma.company.create({
    data: { name: "Microsoft" },
  });

  await prisma.compensation.createMany({
    data: [
      {
        role: "Software Engineer",
        level: "L3",
        location: "Bangalore",
        baseSalary: 1800000,
        bonus: 200000,
        stock: 300000,
        totalComp: 2300000,
        companyId: google.id,
      },
      {
        role: "Software Engineer",
        level: "L4",
        location: "Hyderabad",
        baseSalary: 3200000,
        bonus: 400000,
        stock: 700000,
        totalComp: 4300000,
        companyId: google.id,
      },
      {
        role: "SDE 1",
        level: "L4",
        location: "Bangalore",
        baseSalary: 2200000,
        bonus: 300000,
        stock: 500000,
        totalComp: 3000000,
        companyId: amazon.id,
      },
      {
        role: "SDE 2",
        level: "L5",
        location: "Pune",
        baseSalary: 3500000,
        bonus: 500000,
        stock: 900000,
        totalComp: 4900000,
        companyId: amazon.id,
      },
      {
        role: "Software Engineer",
        level: "63",
        location: "Hyderabad",
        baseSalary: 2800000,
        bonus: 300000,
        stock: 600000,
        totalComp: 3700000,
        companyId: microsoft.id,
      },
    ],
  });

  console.log("Seed data inserted!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });