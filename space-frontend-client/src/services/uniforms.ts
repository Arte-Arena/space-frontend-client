import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface ApiResponse {
  message: string;
  data?: any;
}

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

export interface UniformMeasurement {
  id: number;
  largura_camisa: number;
  altura_camisa: number;
  largura_calcao: number;
  altura_calcao: number;
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
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const router = useRouter();
      router.push("/auth/auth1/login");
    }

    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
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
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const router = useRouter();
      router.push("/auth/auth1/login");
    }

    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw error;
  }
};

export const getAllUniforms = async (router: any): Promise<Uniform[]> => {
  try {
    const response = await axios.get(`${API_URL}/v1/uniforms`, {
      withCredentials: true,
    });

    if (response.data && response.data.data) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      router.push("/auth/auth1/login");
    }

    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw error;
  }
};

export const getUniformMeasurements = async (): Promise<
  UniformMeasurement[]
> => {
  try {
    const response = await axios.get(
      `https://api.spacearena.net/api/orcamento/uniformes-medidas`,
    );

    if (response.data) {
      return response.data;
    }

    return [];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw error;
  }
};
