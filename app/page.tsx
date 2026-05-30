import CompensationTable from "@/components/CompensationTable";
import Link from "next/link";
import { UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

async function getData() {
  const res = await fetch(
  `${process.env.NEXT_PUBLIC_APP_URL}/api/compensations`,
  {
    cache: "no-store",
  }
);
  return res.json();
}

export default async function Home() {
  const data = await getData();
  const { userId } = await auth();

  return (
    <>
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#e3dccd] bg-[#f4efe6]/95 px-6 py-3 backdrop-blur-sm">
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/" className="font-semibold text-[#9a7b3f]">
            Dashboard
          </Link>
          <Link
            href="/compare"
            className="text-[#6b6459] transition hover:text-[#9a7b3f]"
          >
            Compare
          </Link>
          <Link
            href="/saved"
            className="text-[#6b6459] transition hover:text-[#9a7b3f]"
          >
            Saved
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {!userId ? (
            <>
              <SignInButton>
                <button className="rounded-full border border-[#e3dccd] bg-[#fbf8f2] px-4 py-1.5 text-sm font-medium text-[#1c1a17] transition hover:border-[#c2a368]">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="rounded-full bg-[#9a7b3f] px-4 py-1.5 text-sm font-semibold text-white transition hover:opacity-90">
                  Sign up
                </button>
              </SignUpButton>
            </>
          ) : (
            <UserButton />
          )}
        </div>
      </div>
      <CompensationTable data={data} />
    </>
  );
}
