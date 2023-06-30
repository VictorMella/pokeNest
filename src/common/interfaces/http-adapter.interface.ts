export interface HttpAdapte {
  get<T>(url: string): Promise<T>;
}
