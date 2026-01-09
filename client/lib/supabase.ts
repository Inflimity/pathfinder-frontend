import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
    // Build-time safety check
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.warn("Supabase keys missing - client creation skipped (build-time safety)");
        // Return a mock or null if needed, but for now we'll rely on the runtime check in components
        // Casting to any to bypass strict check during build if keys are missing
        return createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
        );
    }

    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
}
