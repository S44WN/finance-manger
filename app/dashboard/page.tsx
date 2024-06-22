"use client";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

export default function Home() {
  const { data: accounts } = useGetAccounts();

  return (
    <div>
      <h1>Accounts</h1>
      <ul>
        {accounts?.map((account) => (
          <li key={account.id}>{account.name}</li>
        ))}
      </ul>
    </div>
  );
}
