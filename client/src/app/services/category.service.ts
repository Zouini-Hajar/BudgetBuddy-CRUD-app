import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private URL = 'http://localhost:8080/api/categories';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // GET all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL}/all`)
      .pipe(
        catchError(this.handleError<Category[]>('getCategories', []))
      );
  }

  // PUT a category -- update
  updateCategory(category: Category): Observable<any> {
    const { id, ...updatedCategory } = category;
    return this.http.put(`${this.URL}/${id}`, updatedCategory, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateCategory'))
      );
  }

  // POST a category -- add
  addCategory(category: Category): Observable<any> {
    return this.http.post(`${this.URL}/add`, category, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('addCategory'))
      );
  }

  // DELETE a Category
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`)
      .pipe(
        catchError(this.handleError<any>('deleteCategory'))
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
