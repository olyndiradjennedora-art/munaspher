// Accès centralisé au contenu Sanity.
// Toutes les sections lisent leurs données via ces hooks — aucune donnée n'est
// codée en dur dans les composants. Le contenu provient du dataset Sanity
// (voir scripts/seed-sanity.ts pour l'amorçage initial).
import { useEffect, useState } from "react";
import client from "@/lib/sanity";

export interface SanityImage {
  asset?: { _ref?: string; _type?: string };
  alt?: string;
}

export interface Company {
  _id: string;
  name: string;
  image?: SanityImage;
  order?: number;
}

export interface Sector {
  _id: string;
  name: string;
  description?: string;
  order?: number;
  companies: Company[];
}

export interface Service {
  _id: string;
  title: string;
  slug?: string | { current?: string };
  category?: string;
  description?: string;
  detailedDescription?: string;
  features?: string[];
  // Vraie image du service (objet image Sanity ou ref string selon la source)
  image?: SanityImage | string;
}

// `coalesce(image, logo)` : on lit le nouveau champ `image` et on retombe sur
// l'ancien `logo` tant que les documents existants n'ont pas été migrés.
const SECTORS_QUERY = `*[_type == "sector"] | order(order asc, name asc){
  _id, name, description, order,
  "companies": *[_type == "client" && references(^._id)] | order(order asc, name asc){
    _id, name, "image": coalesce(image, logo), order
  }
}`;

// On récupère l'objet image complet pour qu'imageUrlFor en dérive l'URL CDN.
const SERVICES_QUERY = `*[_type == "service"] | order(order asc, title asc){
  _id, title, slug, category, description, detailedDescription, features,
  "image": coalesce(image, icon)
}`;

interface AsyncState<T> {
  data: T;
  loading: boolean;
  error: Error | null;
}

function useSanityQuery<T>(query: string, fallback: T): AsyncState<T> {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    client
      .fetch<T>(query)
      .then((result) => {
        if (!mounted) return;
        setData(result ?? fallback);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!mounted) return;
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return { data, loading, error };
}

export function useSectors() {
  const { data, loading, error } = useSanityQuery<Sector[]>(SECTORS_QUERY, []);
  return { sectors: data, loading, error };
}

export function useServices() {
  const { data, loading, error } = useSanityQuery<Service[]>(SERVICES_QUERY, []);
  return { services: data, loading, error };
}

export function serviceSlug(service: Service): string {
  if (typeof service.slug === "string") return service.slug;
  if (service.slug?.current) return service.slug.current;
  return service._id;
}
