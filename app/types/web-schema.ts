import z from 'zod'
import { FileResponseSchema } from './file'

export enum WebSchemaType {
  AnimalShelter = 'AnimalShelter',
  ArchiveOrganization = 'ArchiveOrganization',
  AutomotiveBusiness = 'AutomotiveBusiness',
  ChildCare = 'ChildCare',
  Dentist = 'Dentist',
  DryCleaningOrLaundry = 'DryCleaningOrLaundry',
  EmergencyService = 'EmergencyService',
  EmploymentAgency = 'EmploymentAgency',
  EntertainmentBusiness = 'EntertainmentBusiness',
  FinancialService = 'FinancialService',
  FoodEstablishment = 'FoodEstablishment',
  GovernmentOffice = 'GovernmentOffice',
  HealthAndBeautyBusiness = 'HealthAndBeautyBusiness',
  HomeAndConstructionBusiness = 'HomeAndConstructionBusiness',
  InternetCafe = 'InternetCafe',
  LegalService = 'LegalService',
  Library = 'Library',
  LodgingBusiness = 'LodgingBusiness',
  MedicalBusiness = 'MedicalBusiness',
  ProfessionalService = 'ProfessionalService',
  RadioStation = 'RadioStation',
  RealEstateAgent = 'RealEstateAgent',
  RecyclingCenter = 'RecyclingCenter',
  SelfStorage = 'SelfStorage',
  ShoppingCenter = 'ShoppingCenter',
  SportsActivityLocation = 'SportsActivityLocation',
  Store = 'Store',
  TelevisionStation = 'TelevisionStation',
  TouristInformationCenter = 'TouristInformationCenter',
  TravelAgency = 'TravelAgency',
}

export enum OpeningHoursDayOfWeek {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
  PublicHolidays = 'PublicHolidays',
}

export enum ItemListElementType {
  OfferCatalog = 'OfferCatalog',
  Offer = 'Offer',
}

export enum ItemOfferedType {
  Service = 'Service',
  Product = 'Product',
}

export enum ContactOption {
  HearingImpairedSupported = 'HearingImpairedSupported',
  TollFree = 'TollFree',
}

const ItemOfferedSchema = z.object({
  type: z.enum(Object.values(ItemOfferedType)),
  name: z.string(),
  description: z.string(),
})

export type IWebSchemaResponse = z.infer<typeof WebSchemaResponseSchema>
export const WebSchemaResponseSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  type: z.enum(Object.values(WebSchemaType)),
  name: z.string(),
  alternateName: z.string().nullable(),
  description: z.string().nullable(),
  url: z.string().nullable(),
  logo: FileResponseSchema.optional(),
  image: FileResponseSchema.array().optional(),
  telephone: z.string(),
  email: z.string(),
  address: z.object({
    street: z.string(),
    locality: z.string(),
    region: z.string(),
    country: z.string(),
    postalCode: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }).nullish(),
  hasMap: z.string().nullable(),
  openingHoursSpecification: z.object({
    dayOfWeek: z.object({
      dayOfWeek: z.enum(Object.values(OpeningHoursDayOfWeek)),
    }).array().optional(),
    opens: z.string(),
    closes: z.string(),
  }).array().nullish(),
  sameAs: z.object({
    text: z.string(),
  }).array().nullish(),
  priceRange: z.string().nullable(),
  offerCatalog: z.object({
    name: z.string(),
    itemListElement: z.object({
      type: z.enum(Object.values(ItemListElementType)),
      itemOffered: ItemOfferedSchema.nullish(),
      offerCatalog: z.object({
        name: z.string(),
        itemListElement: z.object({
          type: z.enum(Object.values(ItemListElementType)),
          itemOffered: ItemOfferedSchema.nullish(),
          offerCatalog: z.object({
            name: z.string(),
            itemListElement: z.object({
              itemOffered: ItemOfferedSchema.nullish(),
            }).array().nullish(),
          }).nullish(),
        }).array().nullish(),
      }).nullish(),
    }).array().optional(),
  }).nullish(),
  contactPoint: z.object({
    contactType: z.string(),
    telephone: z.string(),
    email: z.string(),
    areaServed: z.string().nullable(),
    availableLanguage: z.object({
      text: z.string(),
    }).array().nullish(),
    contactOption: z.enum(Object.values(ContactOption)).nullable(),
  }).array().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  publishedAt: z.coerce.date(),
})
