export interface FlightsController {
    from: string;
    to: string;
    journeyType: 'One way' | 'Round trip' | string;
    sortBy:  '+scheduleTime' | '-scheduleTime' | '+flightName' | '-flightName'
    filterMode: boolean;
    departureDate: string;
}

export interface Flight {
    lastUpdatedAt?: string;
    actualLandingTime?: string;
    actualOffBlockTime?: string; 
    aircraftRegistration?: string;
    aircraftType?: AircraftTypeType;
    baggageClaim?: BaggageClaimType;
    checkinAllocations?: CheckinAllocationsType;
    codeshares?: CodesharesType;
    estimatedLandingTime?: string; 
    expectedTimeBoarding?: string; 
    expectedTimeGateClosing?: string; 
    expectedTimeGateOpen?: string;
    expectedTimeOnBelt?: string; 
    expectedSecurityFilter?: string;
    flightDirection?: 'A' | 'D';
    flightName?: string;
    flightNumber?: number;
    gate?: string;
    pier?: string;
    id?: string;
    isOperationalFlight?: boolean;
    mainFlight?: string;
    prefixIATA?: string;
    prefixICAO?: string;
    airlineCode?: number;
    publicEstimatedOffBlockTime?: string; 
    publicFlightState?: PublicFlightStateType;
    route?: RouteType;
    scheduleDateTime?: string; 
    scheduleDate?: string; 
    scheduleTime?: string; 
    serviceType?: 'J' | 'C' | 'F' | 'H'; 
    terminal?: number;
    transferPositions?: TransferPositionsType;
    schemaVersion?: string;
}

interface AircraftTypeType {
    iataMain?: string;
    iataSub?: string;
}

interface BaggageClaimType {
    belts?: string[];
}

interface CheckinAllocationsType {
    checkinAllocations?: CheckinAllocationType[];
    remarks?: RemarksType;
}

interface CodesharesType {
    codeshares?: string[];
}

interface PublicFlightStateType {
    flightStates?: string[];
}

interface RouteType {
    destinations?: string[];
    eu?: 'S' | 'E' | 'N'; 
    visa?: boolean; 
}

interface TransferPositionsType {
    transferPositions?: number[];
}

interface CheckinAllocationType {
    endTime?: string;
    rows?: RowsType;
    startTime?: string;
}

interface RemarksType {
    remarks?: string[];
}

interface RowsType {
    rows?: RowType[];
}

interface RowType {
    position?: string;
    desks?: DesksType;
}

interface DesksType {
    desks?: DeskType[];
}

interface DeskType {
    checkinClass?: CheckinClassType;
    position?: number;
}

interface CheckinClassType {
    code?: string;
    description?: string;
}
