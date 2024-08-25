export interface IRounds {
  "playerID": string,
  "rounds": IRound[],
}

export interface IRound {
  "mainData": IRoundMainData,
  "roundShots": IRoundShots[],
  "roundTotals": IRoundTotals[]
}

export interface IRoundMainData {
  "roundID": number,
  "roundCourse": string,
  "roundDate": string,
  "roundNumber": number,
  "roundCoursePar": number,
  "roundHoles": number,
  "roundTee": string,
  "roundHCP": number
}

export interface IRoundShots {
  "holeNumber": number,
  "chipClub": string,
  "distance": number,
  "driveDistance": number,
  "fairway": number,
  "fir": number,
  "gir": false,
  "girBogey": false,
  "greenSide": string,
  "greenSideL": number,
  "greenSideO": number,
  "greenSideR": number,
  "greenSideS": number,
  "hcp": number,
  "out": number,
  "par": number,
  "points": number,
  "pointsAvg": number,
  "putts": number,
  "puttsLength": string[],
  "puttsUnder2": number,
  "putts2_4": number,
  "putts4_6": number,
  "putts6_10": number,
  "puttsOver10": number,
  "sand": number,
  "strokes": number,
  "teeClub": number,
  "toGreen": number,
  "toGreenMeters": number,
  "toGreenMetersOver100": number,
  "toGreenMeters80_100": number,
  "toGreenMeters60_80": number,
  "toGreenMetersUnder60": number,
  "upDown": number,
  "upDownX": number,
  "upDownN": number,
  "upDownE": number,
  "scramble": number,
  "water": number
}

interface IRoundTotalsScore {
  totals: number,
  avg: string,
  vsPar: string,
  scoreIN: number,
  scoreOUT: number,
  vsParIN: string,
  vsParOUT: string,
  avgIN: string,
  avgOUT: string
}
interface IRoundTotalsPoints {
  totals: number,
  avg: string,
  pointsIN: number,
  pointsOUT: number,
  avgIN: string,
  avgOUT: string
}
interface IRoundTotalsFairway {
  total: number,
  fairwayCenter: number,
  fairwayLeft: number,
  fairwayRight: number,
}
interface IRoundTotalsGirPuttsPenalties {
  totals: number,
  avg: string,
  totalsIN: number,
  avgIN: string,
  totalsOUT: number,
  avgOUT: string,
}
interface IRoundTotalsScrambleUpDown {
  totals: number,
  saved: number,
  perc: number,
}
interface IRoundTotalsSand {
  totals: number,
  avg: string,
  saved: number,
  avgSaved: string,
  savedPerc: number,
}
export interface IRoundTotals {
  hcp: number,
  par: number,
  score: IRoundTotalsScore,
  points: IRoundTotalsPoints,
  fairway: IRoundTotalsFairway,
  gir: IRoundTotalsGirPuttsPenalties,
  girBogey: IRoundTotalsGirPuttsPenalties,
  scramble: IRoundTotalsScrambleUpDown,
  upDown: IRoundTotalsScrambleUpDown,
  putts: IRoundTotalsGirPuttsPenalties,
  sand: IRoundTotalsSand,
  water: IRoundTotalsGirPuttsPenalties,
  out: IRoundTotalsGirPuttsPenalties
}