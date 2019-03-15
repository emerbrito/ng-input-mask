export const INPUTMASK_PARSE_ERROR: string = 'inputMaskParse';

export interface MaskEvent {
    mask: string,
    placeHolder: string,
    value: string,
    cleanValue: string
}