select polname, polcmd, polpermissive, polroles::regrole[], pg_get_expr(polqual, polrelid) as qual, pg_get_expr(polwithcheck, polrelid) as with_check
from pg_policy
where polrelid = 'public.avaliacoes'::regclass;
