export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
};

export type AboutInfo = {
  name: string;
  bio: string;
  skills: string[];
};

export type ContactInfo = {
  email: string;
  phone?: string;
  socialLinks: {
    [key: string]: string;
  };
};