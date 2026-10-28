export interface SiteCredits {
  creatorName: string;
  infoSources: string[];
  updatedAt?: string;
}

export interface HighlightSegment {
  text: string;
  highlight?: boolean;
  highlightClass?: string;
}

export interface LandmarkFigure {
  id: string;
  title: string;
  subtitle: string;
  country: string;
  countryCode: string;
  flag: string;
  category: 'Landmark' | 'Historic Figure';
  image: string;
  rawText: string;
  creativeSegments: HighlightSegment[];
  keyFacts: { label: string; value: string }[];
  leftColumnText?: {
    heading: string;
    points: string[];
  };
  rightColumnText?: {
    heading: string;
    points: string[];
  };
}
