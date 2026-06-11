export interface LeadFormData {
  firstName: string;
  lastName: string;
  childName: string;
  childAge: string;
  phone: string;
  email: string;
  course: CourseType;
  experience: ExperienceLevel;
  message: string;
  privacyAccepted: boolean;
  marketingAccepted: boolean;
}

export enum CourseType {
  KICK_BOXING = "Kick Boxing",
  FUNCTIONAL_TRAINING = "Functional Training",
  GINNASTICA_POSTURALE = "Ginnastica Posturale",
  AVVIAMENTO_ALLO_SPORT = "Avviamento allo Sport",
  UNSURE = "Non so ancora, vorrei informazioni"
}

export enum ExperienceLevel {
  NONE = "Nessuna",
  BASE = "Base",
  INTERMEDIATE = "Intermedia"
}

export interface CardItem {
  id: string;
  title: string;
  description: string;
  iconName?: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}
