

export interface MedicineDto {
  name: string
  dosage: string
  frequency: string
  duration: string
  notes?: string|null
}
export interface ReportDto {
  content: string;
  medicine:MedicineDto[]
}