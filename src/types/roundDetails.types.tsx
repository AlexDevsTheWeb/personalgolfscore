import { IBasicRoundData, IDistance, IShots } from './roundData.types';


export interface IRoundDetails extends IBasicRoundData {
  holes: IShots[];
  distances?: IDistance[];
}

export interface IRoundDetailState {
  isLoading: boolean;
  round: IRoundDetails | null;
  error: string | null;
}
