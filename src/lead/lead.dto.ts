import { Type, Static } from '@sinclair/typebox';

const LeadId = Type.String({ minimum: 1 });
const LeadContactInfo = Type.String({ minLength: 1, maxLength: 255 });
const LeadPropertyId = Type.String({ minLength: 1 });
const LeadLeadScore = Type.Number();

export const CreateLeadDTOSchema = Type.Object({
  contactInfo: LeadContactInfo,
  leadScore: LeadLeadScore,
  propertyId: Type.Optional(LeadPropertyId),
});

export const UpdateLeadDTOSchema = Type.Object({
  contactInfo: Type.Optional(LeadContactInfo),
  propertyId: Type.Optional(LeadPropertyId),
  leadScore: Type.Optional(LeadLeadScore),
  id: LeadId,
});

export type CreateLeadDTO = Static<typeof CreateLeadDTOSchema>;
export type UpdateLeadDTO = Static<typeof UpdateLeadDTOSchema>;
