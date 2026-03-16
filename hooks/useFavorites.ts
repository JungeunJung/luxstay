"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "luxstay_favorites";

function getFavoritesFromStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useFavorites(propertyId?: string) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavoritesFromStorage());
  }, []);

  const isFavorite = propertyId ? favorites.includes(propertyId) : false;

  const toggle = () => {
    if (!propertyId) return;
    const next = isFavorite
      ? favorites.filter((id) => id !== propertyId)
      : [...favorites, propertyId];
    setFavorites(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const addFavorite = (id: string) => {
    if (favorites.includes(id)) return;
    const next = [...favorites, id];
    setFavorites(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const removeFavorite = (id: string) => {
    const next = favorites.filter((fid) => fid !== id);
    setFavorites(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  return { favorites, isFavorite, toggle, addFavorite, removeFavorite };
}
