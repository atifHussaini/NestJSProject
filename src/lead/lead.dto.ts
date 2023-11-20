import { Type, Static } from '@sinclair/typebox';

const LeadId = Type.String({ minimum: 1 });
const LeadContactInfo = Type.String({ minLength: 1, maxLength: 255 });
const LeadPropertyId = Type.String({ minLength: 1 });
const LeadLeadScore = Type.Number({ minimum: 1 });

const CreateLeadDTO = Type.Object({
  contactInfo: LeadContactInfo,
  propertyId: LeadPropertyId,
  leadScore: LeadLeadScore,
});

const UpdateLeadDTO = Type.Object({
  contactInfo: LeadContactInfo,
  propertyId: LeadPropertyId,
  leadScore: LeadLeadScore,
  id: LeadId,
});

export { CreateLeadDTO, UpdateLeadDTO };

export type CreateLeadDTO = Static<typeof CreateLeadDTO>;
export type UpdateLeadDTO = Static<typeof UpdateLeadDTO>;

// export interface LeadCreatePayload {
//   contactInfo: string;
//   propertyId: string;
//   leadScore: number;
// }

// export interface LeadUpdatePayload {
//   contactInfo?: string;
//   propertyId?: string;
//   leadScore?: number;
//   id: string;
// }
