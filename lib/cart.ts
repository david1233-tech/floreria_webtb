"use client";

import { useSyncExternalStore } from "react";
import { getProduct, type Product } from "./catalog";

export type CartItem = { slug: string; qty: number };
export type CartLine = { product: Product; qty: number };

const KEY = "cb-cart";
const EMPTY: CartItem[] = [];

/* ---------- Carrito (persistido en localStorage) ---------- */

let items: CartItem[] | null = null;
const cartListeners = new Set<() => void>();

function readCart(): CartItem[] {
  if (items) return items;
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    items = Array.isArray(parsed) ? parsed : [];
  } catch {
    items = [];
  }
  return items!;
}

function writeCart(next: CartItem[]) {
  items = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  cartListeners.forEach((l) => l());
}

function subscribeCart(listener: () => void) {
  cartListeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      items = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    cartListeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useCart() {
  const list = useSyncExternalStore(subscribeCart, readCart, () => EMPTY);
  const lines: CartLine[] = list.flatMap((item) => {
    const product = getProduct(item.slug);
    return product ? [{ product, qty: item.qty }] : [];
  });
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.qty * l.product.price, 0);
  return { lines, count, subtotal };
}

export const cart = {
  add(slug: string, qty = 1) {
    const list = readCart();
    const found = list.find((i) => i.slug === slug);
    writeCart(
      found
        ? list.map((i) => (i.slug === slug ? { ...i, qty: i.qty + qty } : i))
        : [...list, { slug, qty }],
    );
  },
  setQty(slug: string, qty: number) {
    if (qty <= 0) return cart.remove(slug);
    writeCart(readCart().map((i) => (i.slug === slug ? { ...i, qty } : i)));
  },
  remove(slug: string) {
    writeCart(readCart().filter((i) => i.slug !== slug));
  },
  clear() {
    writeCart([]);
  },
};

/* ---------- Panel lateral del carrito (abierto / cerrado) ---------- */

let drawerOpen = false;
const drawerListeners = new Set<() => void>();

function setDrawer(open: boolean) {
  drawerOpen = open;
  drawerListeners.forEach((l) => l());
}

export const cartDrawer = {
  open: () => setDrawer(true),
  close: () => setDrawer(false),
};

export function useCartDrawer() {
  return useSyncExternalStore(
    (l) => {
      drawerListeners.add(l);
      return () => drawerListeners.delete(l);
    },
    () => drawerOpen,
    () => false,
  );
}
