export { Station };

declare global {
  interface Station {
    idstazione: string;
    ordinamento: number;
    nomestaz: string;
    lon: string;
    lat: string;
    value: number;
    soglia1: number;
    soglia2: number;
    soglia3: number;
  }
}
