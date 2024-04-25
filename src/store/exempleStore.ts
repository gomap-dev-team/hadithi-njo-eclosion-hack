import { create } from "zustand";

type CounterState = {
  count: number;
};

type CounterAction = {
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
};

export const useCounterStore = create<CounterAction & CounterState>((set) => ({
  count: 0,
  increment: (qty: number) => set((state) => ({ count: state.count + qty })),
  decrement: (qty: number) => set((state) => ({ count: state.count - qty })),
}));
