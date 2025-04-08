export type Gender = "masculino" | "feminino" | "infantil";

export interface Player {
  id: number;
  name: string;
  gender: Gender;
  jerseySize: string;
  shortsSize: string;
  number: string;
}

export interface UniformSet {
  id: number;
  budgetNumber: string;
  isFilled: boolean;
}

export type PackageType =
  | "Start"
  | "Prata"
  | "Ouro"
  | "Diamante"
  | "Pro"
  | "Premium";

export interface Sketch {
  id: string;
  playerCount: number;
  players: Player[];
  packageType: PackageType;
}

export interface UniformWithSketches {
  id: number;
  budgetNumber: string;
  isFilled: boolean;
  sketches: Sketch[];
}

export const SIZES_BY_GENDER: Record<
  Gender,
  { jersey: string[]; shorts: string[] }
> = {
  masculino: {
    jersey: ["PP", "P", "M", "G", "GG", "XG", "XXG", "XXXG"],
    shorts: ["PP", "P", "M", "G", "GG", "XG", "XXG", "XXXG"],
  },
  feminino: {
    jersey: ["P", "M", "G", "GG", "XG", "XXG", "XXXG"],
    shorts: ["P", "M", "G", "GG", "XG", "XXG", "XXXG"],
  },
  infantil: {
    jersey: ["2", "4", "6", "8", "10", "12", "14", "16"],
    shorts: ["2", "4", "6", "8", "10", "12", "14", "16"],
  },
};

export const createEmptyPlayer = (id: number): Player => ({
  id,
  name: "",
  gender: "masculino",
  jerseySize: "",
  shortsSize: "",
  number: "",
});
