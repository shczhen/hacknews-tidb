export interface Template {
  getTemplate:
    | ((question: string) => string)
    | ((question: string, data: any) => string);
}
