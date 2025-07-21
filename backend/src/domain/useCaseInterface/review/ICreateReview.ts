export interface ICreateReview {
  create(
    id: string,
    comment: string,
    rating: number,
    doctorId: string
  ): Promise<string>;
}