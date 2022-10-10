import playerResponceDTO from "./PlayerResponceDTO";

export type PlayerFullDTO = playerResponceDTO & {
    fundsLost: number;
    fundsPayedOut: number;
}

export enum FilteringOptions {
    balance = "balance",
    winCoefficient = "winCoefficient",
    fundsLost = "fundsLost",
    fundsPayedOut = "fundsPayedOut",
}

export default PlayerFullDTO;