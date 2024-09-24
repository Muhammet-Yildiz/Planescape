export interface Destination {
    city?: string;
    country?: string;
    iata?: string;
    publicName?: PublicName;
}

interface PublicName {
    dutch?: string;
    english?: string;
}