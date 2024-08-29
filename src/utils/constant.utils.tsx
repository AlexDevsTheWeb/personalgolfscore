import { IRoundTotals } from "../types/roundTotals.types";

export const parList = ['3', '4', '5'];
export const hcpList18 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18',];
export const hcpList9 = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
export const fairwayValues = ['4 - Left', '5 - Center', '6 - Right'];
export const greenSideValues = ['S - Short', 'O - Over', 'L - Left', 'R - Right'];

export const pieChartDimensions = {
  height: 200,
  width: 350,
}

export const initialStateRoundTotals: IRoundTotals = {
  playerID: 'playerID',
  mainData: {
    roundCourse: '',
    roundDate: '',
    roundNumber: 0,
    roundTee: '',
    coursePar: 0,
    playerHCP: 0
  },
  score: {
    totals: 0,
    vsPar: 0,
    avg: '',
    scoreIN: 0,
    scoreOUT: 0,
    vsParIN: 0,
    vsParOUT: 0,
    avgIN: '',
    avgOUT: '',
    par3: 0,
    par4: 0,
    par5: 0,
    scoreEagleBetter: 0,
    scoreBirdie: 0,
    scorePar: 0,
    scoreBogey: 0,
    scoreDoubleBogeyWorst: 0,
    scorePar3: 0,
    scorePar4: 0,
    scorePar5: 0,
  },
  points: {
    totals: 0,
    avg: '',
    pointsIN: 0,
    pointsOUT: 0,
    avgIN: '',
    avgOUT: '',
  },
  fairway: {
    total: 0,
    fairwayCenter: 0,
    fairwayLeft: 0,
    fairwayRight: 0,
  },
  gir: {
    totals: 0,
    avg: '',
    totalsIN: 0,
    avgIN: '',
    totalsOUT: 0,
    avgOUT: ''
  },
  girBogey: {
    totals: 0,
    avg: '',
    totalsIN: 0,
    avgIN: '',
    totalsOUT: 0,
    avgOUT: ''
  },
  scramble: {
    totals: 0,
    saved: 0,
    perc: 0,
  },
  upDown: {
    totals: 0,
    saved: 0,
    perc: 0,
  },
  putts: {
    totals: 0,
    avg: '',
    totalsIN: 0,
    avgIN: '',
    totalsOUT: 0,
    avgOUT: '',
    puttsGir: 0,
    puttsGirIn: 0,
    puttsGirOut: 0,
    puttsThree: 0,
    putts1: 0,
    putts2: 0,
    putts3More: 0,
  },
  sand: {
    totals: 0,
    avg: '',
    saved: 0,
    avgSaved: '',
    savedPerc: 0,
  },
  water: {
    totals: 0,
    avg: '',
    totalsIN: 0,
    avgIN: '',
    totalsOUT: 0,
    avgOUT: '',
  },
  out: {
    totals: 0,
    avg: '',
    totalsIN: 0,
    avgIN: '',
    totalsOUT: 0,
    avgOUT: '',
  }
};

