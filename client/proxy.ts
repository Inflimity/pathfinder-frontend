import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: "",
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value: "",
                        ...options,
                    });
                },
            },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    // Protected routes logic
    const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");
    const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
    const isAuthRoute = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/signup");

    if (user) {
        if (isAuthRoute) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        if (isAdminRoute) {
            const { data: profile } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single();

            if (profile?.role !== "admin") {
                return NextResponse.redirect(new URL("/dashboard", request.url));
            }
        }
    } else {
        if (isDashboardRoute || isAdminRoute) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return response;
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*",
        "/login",
        "/signup",
    ],
};
