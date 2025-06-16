export interface WalletTransactionDto {
  _id?: string;        
  type: 'credit' | 'debit';
  amount: number;
  date: Date;
}

export interface AdminWalletTransactionDto{
   _id?: string;
  appointmentId?: string;
  amount?: number;
  date?: string; 
  doctorId?: string;
  from?: string;
  to?: string;
  toModel:'Platform'|'User'|'Doctor',
  type?: 'credit' | 'debit';
  paymentstatus?: boolean;
}

export interface DoctorTransactionDTO {
  type: 'credit' | 'debit';
  amount: number;
  appointmentId?: string; 
  date?: Date;
}