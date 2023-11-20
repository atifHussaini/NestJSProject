export interface PropertyUpdatePayload {
  address?: string;
  data?: Record<any, any>;
  regionId?: string;
}

export interface PropertyCreatePayLoad {
  address: string;
  data: Record<any, any>;
  regionId: string;
}
