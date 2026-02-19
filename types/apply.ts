export type RoleOption = {
  id: string;
  label: string;
  icon: string;
};

export type ExperienceLevel = {
  value: string;
  label: string;
};

export type ApplyFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type CommitmentCheckbox = {
  id: string;
  label: string;
};

export type StatCard = {
  value: string;
  label: string;
};

export type SidebarInfoItem = {
  icon: string;
  label: string;
  value: string;
  badge?: string;
};

export type DropdownOption = {
  value: string;
  label: string;
};

export type RadioCardOption = {
  id: string;
  label: string;
};

export type NextStepCard = {
  step: string;
  icon: string;
  title: string;
  description: string;
};
