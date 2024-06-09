import jwt from "jsonwebtoken";

const userObj = {
    email: "example@email.com",
    password: "password",
}

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = async (user: { email: string, password: string }) => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  try {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    return { token };
  } catch (error) {
    console.log("error generating tokens", error);
  }
};

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password)
      return Response.json(
        { 
            message: 'Please fill all fields', 
            code: 400, 
            success: false 
        }, { status: 400 });

    if (userObj.email !== email)
        return Response.json(
            {
                message: "User doesn't exist",
                code: 400,
                success: false,
            }, { status: 400 });

    if (password !== userObj.password)
        return Response.json(
          { 
            message: 'Invalid email or password', 
            code: 400, 
            success: false 
        }, { status: 400 });

    const tokenObj = await generateToken(userObj);

    if (!tokenObj) 
        return Response.json(
          { 
              message: 'Error generating token', 
              code: 500, 
              success: false 
          }, { status: 500 });

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    };

    let cookie = `token=${tokenObj.token}; HttpOnly; Secure=${options.secure}; SameSite=${options.sameSite}; Path=${options.path}; Max-Age=${options.maxAge}`;

    return Response.json(
    {
        user: { email },
        message: "User Logged In Successfully",
        code: 200,
        success: true,
    },
    {
        status: 200,
        headers: {
            "Set-Cookie": cookie,
        },
    }
    );
  } catch (error) {
    console.log("error in login route", error);
    return Response.json({ 
        message: 'Error logging in', 
        code: 500, 
        success: false 
    }, { status: 500 });
  }
}