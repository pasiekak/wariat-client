export interface IBanner {
  message: string;
  type: "success" | "info" | "error" | "warning";
}

export interface IBannerWithID extends IBanner {
  id: string;
}
