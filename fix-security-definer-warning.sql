-- Fix SECURITY DEFINER Function Warning

-- Option 1: Change to SECURITY INVOKER (Recommended)
-- This makes the function run with the permissions of the caller, not the owner
ALTER FUNCTION public.rls_auto_enable()
SECURITY INVOKER;

-- Option 2: If you need SECURITY DEFINER, restrict who can execute it
-- First revoke public access
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM authenticated;

-- Then grant only to specific roles that need it
-- For example, only allow service role (admin) to execute
GRANT EXECUTE ON FUNCTION public.rls_auto_enable() TO service_role;

-- Option 3: If this function is not needed, you can drop it
-- DROP FUNCTION IF EXISTS public.rls_auto_enable();
