interface IRoundsTotals {
  "roundNumber": number,
  "totalsStrokes": IRoundsTotalsStrokes,
  "totalsPoints": IRoundsTotalsPoints,
  "totalsFairway": IRoundsTotalsFairways,
  "totalsTeeShots": IRoundsTotalsTeeShots,
  "totalChipPitch": IRoundsTotalsChipPitch,
}

interface IRoundsTotalsStrokes {
  "strokesTotal": number,
  "strokesAvg": number,
  "strokesVsPar": number
  "strokesScoreIN": number,
  "strokesScoreOUT": number,
  "strokesVsParIN": number,
  "strokesVsParOUT": number,
  "strokesAvgIN": number,
  "strokesAvgOUT": number,
  "strokesPar3": number,
  "strokesPar4": number,
  "strokesPar5": number,
  "strokesScoreEagleBetter": number,
  "strokesScoreBirdie": number,
  "strokesScorePar": number,
  "strokesScoreBogey": number,
  "strokesScoreDoubleBogeyWorst": number,
  "strokesScorePar3": number,
  "strokesScorePar4": number,
  "strokesScorePar5": number
}

interface IRoundsTotalsPoints {
  "pointsTotals": number,
  "pointsAvg": number,
  "pointsPintsIN": number,
  "pointsPointsOUT": number,
  "pointsAvgIN": number,
  "pointsAvgOUT": number
}

interface IRoundsTotalsFairways {
  "fairwaysTotal": number,
  "fairwaysCenter": number,
  "fairwaysLeft": number,
  "fairwaysRight": number
}

interface IRoundsTotalsTeeShots {
  "totalsTeeDriver": IRoundsTotalsFairwaysClub,
  "totalsTeeFW": IRoundsTotalsFairwaysClub,
  "totalsTeeHY": IRoundsTotalsFairwaysClub,
  "totalsTeeIron": IRoundsTotalsFairwaysClub
}

interface IRoundsTotalsFairwaysClub {
  "fairwayHits": number,
  "attempts": number,
  "totDistance": number,
  "missLeft": number,
  "missRight": number,
  "noGreen": number,
  "averageDistance": number,
  "fairwayCenterPCT": number,
  "fairwayLeftPCT": number,
  "fairwayRightPCT": number
}

interface IRoundsTotalsChipPitch { }