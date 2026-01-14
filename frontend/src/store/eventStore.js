import { create } from 'zustand';

// const useEventStore = create((set) => ({
//   selectedCategory: 'All Events',
//   setSelectedCategory: (category) => set({ selectedCategory: category }),
// }));
const useEventStore = create((set) => ({
  selectedCategory: 'All Events',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));

export default useEventStore;

