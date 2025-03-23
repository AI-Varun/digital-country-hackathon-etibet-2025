interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request?: (...args: any[]) => Promise<any>;
    on?: (event: string, callback: any) => void;
    removeListener?: (event: string, callback: any) => void;
    selectedAddress?: string | null;
  };
}