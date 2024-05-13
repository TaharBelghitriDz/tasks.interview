export type Photo = {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type Response = Record<string, any>;

interface UseFetchArgs {
  url?: string;
  requestInit: RequestInit;
}

export type DataState = {
  call: (args?: UseFetchArgs) => void;
  loading: boolean;
  error: string | null;
  data: Response | null;
};

export type UseFetch = (args: UseFetchArgs) => DataState;
