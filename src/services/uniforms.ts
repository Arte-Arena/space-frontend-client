import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface Player {
  gender: string;
  name: string;
  shirt_size: string;
  number: string;
  shorts_size: string;
  observations?: string;
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

export interface Uniform {
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

export interface PlayersUpdateRequest {
  updates: SketchPlayersUpdate[];
}

export const getUniformById = async (
  uniformId: string,
): Promise<Uniform | null> => {
  try {
    const response = await axios.get(`${API_URL}/v1/uniforms?id=${uniformId}`, {
      withCredentials: true,
    });

    if (response.data && response.data.data) {
      return response.data.data;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching uniform ${uniformId}:`, error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const router = useRouter();
      router.push("/auth/auth1/login");
    }
    throw error;
  }
};

export const updateUniformPlayers = async (
  uniformId: string,
  updates: SketchPlayersUpdate[],
): Promise<Uniform | null> => {
  try {
    const updateData: PlayersUpdateRequest = {
      updates: updates,
    };

    const response = await axios.patch(
      `${API_URL}/v1/uniforms?id=${uniformId}`,
      updateData,
      {
        withCredentials: true,
      },
    );

    if (response.data && response.data.data) {
      return response.data.data;
    }

    return null;
  } catch (error) {
    console.error(`Error updating uniform players ${uniformId}:`, error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const router = useRouter();
      router.push("/auth/auth1/login");
    }
    throw error;
  }
};
