export interface LeadUpdatePayload {
  contactInfo?: string;
  propertyId?: string;
  leadScore?: number;
}

export interface LeadCreatePayload {
  contactInfo: string;
  propertyId: string;
  leadScore: number;
}
