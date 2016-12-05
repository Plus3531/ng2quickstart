
export interface IncidentLabel {
	id: number;
	name: string;
	incidentCategory: number;
	abbreviation: string;
	standardPrognosis: number;
	description: string;
	canBeSubincident: boolean;
	situatorCategory: number;
}
