
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
export interface IncidentCategory {
	id: number;
	name: string;
	incidentCategory: string;
	description: string;
}
export interface SituatorCaterory {
	id: number;
	name: string;
}
export interface IncidentLabelDisplay extends IncidentLabel {
	situatorCategoryDisp: string;
	incidentCategoryDisp: string;
}