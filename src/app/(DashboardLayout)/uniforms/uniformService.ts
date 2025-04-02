import { UniformSet } from "./UniformList";
import { UniformWithSketches, Sketch, createEmptyPlayer } from "./types";

const mockUniformSets: UniformSet[] = [
  { id: 1, budgetNumber: "1", isFilled: true },
  { id: 2, budgetNumber: "2", isFilled: false },
  { id: 3, budgetNumber: "3", isFilled: false },
  { id: 4, budgetNumber: "4", isFilled: true },
  { id: 5, budgetNumber: "5", isFilled: false },
];

const generateMockSketches = (): Sketch[] => {
  const letters = ["A", "B", "C"];
  return letters.map((letter) => {
    const playerCount = Math.floor(Math.random() * 1) + 1;
    const players = Array.from({ length: playerCount }, (_, i) =>
      createEmptyPlayer(i + 1),
    );

    return {
      id: letter,
      playerCount,
      players,
    };
  });
};

const mockUniformsWithSketches: Record<number, UniformWithSketches> = {
  1: {
    ...mockUniformSets[0],
    sketches: generateMockSketches(),
  },
  2: {
    ...mockUniformSets[1],
    sketches: generateMockSketches(),
  },
  3: {
    ...mockUniformSets[2],
    sketches: generateMockSketches(),
  },
  4: {
    ...mockUniformSets[3],
    sketches: generateMockSketches(),
  },
  5: {
    ...mockUniformSets[4],
    sketches: generateMockSketches(),
  },
};

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

  getUniformWithSketches: async (
    id: string | number,
  ): Promise<UniformWithSketches | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const uniformWithSketches = mockUniformsWithSketches[Number(id)];
        resolve(uniformWithSketches);
      }, 800);
    });
  },

  updateUniformSketches: async (
    id: number,
    sketches: Sketch[],
  ): Promise<UniformWithSketches> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUniform = {
          ...mockUniformsWithSketches[id],
          sketches: sketches,
          isFilled: true,
        };

        mockUniformsWithSketches[id] = updatedUniform;

        const uniformSetIndex = mockUniformSets.findIndex((u) => u.id === id);
        if (uniformSetIndex >= 0) {
          mockUniformSets[uniformSetIndex].isFilled = true;
        }

        resolve(updatedUniform);
      }, 800);
    });
  },
};
