import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private URL = 'http://localhost:8080/api/transactions';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // GET all transactions
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.URL}/all`)
      .pipe(
        catchError(this.handleError<Transaction[]>('getTransactions', []))
      );
  }

  // PUT a transaction -- update
  updateTransaction(transaction: Transaction): Observable<any> {
    const {id, ...updatedTransaction } = transaction;
    return this.http.put(`${this.URL}/${id}`, updatedTransaction, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateTransaction'))
      );
  }

  // POST a transaction -- add
  addTransaction(transaction: Transaction): Observable<any> {
    return this.http.post(`${this.URL}/add`, transaction, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('addTransaction'))
      );
  }

  // DELETE a transaction
  deleteTransaction(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`)
      .pipe(
        catchError(this.handleError<any>('deleteTransaction'))
      );
  }

  // Handle failed Http operation
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      console.error(error);

      return of(result as T);
    }
  }
}
