export type Gender = "masculino" | "feminino" | "infantil";

export interface Player {
  gender: string;
  name: string;
  shirt_size: string;
  number: string;
  shorts_size: string;
  ready: boolean;
  observations?: string;
  _index?: number;
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
  | "Premium"
  | "Profissional";

export interface Sketch {
  id: string;
  player_count: number;
  package_type: PackageType;
  players: Player[];
}

export interface UniformWithSketches {
  id: string;
  client_id: string;
  budget_id: number;
  sketches: Sketch[];
  editable: boolean;
  created_at: string;
  updated_at: string;
}

export interface SketchPlayersUpdate {
  sketch_id: string;
  players: Player[];
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

export const createEmptyPlayer = (): Player => ({
  name: "",
  gender: "masculino",
  shirt_size: "",
  shorts_size: "",
  number: "",
  ready: false,
  observations: "",
});
