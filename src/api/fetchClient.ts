 /* eslint-disable @typescript-eslint/no-explicit-any */
 const BASE_URL = 'http://localhost:8080';

 function wait(delay: number) {
   return new Promise((resolve) => {
     setTimeout(resolve, delay);
   });
 }
 
 type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
 
 async function request<T>(
   url: string,
   method: RequestMethod = "GET",
   data: any = null
 ): Promise<T> {
   const options: RequestInit = { method };
   const headers: HeadersInit = {};

   if (data && !(data instanceof FormData)) {
     options.body = JSON.stringify(data);
     headers["Content-Type"] = "application/json; charset=UTF-8";
   } else if (data instanceof FormData) {
     options.body = data;
   }
 
   options.headers = headers;
 
   return wait(100)
     .then(() => {
       return fetch(BASE_URL + url, options);
     })
     .then(async (response) => {
       if (!response.ok) {
         const res = await response.text();
         console.error("Server error response:", res);
 
         const errorDetails = await response.json().catch(() => ({ message: "Unknown error" }));
 
         switch (response.status) {
           case 400:
           case 500:
             throw new Error(errorDetails.message || "Internal Server Error");
           default:
             throw new Error(errorDetails.message || "An unexpected error occurred");
         }
       }
 
       const text = await response.text();
       try {
         return JSON.parse(text);
       } catch (error) {
         console.log(error)
       }
     });
 }
 
 export const client = {
   get: <T>(url: string) => request<T>(url),
   post: <T>(url: string, data: any) => request<T>(url, "POST", data),
   delete: <T>(url: string) => request<T>(url, "DELETE"),
   put: <T>(url: string, data: any) => request<T>(url, "PUT", data),
 };