import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const auth = req.cookies.get('auth');

  // Se a rota começa com /AdminDashboard e o cookie 'auth' não existe
  if (pathname.startsWith('/AdminDashboard') && !auth) {
    const loginUrl = new URL('/Login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Se já estiver autenticado ou for outra rota, deixa passar
  return NextResponse.next();
}

// Quais rotas o middleware deve rodar
export const config = {
  matcher: ['/AdminDashboard/:path*'], // protege o dashboard
};








// // middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const auth = request.cookies.get('auth');

//   if (request.nextUrl.pathname.startsWith('/AdminDashboard') && !auth) {
//     // redireciona para login
//     const loginUrl = new URL('/login', request.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/AdminDashboard/:path*'],
// };
