import { notFound } from "next/navigation";
import { awards, getAwardBySlug } from "@/data/awards";
import AwardDetailClient from "./AwardDetailClient";

export function generateStaticParams() {
  return awards.map((award) => ({ slug: award.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const award = getAwardBySlug(slug);
  if (!award) return {};
  return {
    title: `${award.company} — Listing Ceremony | AKSAN Capital Advisory`,
    description: award.description,
  };
}

export default async function AwardDetailPage({ params }) {
  const { slug } = await params;
  const award = getAwardBySlug(slug);
  if (!award) notFound();

  const currentIndex = awards.findIndex((a) => a.slug === award.slug);
  const prevAward = awards[(currentIndex - 1 + awards.length) % awards.length];
  const nextAward = awards[(currentIndex + 1) % awards.length];

  return (
    <AwardDetailClient award={award} prevAward={prevAward} nextAward={nextAward} />
  );
}