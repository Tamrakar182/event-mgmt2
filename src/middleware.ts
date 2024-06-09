import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export const config = {
  matcher: '/api/auth/:path*',
}
 
export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value

    if (token === undefined) {
        return Response.json({ 
            message: 'Unauthorised', 
            code: 401, 
            success: false 
        }, { status: 401 });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) 
            return Response.json({ 
                message: 'Unauthorised', 
                code: 401, 
                success: false 
            }, { status: 401 });
      });

}