import { ApiProject } from "./api-project";

export interface ApiResponse {
  status: string;
  message: string;
  data: ApiProject[];
}
