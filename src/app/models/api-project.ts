export interface ApiProject {
  id: number;
  projectCode: string;
  texts: {
    title: string;
    description: string;
  };
  imageUrl: string;
  technologies: string[];
  detailsUrl: string;
}
