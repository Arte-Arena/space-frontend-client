import { UniformSet } from "./UniformList";

const mockUniformSets: UniformSet[] = [
  { id: 1, budgetNumber: "1", isFilled: true },
  { id: 2, budgetNumber: "2", isFilled: false },
  { id: 3, budgetNumber: "3", isFilled: false },
  { id: 4, budgetNumber: "4", isFilled: true },
  { id: 5, budgetNumber: "5", isFilled: false },
];

export const uniformService = {
  getUniformSets: async (): Promise<UniformSet[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUniformSets);
      }, 800);
    });
  },

  getUniformById: async (
    id: string | number,
  ): Promise<UniformSet | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const uniformSet = mockUniformSets.find((u) => u.id === Number(id));
        resolve(uniformSet);
      }, 800);
    });
  },

  updateUniformData: async (id: number, data: any): Promise<UniformSet> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedSet = {
          ...mockUniformSets.find((u) => u.id === id)!,
          ...data,
        };
        resolve(updatedSet);
      }, 800);
    });
  },
};
