export interface Translations {
  title: string;
  brand: string;
  nav: {
    home: string;
    projects: string;
    about: string;
    language: {
      spanish: string;
      english: string;
    };
  };
  hero: {
    greeting: string;
    description: string;
    contact: string;
    available: string;
    links: {
      linkedin: string;
      email: string;
    };
  };
  projects: {
    title: string;
    cards: {
      details: string;
    };
    noProjects: string;
    loadMore: string;
  };
  aboutUs: {
    title: string;
    sections: {
      title: string;
      content?: any;
      platforms?: string[];
      items?: { title: string; content: any }[];
    }[];
  };
  footer: {
    message: string;
    connect: {
      title: string;
      links: { name: string; url: string }[];
    };
    copyright: string;
  };
}
