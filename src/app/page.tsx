import { redirect } from 'next/navigation';

type RootPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function RootPage({ searchParams }: RootPageProps) {
  const params = new URLSearchParams();
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (typeof value === 'string') {
        params.set(key, value);
      }
    });
  }

  const target = params.toString() ? `/questions?${params.toString()}` : '/questions';
  redirect(target);
}