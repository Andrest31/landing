export type Project = {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  type: string;
  description: string;
  domain: string;
  role: string;
  implementation: string[];
  interfaceNotes: string[];
  result: string[];
  stack: string[];
  accent: 'blue' | 'purple' | 'green' | 'pink';
  links?: {
    github?: string;
    demo?: string;
  };
};
