export interface Booking {
    flightName: string
    serviceType?: string
    route: {
        destinations: string[]
        eu: string
        visa: boolean
    }
    scheduleDateTime: Date
    prefixICAO?: string
}
