export class AppConstants{

    public static get GET_COURSES(): string { return `http://localhost:8083/api/v1/course?page=0&size=100&sort=title`; }
    public static get POST_COURSES(): string { return `http://localhost:8083/api/v1/course`; }
    public static get GET_PROFESSORS(): string { return `http://localhost:8083/api/v1/professors`; }
    public static get HEADERS():Object{ return  {
        'Content-Type': 'application/json',
        'rxjs-custom-header': 'Rxjs',
        'Access-Control-Allow-Origin': '*'
      }} 
    

     

}

